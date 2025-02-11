import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useErrorToastStore = defineStore('error-toast-store', () => {
  const errorStack = ref<any[]>([]);
  const errorCount = computed<number>(() => errorStack.value.length);
  const errorFront = computed<any>(() => errorStack.value[0]);

  function pushError(v: any) {
    errorStack.value.push(v);
  }

  function popError() {
    errorStack.value = errorStack.value.slice(1);
  }

  return {
    errorFront,
    errorCount,
    pushError,
    popError,
  };
});
