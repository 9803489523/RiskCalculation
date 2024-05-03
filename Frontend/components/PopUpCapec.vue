<template>
    <div class="popup">
        <div class="wrapper">
            <div class="grid">

                <div class="part capec">
                    <h2>CAPEC-{{ props.capec.capecId }}</h2>
                    <div class="subtitle">
                        <h3>Наменование типа атаки</h3>
                        <p>{{ props.capec.name }}</p>
                    </div>
                    <div class="subtitle">
                        <h3>Описание типа атаки</h3>
                        <p>{{ props.capec.description }}</p>
                    </div>
                    <div class="subtitle">
                        <h3>Вероятность успешности атаки</h3>
                        <div class="loa">
                            <i :style="getColorStyle(props.capec?.likelihoodOfAttack)"></i>
                            <p>{{ props.capec?.likelihoodOfAttack }}</p>

                        </div>
                    </div>
                    <div class="subtitle">
                        <h3>Меры по смягчению</h3>
                        <p>{{ parse(props.capec?.mitigations).Mitigation }}</p>
                    </div>
                </div>
                <div v-if="bdu !== null" class="part bdu_cve">
                    <h2>{{ props.cve.value.cveId }}</h2>
                    <div class="subtitle">
                        <h3>Наменование уязвимости</h3>
                        <p v-if="bdu?.vulnerabilityName">{{ bdu?.vulnerabilityName }}</p>
                    </div>
                    <div class="subtitle text">
                        <h3>Описание уязвимости</h3>
                        <p><span>Описание: </span>{{ bdu?.vulnerabilityDescription }}</p>
                        <p><span>Тип ошибки: </span>{{ bdu?.cweType }}</p>
                        <p><span>Описание ошибки: </span>{{ bdu?.cweDescription }}</p>
                        <p><span>Класс уязвимости: </span>{{ bdu?.vulnerabilityClass }}</p>
                        <p><span>Вендор ПО : </span>{{ bdu?.vendor }}</p>
                        <p><span>Название ПО: </span>{{ bdu?.productName }}</p>
                        <p><span>Версия ПО ошибки: </span>{{ bdu?.productVersion }}</p>
                        <p><span>Тип ПО: </span>{{ bdu?.productType }}</p>
                        <p v-if="bdu?.cvss30"><span>Вектор CVSS 3.0:</span> {{ bdu?.cvss30 }}</p>
                        <p v-else><span>Вектор CVSS 2.0:</span> {{ bdu?.cvss20 }}</p>
                    </div>
                    <div class="subtitle">
                        <h3>Меры реагирования</h3>
                        <p v-if="bdu?.remediationMeasures">{{ bdu?.remediationMeasures }}</p>
                    </div>
                </div>
                <div v-else class="part cve">
                    <h2>{{ props.cve.value.cveId }}</h2>
                    <div class="subtitle">
                        <h3>Наменование уязвимости</h3>
                        <p v-if="bdu?.vulnerabilityName">{{ bdu?.vulnerabilityName }}</p>
                        <p v-else>{{ props.cve.value.cisaVulnerabilityName }}</p>
                    </div>
                    <div class="subtitle">
                        <h3>Описание уязвимости</h3>
                        <p v-if="bdu?.vulnerabilityDescription"><span>Описание: </span>{{ bdu?.vulnerabilityDescription }}
                        </p>
                        <p v-else><span>Описание: </span>{{ parse(props.cve.value.descriptions)[0].value }}</p>

                        <p v-if="bdu?.cweType"><span>Тип ошибки: </span>{{ bdu?.cweType }}</p>
                        <p v-else><span>Описание: </span>{{ parse(props.cve.value.descriptions)[0].value }}</p>

                    </div>
                </div>
            </div>
            <AddToCompareButton :pair="pair" @button_clicked="handleButtonClick" />
        </div>
        <div @click="$emit('close')" class="dark">

        </div>
    </div>
</template>

<script setup>
import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()



