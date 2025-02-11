<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import layerControl from '@/lib/layer-control';

import { useErrorToastStore } from '@/store/errorToastStore';

const { id, zIndex } = layerControl.addLayer();
const errorToastStore = useErrorToastStore();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

onBeforeUnmount(() => {
  layerControl.removeLayer(id);
});
</script>

<template>
  <teleport to="#layer-target">
    <section class="layer-contents" role="button" @click="emit('click')">
      <div class="layer-contents-body">
        {{ new Date().toLocaleString() }}
        <br />
        {{ errorToastStore.errorFront }}
      </div>
    </section>
  </teleport>
</template>

<style scoped>
.layer-contents {
  z-index: v-bind(zIndex);

  position: fixed;
  top: 30%;
  left: 0;

  width: 100%;
  padding: 8px;

  .layer-contents-body {
    width: 100%;
    padding: 16px;

    background-color: #ff2222;

    border-radius: 8px;
    border-color: transparent;
    box-shadow: 0 0 4px -1px #444;

    text-align: center;
  }
}
</style>
