<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <section class="not-found">
    <p class="alert">存在しないページを開いてしまったようです！</p>
    <ul class="back-navigations">
      <li class="navigation-link" @click="router.push('/')">トップ</li>
      <li class="navigation-link" @click="router.go(-1)">前のページ</li>
    </ul>
  </section>
</template>

<style scoped>
.not-found {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  padding-bottom: 64px;

  .back-navigations {
    display: flex;
    flex-direction: row;
    gap: 32px;

    .navigation-link {
      border-radius: 4px;

      height: 32px;
      width: 120px;

      cursor: pointer;

      line-height: 32px;
      vertical-align: center;
      text-align: center;
      font-weight: 600;
      color: white;
      background-color: #444444;

      &:active {
        background-color: #999999;
      }
    }
  }
}
</style>
