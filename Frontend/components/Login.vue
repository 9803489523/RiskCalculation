<script lang="ts" setup>

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from "@/stores/auth"; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: '',
  password: '',
});

const router = useRouter();

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};

const form = ref();

async function onSubmit() {
  form.value.clear();
  try {
    login()
  } catch (err) {
    
  }
}
</script>

<template>
  <div class="popUp">
    <div class="black"></div>
    <div class="wrapper">
      <h2>Войти в аккаунт</h2>
      <UForm ref="form" :state="user" @submit="onSubmit">
        <UFormGroup label="Логин" name="email">
          <UInput v-model="user.username" />
        </UFormGroup>

        <UFormGroup label="Пароль" name="password">
          <UInput v-model="user.password" type="password" />
        </UFormGroup>

        <UButton type="submit"> Подтвердить </UButton>
      </UForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popUp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  z-index: 100;
  border-radius: 10px;
  background-color: #232323;
  padding: 50px;
  width: 600px;
  height: 400px;

  h2 {
    margin-bottom: 40px;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 20;

    button {
      height: 35px !important;
      max-width: 150px;
      width: 100%;
      justify-content: center;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
}

.black {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.95;
}
</style>