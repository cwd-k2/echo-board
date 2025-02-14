import { provide, inject } from '%/lib/injector';

import dbConfigs from '%/lib/db-config';

const DB_NAME = 'EchoBoardDB';
const DB_VERSION = 1;

class DB {
  // IndexedDB 本体
  db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  // row を作って ID を返す
  async add<T>(name: string, data: T): Promise<string> {
    const tx = this.db.transaction(name, 'readwrite');
    const st = tx.objectStore(name);

    return new Promise((resolve, reject) => {
      const now = new Date();
      const id = crypto.randomUUID();
      const request = st.add(
        {
          id,
          ...data,
          createdAt: now,
          updatedAt: now,
        },
        id
      );

      request.addEventListener('success', () => resolve(id), {
        once: true,
      });
      request.addEventListener('error', () => reject(request.error), {
        once: true,
      });
    });
  }

  // ID 指定された行を更新して ID を返す
  async put<T>(name: string, id: string, data: T): Promise<string> {
    const tx = this.db.transaction(name, 'readwrite');
    const st = tx.objectStore(name);

    return new Promise((resolve, reject) => {
      const now = new Date();
      const request = st.put(
        {
          ...data,
          updatedAt: now,
        },
        id
      );

      request.addEventListener('success', () => resolve(id), {
        once: true,
      });
      request.addEventListener('error', () => reject(request.error), {
        once: true,
      });
    });
  }

  // 指定した行をひとつ取ってくる
  async fetchSingle<T>(
    name: string,
    by: { index: string; value: IDBValidKey }
  ): Promise<T | undefined> {
    const tx = this.db.transaction(name, 'readonly');
    const st = tx.objectStore(name);
    const ix = st.index(by.index);

    return new Promise((resolve, reject) => {
      const request = ix.get(by.value);

      request.addEventListener('success', () => resolve(request.result), {
        once: true,
      });
      request.addEventListener('error', () => reject(request.error), {
        once: true,
      });
    });
  }

  // 条件に合う行をいくつか取ってくる
  async fetchRanged<T>(
    name: string,
    by: {
      index: string;
      range: IDBKeyRange;
      limit?: number;
      direction?: IDBCursorDirection;
    }
  ): Promise<T[]> {
    const tx = this.db.transaction(name, 'readonly');
    const st = tx.objectStore(name);
    const ix = st.index(by.index);

    return new Promise((resolve, reject) => {
      const request = ix.openCursor(by.range, by.direction ?? 'next');
      const results: T[] = [];

      request.addEventListener('success', (event) => {
        const cursor = (event.target as IDBRequest)?.result;

        if (cursor && results.length < (by.limit ?? 20)) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      });

      request.addEventListener('error', () => reject(request.error), {
        once: true,
      });
    });
  }
}

// IndexedDB を初期化
async function openDB(): Promise<DB> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.addEventListener(
      'upgradeneeded',
      (event) => {
        const target = event.target as IDBOpenDBRequest | null;

        if (!target) {
          return reject(new Error('Failed to open database'));
        }

        const db = target.result;

        for (const dbConfig of dbConfigs) {
          if (!db.objectStoreNames.contains(dbConfig.table)) {
            const st = db.createObjectStore(dbConfig.table);

            for (const index of dbConfig.index) {
              st.createIndex(index.name, index.prop, index.opt);
            }
          }
        }
      },
      { once: true }
    );

    request.addEventListener(
      'success',
      (event) => resolve(new DB((event.target as IDBOpenDBRequest).result)),
      { once: true }
    );

    request.addEventListener(
      'error',
      (event) => reject((event.target as IDBOpenDBRequest).error),
      { once: true }
    );
  });
}

// IndexedDB を初期化して DI できるように
export async function installDB() {
  return openDB().then((db) => provide('db', db));
}

// Inject して使うためのヘルパ
export function useDB(): DB {
  return inject('db');
}
