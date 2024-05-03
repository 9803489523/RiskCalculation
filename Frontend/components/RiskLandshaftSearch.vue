<template>
    <div class="list row">
        <div class="grid">
            <div v-show="type_risk_landshaft === 'base' || type_risk_landshaft === 'worth'" id="myDiv" class="landshaft">
            </div>
            <div v-show="type_risk_landshaft === 'time'" id="myDiv2" class="landshaft">
            </div>
            <div v-show="type_risk_landshaft === 'sum'" id="myDiv3" class="landshaft">
            </div>
            <div class="calc">
                <h2>Калькулятор</h2>
                <URadioGroup :color="'blue'" v-model="type_risk_landshaft" legend="Выберите тип" :options="options" />
                <div v-if="type_risk_landshaft === 'worth'" class="inputs">
                    <h3>Оценка рисков через измерение ценности информации</h3>
                    <div v-for="(item, i) in worth" class="input">
                        <p>Удельная ценность {{ item.name }}</p>
                        <input class="mod" type="number" step="0.1" min="0" max="1" v-model="item.value" placeholder="0" />
                    </div>
                </div>
                <div v-if="type_risk_landshaft === 'time'" class="inputs">
                    <h3>Оценка риска через время простоя</h3>
                    <div v-for="(item, i) in worth_2" class="input">
                        <p>{{ item.name }}</p>
                        <input class="mod" type="number" step="60" min="0" v-model="item.value" placeholder="0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script setup>
import { useCalcRiskStore } from '@/stores/calc'
const typeStore = useCalcRiskStore()
const emit = defineEmits('done')
import {
    loaToNubmer,
    attackVectorToNubmer,
    attackComplexityToNubmer,
    privilegesRequiredToNubmer,
    userInteractionToNubmer,
    confidentialityImpactToNubmer,
    integrityImpactToNubmer,
    availabilityImpactToNubmer,
    confidentialityImpactV2ToNubmer,
    integrityImpactV2ToNubmer,
    availabilityImpactV2ToNubmer,
    accessVectorToNubmer,
    accessComplexityToNubmer,
    authenticationToNubmer,
    riskConf,
    riskInt,
    riskAvail,
    riskTime
} from '@/composables/useRiskFunctions'

const props = defineProps({
    pairs: Array
})

const type_risk_landshaft = ref('base')

watch(type_risk_landshaft, (newValue, oldValue) => {
    typeStore.type = newValue
});
const worth = ref([
    {
        name: 'конфиденциальности',
        value: 1

    },
    {
        name: 'целостности',
        value: 1

    },
    {
        name: 'доступности',
        value: 1

    },

])

const worth_2 = ref([
    {
        name: 'Среднестатистическое время простоя в c.',
        value: 1

    },
    {
        name: 'Стоимость единицы времени за 1 с.',
        value: 1

    },

])
watch(worth, (newValue, oldValue) => {
    typeStore.worth[0] = newValue[0]
    typeStore.worth[1] = newValue[1]
    typeStore.worth[2] = newValue[2]
},
    { deep: true });
watch(worth_2, (newValue, oldValue) => {
    typeStore.worth_2[0] = newValue[0]
    typeStore.worth_2[1] = newValue[1]

}, { deep: true });

const options = [{
    value: 'base',
    label: 'Абстрактная оценка рисков'
}, {
    value: 'worth',
    label: 'Оценка рисков с использованием ценности информации'
}, {
    value: 'time',
    label: 'Оценка риска с использованием времени простоя'
}]

const categories = ref([])
let chart_series = [
    {
        name: 'Риск конфиденциальности',
        data: []
    },
    {
        name: 'Риск целостности',
        data: []
    },
    {
        name: 'Риск доступности',
        data: []
    }
]
let chart_series_time = [
    {
        name: 'Риск через время простоя',
        data: []
    },
]
function parse(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return 'null';
    }
}

function setAxesConf() {
    chart_series = [
        {
            name: 'Риск конфиденциальности',
            data: [],
            color: '#4E81BD'
        },
        {
            name: 'Риск целостности',
            data: [],
            color: '#C1504C'
        },
        {
            name: 'Риск доступности',
            data: [],
            color: '#9BBB5A'
        }
    ]
    props.pairs.forEach(pair => {
        categories.value.push('CAPEC-' + pair.capec?.capecId + '<br>' + pair.cve.cveId)
        chart_series[0].data.push(Number(riskConf(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[0].value, type_risk_landshaft)))
        chart_series[1].data.push(Number(riskInt(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[1].value, type_risk_landshaft)))
        chart_series[2].data.push(Number(riskAvail(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[2].value, type_risk_landshaft)))
    });
}

function setAxesKConf() {
    chart_series = [
        {
            name: 'Риск конфиденциальности k уязвимостей',
            data: [],
            color: '#4E81BD'
        },
        {
            name: 'Риск целостности k уязвимостей',
            data: [],
            color: '#C1504C'
        },
        {
            name: 'Риск доступности k уязвимостей',
            data: [],
            color: '#9BBB5A'
        }
    ]
    let k_riskConf = 0
    let k_riskInt = 0
    let k_riskAvail = 0

    categories.value.push('CAPEC-228')

    props.pairs.forEach(pair => {
        k_riskConf += Number(riskConf(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[0].value, type_risk_landshaft))
        k_riskInt += Number(riskInt(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[0].value, type_risk_landshaft))
        k_riskAvail += Number(riskAvail(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[0].value, type_risk_landshaft))

        // chart_series[1].data.push(Number(riskInt(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[1].value, type_risk_landshaft)))
        // chart_series[2].data.push(Number(riskAvail(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth.value[2].value, type_risk_landshaft)))
    });
    chart_series[0].data.push(k_riskConf)
    chart_series[1].data.push(k_riskInt)
    chart_series[2].data.push(k_riskAvail)
}

