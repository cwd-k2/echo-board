<script setup lang="ts">
const navigations = [
  {
    link: '/',
    icon: ['fa-solid', 'fa-house'],
  },
  {
    link: '/search',
    icon: ['fa-solid', 'fa-magnifying-glass'],
  },
  {
    link: '/notification',
    icon: ['fa-solid', 'fa-bell'],
  },
  {
    link: '/message',
    icon: ['fa-solid', 'fa-envelope'],
  },
  {
    link: '/profile',
    icon: ['fa-solid', 'fa-user'],
  },
];
</script>

<template>
  <footer class="global-footer">
    <ol class="footer-nav">
      <li v-for="navigation of navigations" :key="navigation.link">
        <router-link :to="navigation.link">
          <i class="navigation-icon" :class="navigation.icon"></i>
        </router-link>
      </li>
    </ol>
  </footer>
</template>

<style scoped>
.global-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 100%;

  box-shadow: 0 0 4px -1px #444;
  border-color: transparent;
  background-color: white;

  .footer-nav {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .navigation-icon {
      height: 32px;
      width: 32px;

      font-size: 16px;
      text-align: center;
      vertical-align: center;
      line-height: 32px;
    }
  }
}
</style>
