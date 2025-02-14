<script setup lang="ts">
import type { Row } from '#/row';
import type { Post } from '#/post';

import Avatar from 'boring-avatars';
import React from '@/components/React.vue';

defineProps<{
  post: Row<Post>;
}>();
</script>

<template>
  <article class="user-post">
    <React
      class="user-icon"
      :component="Avatar"
      :props="{
        name: post.user.id,
        size: '32px',
        variant: 'beam',
      }"
    />

    <div class="user-post-content">
      <div class="user-post-header">
        <h3 class="user-name">
          <span class="user-diaplay-name">
            {{ post.user.displayName || '名称未設定' }}
          </span>
          <span class="user-account-name">(@{{ post.user.accountName }})</span>
        </h3>

        <time class="post-created-at">
          {{ post.createdAt.toLocaleString() }}
        </time>
      </div>

      <p class="user-post-body">{{ post.content }}</p>
    </div>
  </article>
</template>

<style scoped>
.user-post {
  display: flex;
  flex-direction: row;
  gap: 8px;

  padding: 4px 0;

  .user-icon {
    flex-shrink: 0;
    margin-top: 4px;
  }

  .user-post-content {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;

    .user-post-header {
      display: flex;
      gap: 4px;
      font-size: 12px;

      .user-name {
        flex: 1;

        .user-display-name {
          font-weight: bold;
        }

        .user-account-name {
          color: #666;
        }
      }

      .post-created-at {
        font-size: 10px;
        color: #999;
      }
    }

    .user-post-body {
      font-size: 14px;
      white-space: pre-wrap;
    }
  }
}
</style>
