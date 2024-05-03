<template>
    <div class="flex container">
        <header class="row">
            <h2>Уязвимость {{ cve.cveId }}</h2>
            <button @click="isPopUpInfo = true; fetchProducts()">Редактировать поля</button>
        </header>
        <div class="part row info">
            <div class="subtitle">
                <h3>Наменование уязвимости</h3>
                <p>{{ cve.cisaVulnerabilityName }}</p>
            </div>
            <div class="subtitle">
                <h3>Описание уязвимости</h3>
                <p>{{ parse(cve.descriptions)[0].value }}</p>
            </div>
        </div>
        <PopUpInfoCve @close="isPopUpInfo = false" v-if="isPopUpInfo" :cve="cve"></PopUpInfoCve>
        <RiskLandshaftCve v-if="cve.cveId && capec_list.length > 0" :cve="cve" :capec_list="capec_list" />
        <div class="list row">
            <button @click="addAllPairs()">Добавить все пары</button>
        </div>
        <div class="list row">
            <div class="grid">
                <div :id="'CAPEC-' + capec.capecId" :key="capec.capecId"
                    @click="isPopUp = true; checkedCapec.value = capec;" v-for="capec in capec_list" class="item">
                    <p>CAPEC-{{ capec.capecId }}</p>
                    <!-- <label @click="set(cve.cveId, capec.capecId)" class="checkbox-container">
                        <input class="custom-checkbox" checked="" type="checkbox">
                        <span :class="{ checked: check(cve.cveId, capec.capecId) }" class="checkmark"></span>
                    </label> -->

                </div>
            </div>
        </div>
        <PopUp @close="isPopUp = false" v-if="isPopUp" :cve="cve" :capec="checkedCapec"></PopUp>
        <!-- <BaseTableCapec :capec="capec" :capec_list="capec_list" /> -->
    </div>
</template>
  
<script setup>
const route = useRoute()
const capec_list = ref([])
const cve = ref({})
const checkedCapec = ref({})
const isPopUp = ref(false)
const isPopUpInfo = ref(false)

import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()

function addAllPairs() {
    capec_list.value.forEach(capec => {
        let pair = {
            cveId: cve.value.cveId,
            capecId: capec.capecId
        }
        pairsStore.togglePairs(pair)
    });
    alert('Добавлено '+capec_list.value.length+' пар');
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

function check(cveId, capecId) {
    const pair = {
        cveId: cveId,
        capecId: capecId
    }
    let checked = pairsStore.check(pair)
    return pairsStore.check(pair)
}

async function fetchProducts() {
    await $axios().get('/cve/' + route.params.id, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    }).then(res => cve.value = res.data)
}
async function fetchCve() {
    await $axios().get('/capec/byCveId/' + route.params.id, {
        headers: {
            "ngrok-skip-browser-warning": "124124",
        },
    }).then(res => capec_list.value = res.data).catch(err => console.log(err))
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
  