const props = defineProps({
    cve: Object,
    capec: Object
})

const pair = ref({
    cveId: props.cve.value.cveId,
    capecId: props.capec.capecId
})

const bdu = ref({})


const isAdded = computed(() => {
    let pair = {
        cveId: props.cve.value.cveId,
        capecId: props.capec.capecId
    }
    return pairsStore.checkBoolean(pair)
})


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

function parse(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return 'null';
    }
}

async function fetchProducts() {
    try {
        const response = await $axios().get('http://localhost:8080/bdu/byCveId/' + props.cve.value.cveId, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
        })
        bdu.value = response.data
    } catch (error) {
        bdu.value = null; // Присвоить null, если статус ответа 404
    }
}
await fetchProducts()
</script>

<style lang="scss" scoped>
#checkbox {
    display: none;
}

.toggle {
    position: relative;
    width: 40px;
    cursor: pointer;
    margin: auto;
    display: block;
    height: calc(4px * 3 + 11px * 2);
}

.bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: calc(4px / 2);
    background: #7b52b9;
    color: inherit;
    opacity: 1;
    transition: none 0.35s cubic-bezier(.5, -0.35, .35, 1.5) 0s;
}

/***** Tornado Animation *****/

.bar--top {
    bottom: calc(50% + 11px + 4px/ 2);
    transition-property: bottom, transform;
    transition-delay: calc(0s + 0.35s) * .6;
}

.bar--middle {
    top: calc(50% - 4px/ 2);
    transition-property: opacity, transform;
    transition-delay: calc(0s + 0.35s * .3);
}

.bar--bottom {
    top: calc(50% + 11px + 4px/ 2);
    transition-property: top, transform;
    transition-delay: 0s;
}

#checkbox:hover+.toggle .bar--top {
    transform: rotate(-135deg);
    transition-delay: 0s;
    bottom: calc(50% - 4px/ 2);
}

#checkbox:hover+.toggle .bar--middle {
    opacity: 0;
    transform: rotate(-135deg);
    transition-delay: calc(0s + 0.35s * .3);
}

#checkbox:hover+.toggle .bar--bottom {
    top: calc(50% - 4px/ 2);
    transform: rotate(-225deg);
    transition-delay: calc(0s + 0.35s * .6);
}

.popup {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper {
        width: 800px;
        height: 650px;

        background-color: #39394B;
        z-index: 11;
        position: relative;

        .grid {
            overflow-y: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar {
                width: 12px;
                /* ширина scrollbar */
            }

            &::-webkit-scrollbar-track {
                background: #222131;
                /* цвет дорожки */
            }

            &::-webkit-scrollbar-thumb {
                background-color: #39394B;
                /* цвет плашки */
                border-radius: 20px;
                padding: 0 5px;
                /* закругления плашки */
                border: 3px solid #222131;
                /* padding вокруг плашки */
            }

            padding: 20px 50px;
            border-radius: 10px;
            height: 600px;

            position: relative;

            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 50px;

            .part {

                align-self: stretch;
                display: flex;
                flex-direction: column;
                gap: 20px;

                h2 {
                    position: sticky;
                    top: -20px;
                    padding: 10px 10px 12px;
                    border-radius: 0;
                    border-radius: 5px;
                    background-color: #4A668E;
                    color: white;
                    font-weight: 400;
                    text-align: center;
                    font-size: 1.5rem;
                }

                .text {
                    p {
                        margin-bottom: 10px;
                    }
                }

                .subtitle {
                    .loa {
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        i {
                            display: block;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            border-color: 1px solid rgb(206, 206, 206);
                        }
                    }

                    h3 {
                        font-size: 1.2rem;
                        font-weight: 500;
                        margin-bottom: 8px;
                    }

                    p {
                        max-width: 316px;

                        span {
                            font-weight: 500;
                        }
                    }
                }
            }
        }

        .close {
            position: absolute;
            top: 15px;
            right: 20px;
        }
    }

    .dark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.377);
    }
}</style>