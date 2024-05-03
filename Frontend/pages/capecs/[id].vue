<template>
    <div class="flex container">
        <header class="row">
            <h2>Шаблон атаки CAPEC-{{ capec.capecId }}</h2>
            <button @click="isPopUpInfo = true; fetchProducts()">Редактировать поля</button>
        </header>
        <div class="part row info">
            <div class="subtitle">
                <h3>Наменование типа атаки</h3>
                <p>{{ capec.name }}</p>
            </div>
            <div class="subtitle">
                <h3>Описание типа атаки</h3>
                <p>{{ capec.description }}</p>
            </div>
            <div class="subtitle">
                <h3>Вероятность успешности атаки</h3>
                <div class="loa">
                    <i :style="getColorStyle(capec?.likelihoodOfAttack)"></i>
                    <p>{{ capec?.likelihoodOfAttack }}</p>

                </div>
            </div>
        </div>
        <PopUpInfoCapec @close="isPopUpInfo = false" v-if="isPopUpInfo" :capec="capec"></PopUpInfoCapec>
        <RiskLandshaft v-if="capec.capecId && cve_list.length > 0" :capec="capec" :cve_list="cve_list" />
        <div class="list row">
            <button @click="addAllPairs()">Добавить все пары</button>
        </div>
        <div class="list row">
            <div class="grid">
                <div @click="isPopUp = true; checkedCve.value = cve" :id="cve.cveId" :key="cve.cveId"
                    v-for="cve in cve_list" class="item">
                    <p>{{ cve.cveId }}</p>
                </div>
            </div>
        </div>
        <PopUpCapec @close="isPopUp = false" v-if="isPopUp" :capec="capec" :cve="checkedCve"></PopUpCapec>
    </div>
</template>
  
<script setup>
const route = useRoute()
const cve_list = ref([])
const capec = ref({})
const checkedCve = ref({})
const isPopUp = ref(false)
const isPopUpInfo = ref(false)

import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()

function addAllPairs() {
    cve_list.value.forEach(cve => {
        let pair = {
            cveId: cve.cveId,
            capecId: capec.value.capecId
        }
        pairsStore.togglePairs(pair)
    });
    alert('Добавлено '+cve_list.value.length+' пар');
}

function set(cveId, capecId) {
    const pair = {
        cveId: cveId,
        capecId: capecId
    }
    let checked = pairsStore.checkBoolean(pair)
    if (checked === -1) {
        pairsStore.addPair(pair)
    }
    console.log(checked);
}

function getColorStyle(likelihood) {
    if (likelihood === 'Very High') {
        return { background: '#901A00' };
    } else if (likelihood === 'High') {
        return { background: '#F24822' };
    } else if (likelihood === 'Medium') {
        return { background: '#ffe600' };
    } else if (likelihood === 'Low') {
        return { background: '#14AE5C' };
    } else if (likelihood === 'Very Low') {
        return { background: '#14AE5C' };
    }
    return {}; // Default style if needed
}

function check(cveId, capecId) {
    const pair = {
        cveId: cveId,
        capecId: capecId
    }
    let checked = pairsStore.check(pair)
    return pairsStore.check(pair)
}

async function fetchProducts() {
    await $axios().get('/capec/' + route.params.id, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    }).then(res => capec.value = res.data)
}

async function fetchCve() {
    await $axios().get('/cve/byCapecId/' + route.params.id, {
        headers: {
            "ngrok-skip-browser-warning": "124124",
        },
    }).then(res => cve_list.value = res.data).catch(err => console.log(err))
}
fetchProducts()
fetchCve()

function parse(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return 'null';
    }
}
</script>

<style lang="scss" scoped>
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
  