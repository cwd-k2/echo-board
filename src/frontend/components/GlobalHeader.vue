<script setup lang="ts">
import React from '@/components/React.vue';
import Avatar from 'boring-avatars';

import { useAuthInfoStore } from '@/store/authInfoStore';

const authInfoStore = useAuthInfoStore();
</script>

<template>
  <header class="global-header">
    <section class="plate">
      <h1 class="logo">
        <router-link to="/">Echo Board</router-link>
      </h1>

      <div class="user-icon">
        <React
          v-if="authInfoStore.pickAuthUser !== null"
          :component="Avatar"
          :props="{
            name: authInfoStore.pickAuthUser.id,
            size: '32px',
            variant: 'beam',
          }"
        />
      </div>

      <nav class="header-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link class="nav-item-link" to="/admin">
              <i class="fa-solid fa-door-closed navigation-icon"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-item-link" @click="authInfoStore.clear">
              <i class="fa-solid fa-right-from-bracket navigation-icon"></i>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  </header>
</template>

<style scoped>
.global-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;

  .plate {
    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 16px;

    height: 100%;
    width: calc(100%);
    padding: 0 16px;

    border-radius: 0 0 12px 12px;
    border-color: transparent;
    box-shadow: 0 0 4px 0 #444444;
    background-color: white;
    color: black;

    .logo {
      flex: 1;
      font-size: 16px;
    }

    .user-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-nav {
      .nav-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        .nav-item {
          .nav-item-link {
            height: 32px;
            width: 32px;

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
      }
    }
  }

  padding: 0 4px;
}
</style>
