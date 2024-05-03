<template>
    <div class="flex container">
        <header class="row">
            <h2>Анализ выбранных пар</h2>
        </header>
        <p class="empty" v-if="pairs?.pairs?.length === 0">Вы не выбрали ни одной пары, но можете выбрать <br> в каталоге
            <NuxtLink to="/capecs"> шаблонов атак</NuxtLink> или в каталоге<NuxtLink to="/cves"> уязвимостей.</NuxtLink>
        </p>
        <div v-if="skeleton_shown" class="list row grid_skeleton">
            <USkeleton class="landshaft" />
            <USkeleton class="calc" />
        </div>
        <div v-if="skeleton_shown" class="list row">
            <div class="grid">
                <USkeleton v-for="i in 4" class="item" />
            </div>

        </div>

        <RiskLandshaftSearch @done="skeleton_shown = false" v-if="pairs?.pairs?.length > 0" :pairs="pairs.pairs" />
        <PopUpCapecAnalytics v-if="isPopUp" @close="isPopUp = false" :capec="checkedPair.value.capec"
            :cve="checkedPair.value.cve" />
        <div v-if="pairs?.pairs?.length > 0" class="list row">
            <button @click="addAllPairs()">Удалить все пары из сравнения</button>
        </div>
        <div class="list row">
            <div class="grid">
                <div @click="isPopUp = true; checkedPair.value = pair" v-for="pair in pairs.pairs" class="item">
                    <b style="font-weight: bold;">CAPEC-{{ pair.capec.capecId }}</b>&nbsp; | &nbsp;<b
                        style="font-weight: bold;">{{ pair.cve.cveId }}</b>
                </div>
            </div>
        </div>
        <BaseTableAnalytics v-if="skeleton_shown || pairs?.pairs?.length > 0" :pairs="pairs.pairs" />

    </div>
</template>

<script setup>
const pairs = ref([])
const isPopUp = ref(false)
const checkedPair = ref({})
const skeleton_shown = ref(true)

const computed_pairs = computed(() => {
    return JSON.parse(JSON.stringify(pairs))
})

import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()


async function addAllPairs() {
    pairs.value.pairs.forEach(pair => {
        let pair_ids = {
            cveId: pair.cve.cveId,
            capecId: pair.capec.capecId
        }
        pairsStore.togglePair(pair_ids)
    });
    await fetchProducts()
}

onMounted(async() => {
    // const storedPairs = localStorage.getItem('pairs');
    // pairsStore.pairs = JSON.parse(storedPairs);
    await fetchProducts()
    if (pairs.value.pairs.length === 0) {
        skeleton_shown.value = false
    }
    
})

async function fetchProducts() {
    const response = await $axios().post('/capec/getPair', {

        pairList: pairsStore.pairs,
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    })
    pairs.value = response.data
}

</script>

<style lang="scss" scoped>
.grid_skeleton {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 16px;

    .landshaft {
        width: 100%;
        height: 600px;
        box-sizing: border-box;

    }
}



.highlight {
    animation: highlightAnimation 2s;
}

@keyframes highlightAnimation {
    0% {
        box-shadow: 0 0 5px 1px rgb(0, 132, 255);
    }

    50% {
        box-shadow: 0 0 5px 1px rgb(0, 132, 255);
    }

    100% {
        box-shadow: inherit;
    }
}

.container {
    box-sizing: border-box;
    max-width: 1400px;
    margin: 0 auto;

    .empty {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        text-align: center;

        a {
            color: #5864d6;
            text-decoration: underline;
        }
    }

    .info {
        margin-bottom: 30px;

        .subtitle {
            p {
                text-align: justify;
                max-width: 100%;
            }
        }
    }

    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;

        button {
            box-sizing: border-box;
            padding: 10px 30px;
            background-color: #39394B;
            border-radius: 10px;
            //  border: 1px solid rgb(206, 206, 206);
            font-weight: 400;
        }
    }

    display: flex;
    flex-direction: column;
    min-height: 50vh;
    padding: 80px 20px;

    h2 {
        font-size: 2rem;
        line-height: 85%;
        font-weight: bold;

    }
}

.list {
    width: 100%;
    margin-bottom: 16px;

    button {
        width: 100%;
        padding: 15px 20px;
        // height: 35px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        flex-direction: column;
        gap: 16px;

        .item {
            background-color: #39394B;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 100%;
            padding: 15px 20px;
            box-sizing: border-box;
            //  border: 1px solid rgb(206, 206, 206);
            border-radius: 10px;
            position: relative;

            &:hover {
                transition: .3s all;
                box-shadow: 0 0 5px 1px rgb(0, 132, 255);
            }
        }
    }




}
</style>