<script setup lang="ts">
import { ref } from 'vue';
import { createPost, getPostList } from '@/run/post';
import { useErrorToastStore } from '@/store/errorToastStore';

import UserPost from '@/components/UserPost.vue';

const errorToastStore = useErrorToastStore();

const input = ref<string>('');
const postList = ref<any[]>([]);

function post() {
  createPost(input.value)
    .then(() => {
      input.value = '';
      getPostList().then((list) => {
        postList.value = list;
      });
    })
    .catch((e) => errorToastStore.pushError(e));
}

getPostList()
  .then((list) => (postList.value = list))
  .catch((e) => errorToastStore.pushError(e));
</script>

<template>
  <section class="main-page">
    <section class="post-form">
      <textarea
        placeholder="今日はなにをしましたか？"
        class="post-content"
        v-model="input"
      />
      <button class="post-button" @click="post" :disabled="input.length <= 0">
        post
      </button>
    </section>
    <section class="post-list">
      <ul>
        <li v-for="post in postList" :key="post.id">
          <UserPost :post="post" />
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .post-form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .post-content {
      width: 100%;
      height: 48px;
      padding: 8px;
      resize: none;

      background-color: #eee;
      border-radius: 4px;
      font-size: 14px;
    }

    .post-button {
      align-self: flex-end;
      padding: 4px 16px;
      background-color: #444;
      color: white;
      border-radius: 20px;
      font-size: 12px;
    }
  }
}
</style>
