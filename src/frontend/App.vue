<script setup lang="ts">
import { watchEffect } from 'vue';

import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import ErrorToast from '@/components/ErrorToast.vue';

import { useRouter } from 'vue-router';

import { useErrorToastStore } from '@/store/errorToastStore';
import { useAuthInfoStore } from '@/store/authInfoStore';

const errorToastStore = useErrorToastStore();
const authInfoStore = useAuthInfoStore();

const router = useRouter();

watchEffect(() => {
  if (authInfoStore.pickAuthUser === null) router.replace('/login');
});
</script>

<template>
  <global-header class="global-header" />
  <main class="main-contents">
    <router-view />
    <div id="layer-target"></div>
  </main>
  <global-footer class="global-footer" />

  <error-toast
    v-if="errorToastStore.errorCount > 0"
    @click="errorToastStore.popError"
  />
</template>

<style scoped>
.global-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.global-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.main-contents {
  height: 100%;
  width: 100%;
  padding: 64px 20px 0;
}
</style>
