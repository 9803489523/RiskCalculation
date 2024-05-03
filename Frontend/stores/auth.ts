import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    token: ''
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3      
      const { data, pending }: any = await $axios().post(
        "/api/auth/signin",
        {
          password: password,
          username: username,
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      this.loading = pending;      

      if (data.token) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.token; // set token to cookie        
        this.token = data?.token; // set token to cookie        
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});