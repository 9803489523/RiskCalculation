import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie';

export function $axios() {
    const token = Cookies.get('token'); // Замените 'token' на имя cookie, где хранится токен

    const config = useRuntimeConfig()

    const instance = axios.create({
        proxy: true,
        baseURL: 'http://localhost:8080/',
        headers: {
            Authorization: `Bearer ${token}`, // Предполагается, что токен хранится в state под ключом authToken
        },
    });

    return instance
}