function setTimeAxesConf() {
    chart_series_time = [
        {
            name: 'Риск через время простоя',
            data: [],
            color: '#C1504C'
        },
    ]
    props.pairs.forEach(pair => {
        categories.value.push('CAPEC-' + pair.capec?.capecId + '<br>' + pair.cve.cveId)
        chart_series_time[0].data.push(Number(riskTime(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, worth_2.value[0].value, worth_2.value[1].value)))
    });
}

function scrollToAndHighlight(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight');
    }
}


onUpdated(() => {
    setAxesConf()
    Highcharts.chart('myDiv', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 2,
                depth: 0
            }
        },
        title: {
            text: type_risk_landshaft.value === 'worth' ? 'Риск ландшафт с использованием ценности информации' : 'Риск ландшафт с использованием абстрактной оценки',
            align: 'center'
        },
        xAxis: {
            categories: categories.value,
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            max: 1,
            title: {
                text: '<i>Risk</i>'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.05,
                borderWidth: 0,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            scrollToAndHighlight(this.category)
                        }
                    }
                }
            }
        },
        series: chart_series
    });
    if (type_risk_landshaft.value === 'time') {
        setTimeAxesConf()
        const chart_2 = Highcharts.chart('myDiv2', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 2,
                    depth: 0
                }
            },
            title: {
                text: 'Риск ландшафт с использованием времени простоя',
                align: 'center'
            },
            xAxis: {
                categories: categories.value,
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '<i>Risk</i>'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                scrollToAndHighlight(this.category)
                            }
                        }
                    }
                }
            },
            series: chart_series_time
        });
    }
    if (type_risk_landshaft.value === 'sum') {
        setAxesKConf()
        const chart_3 = Highcharts.chart('myDiv3', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 2,
                    depth: 0
                }
            },
            title: {
                text: 'Риск ландшафт с использованием сразу нескольких k уязвимостей',
                align: 'center'
            },
            xAxis: {
                categories: '',
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '<i>Risk</i>'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                scrollToAndHighlight(this.category)
                            }
                        }
                    }
                }
            },
            series: chart_series
        });
    }

})
onMounted(async () => {
    await nextTick()
    await nextTick()
    setAxesConf()
    Highcharts.chart('myDiv', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 2,
                depth: 0
            }
        },
        title: {
            text: type_risk_landshaft.value === 'worth' ? 'Риск ландшафт с использованием ценности информации' : 'Риск ландшафт с использованием абстрактной оценки',
            align: 'center'
        },
        xAxis: {
            categories: categories.value,
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            max: 1,
            title: {
                text: '<i>Risk</i>'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.05,
                borderWidth: 0,
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            scrollToAndHighlight(this.category)
                        }
                    }
                }
            }
        },
        series: chart_series
    });
    if (type_risk_landshaft.value === 'time') {
        setTimeAxesConf()
        const chart_2 = Highcharts.chart('myDiv2', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 2,
                    depth: 0
                }
            },
            title: {
                text: 'Риск ландшафт с использованием времени простоя',
                align: 'center'
            },
            xAxis: {
                categories: categories.value,
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '<i>Risk</i>'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                scrollToAndHighlight(this.category)
                            }
                        }
                    }
                }
            },
            series: chart_series_time
        });
    }
    if (type_risk_landshaft.value === 'sum') {
        setAxesKConf()
        const chart_3 = Highcharts.chart('myDiv3', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 2,
                    depth: 0
                }
            },
            title: {
                text: 'Риск ландшафт с использованием времени простоя',
                align: 'center'
            },
            xAxis: {
                categories: '',
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '<i>Risk</i>'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.05,
                    borderWidth: 0,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                scrollToAndHighlight(this.category)
                            }
                        }
                    }
                }
            },
            series: chart_series
        });
    }
    emit('done')
})

</script>

<style lang="scss" scoped> .row {

     // Добавьте этот CSS класс в ваш стилевой файл для подсветки
     width: 100%;

     .grid {
         display: grid;
         grid-template-columns: 3fr 1fr;
         gap: 16px;
     }

     .landshaft {
         width: 100%;
         height: 600px;
         box-sizing: border-box;

     }

     .calc {
         background-color: #39394B;

         box-sizing: border-box;
         padding: 15px;
         height: 600px;
         border-radius: 10px;

         //  border: 1px solid rgb(206, 206, 206);

         h2 {
             font-size: 1.5rem;
             font-weight: 500;
             margin-bottom: 20px;
         }

         .inputs {
             display: flex;
             flex-direction: column;
             gap: 20px;
             margin-top: 40px;
             margin-bottom: 40px;

             .input {
                 display: flex;
                 flex-direction: column;
                 gap: 8px;

                 input {
                     //  border: 1px solid rgb(206, 206, 206);
                     border-radius: 10px;
                     padding: 3px 0 5px 10px;
                 }
             }
         }
     }
 }
</style>