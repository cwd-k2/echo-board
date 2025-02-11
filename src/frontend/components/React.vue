<script setup lang="ts" generic="T">
import { ref, onMounted, onUpdated, onBeforeUnmount } from 'vue';

import type { ReactNode } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

const props = defineProps<{
  component: (p: T) => ReactNode;
  props: T;
}>();

const mounted = ref<HTMLElement | null>(null);
const rootref = ref<Root | null>(null);

onMounted(() => {
  if (mounted.value !== null) {
    rootref.value ??= createRoot(mounted.value);
    rootref.value.render(props.component(props.props));
  }
});

onUpdated(() => {
  if (mounted.value !== null) {
    rootref.value ??= createRoot(mounted.value);
    rootref.value.render(props.component(props.props));
  }
});

onBeforeUnmount(() => {
  rootref.value?.unmount();
  rootref.value = null;
});
</script>

<template>
  <div ref="mounted"></div>
</template>
