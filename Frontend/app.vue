<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()

onMounted(() => {
    const storedPairs = localStorage.getItem('pairs');
    pairsStore.pairs = []
    if (storedPairs !== null) {
        pairsStore.pairs = JSON.parse(storedPairs);
    }
})
</script>
  
<style>
body {
    background: #222131;
    color: white !important;

    &::-webkit-scrollbar {
        width: 12px;
        /* ширина scrollbar */
    }

    &::-webkit-scrollbar-track {
        background: #39394B;
        /* цвет дорожки */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #222131;
        /* цвет плашки */
        border-radius: 20px;
        padding: 0 5px;
        /* закругления плашки */
        border: 3px solid #39394B;
        /* padding вокруг плашки */
    }
}

.page-enter-active,
.page-leave-active {
    transition: all .5s;
}

.page-enter-from,
.page-leave-to {
    transition: all .5s;
    opacity: 0;
}</style>