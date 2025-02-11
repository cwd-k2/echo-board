<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import layerControl from '@/lib/layer-control';

const { id, zIndex } = layerControl.addLayer();
const show = ref<boolean>(true);

onBeforeUnmount(() => {
  show.value = false;
  layerControl.removeLayer(id);
});
</script>

<template>
  <teleport to="#layer-target">
    <transition name="layer-fullscreen">
      <section v-if="show" class="layer-contents">
        <div class="layer-contents-body">
          <slot />
        </div>
      </section>
    </transition>
  </teleport>
</template>

<style scoped>
.layer-contents {
  z-index: v-bind(zIndex);

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  padding: 8px;

  .layer-contents-body {
    width: 100%;
    height: 100%;
    background-color: white;

    border-radius: 8px;
    border-color: transparent;
    box-shadow: 0 0 4px -1px #444;
  }
}

.layer-fullscreen-enter-from {
  opacity: 0;
}

.layer-fullscreen-leave-to {
  opacity: 0;
}

.layer-fullscreen-enter-from .layer-fullscreen-container,
.layer-fullscreen-leave-to .layer-fullscreen-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
