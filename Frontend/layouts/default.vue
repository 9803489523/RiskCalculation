<template>
    <aside>
        <div class="aside">
            <ul>
                <li>
                    <NuxtLink to="/">
                        <img src="/home.png" alt="">
                        <p>Главная</p>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/capecs">
                        <img src="/capec.png" alt="">
                        <p>Шаблоны атак</p>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/cves">
                        <img src="/cve.png" alt="">
                        <p>Уязвимости</p>
                    </NuxtLink>
                </li>
                <li>
                    <a href="/analysis">
                        <img src="/graphic.png" alt="">
                        <p>Анализ выбранных пар</p>
                    </a>
                </li>
            </ul>
            <div class="rigth">

                <button>
                    <p>?</p>
                </button>
                <p>Войти</p>

            </div>
            <Login v-if="!token"/>

        </div>

    </aside>
    <slot />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/stores/auth'; // import the auth store we just created
import Cookies from 'js-cookie';
const token = Cookies.get('token'); // Замените 'token' на имя cookie, где хранится токен

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore());
</script>

<style lang="scss" scoped>
.disabled {
    pointer-events: none;
}

aside {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: fixed;
    z-index: 70;
    width: 120px;
    height: 100%;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;

    .aside {
        border-radius: 10px;
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;

        background-color: #39394B;


        padding: 20px 0;
        justify-content: space-between;

        .rigth {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            gap: 8px;


            p {
                color: #ffffff;
                font-weight: 400;
                font-size: 16px;
            }

            button {
                // max-width: 130px;
                width: 63px;
                height: 63px;
                border-radius: 35%;
                border: 1px solid #1976D2;
                background-color: white;

                p {
                    color: gray;
                    font-size: 1.2rem;
                }

            }
        }

    }

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        li {
            list-style: none;
            text-align: center;

            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                // height: 90px;

                img {
                    max-width: 82px;
                }

                p {
                    margin-top: 12px;
                    font-weight: 500;
                    font-size: 16px;
                }
            }


        }
    }
}
</style>