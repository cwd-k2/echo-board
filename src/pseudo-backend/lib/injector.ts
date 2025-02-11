// 適当でゴメン
const injectionMap: { [key: string]: any } = {};

export function provide(key: string, staff: any): void {
  injectionMap[key] = staff;
}

export function inject<T>(key: string): T {
  return injectionMap[key];
}
