<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { login, register } from '@/run/auth';
import { useErrorToastStore } from '@/store/errorToastStore';

import FullScreenOverlay from '@/components/FullScreenOverlay.vue';

const router = useRouter();
const errorToastStore = useErrorToastStore();

const accountName = ref<string>('');
const password = ref<string>('');

async function doLogin() {
  login(accountName.value, password.value)
    .then(() => router.replace('/'))
    .catch((e) => errorToastStore.pushError(e));
}

async function doRegister() {
  register(accountName.value, password.value)
    .then(() => router.replace('/'))
    .catch((e) => errorToastStore.pushError(e));
}
</script>

<template>
  <full-screen-overlay>
    <section class="contents">
      <h1 class="login-title">Welcome to Echo Board</h1>

      <form class="prompt">
        <input
          v-model="accountName"
          class="prompt-input account"
          type="text"
          placeholder="account name"
          autocomplete="on"
        />
        <input
          v-model="password"
          class="prompt-input password"
          type="password"
          placeholder="password"
          autocomplete="on"
        />

        <div class="buttons">
          <a
            class="prompt-button login-button"
            :disabled="accountName.length <= 0 || password.length <= 0"
            @click.prevent="doLogin"
          >
            Login
          </a>
          <a
            class="prompt-button register-button"
            :disabled="accountName.length <= 0 || password.length <= 0"
            @click.prevent="doRegister"
          >
            Register
          </a>
        </div>
      </form>
    </section>
  </full-screen-overlay>
</template>

<style scoped>
.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  width: 100%;
  height: 100%;
  padding: 16px;

  .login-title {
    font-size: 16px;
  }

  .prompt {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    width: 100%;
    padding: 0 32px 64px;

    .prompt-input {
      width: 100%;
      height: 32px;
      padding: 0 16px;
      outline: none;
      line-height: 32px;
      border-bottom: solid 1px #444;

      &:focus {
        line-height: 31px;
        border-bottom: solid 2px #0000aa;
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      margin-top: 16px;
      width: 100%;

      .prompt-button {
        width: 45%;
        height: 32px;
        line-height: 32px;
        text-align: center;

        background-color: #444;
        color: white;
        font-weight: 600;

        border-radius: 4px;
        cursor: pointer;

        &[disabled='true'] {
          background-color: #777777;
          color: #aaaaaa;
        }

        &:active {
          background-color: #999999;
        }
      }
    }
  }
}
</style>
