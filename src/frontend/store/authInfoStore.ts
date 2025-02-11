import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getToken, setToken, getAuthUser, setAuthUser } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';

export const useAuthInfoStore = defineStore('auth-info', () => {
  const authUser = ref<AuthUser | null>(getAuthUser());
  const token = ref<string | null>(getToken());

  const pickAuthUser = computed(() => authUser.value);
  const pickToken = computed(() => token.value);

  function putAuthUser(newUser: AuthUser | null) {
    setAuthUser(newUser);
    authUser.value = getAuthUser();
  }

  function putToken(newToken: string | null) {
    setToken(newToken);
    token.value = getToken();
  }

  function clear() {
    putToken(null);
    putAuthUser(null);
  }

  return {
    pickAuthUser,
    putAuthUser,
    pickToken,
    putToken,
    clear,
  };
});
