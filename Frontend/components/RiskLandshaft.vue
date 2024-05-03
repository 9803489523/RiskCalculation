<template>
    <div class="list row">
        <div class="grid">
            <div id="myDiv" class="landshaft">
            </div>
            <div class="calc">
                <h2>Калькулятор</h2>
                <URadioGroup :help="{ color: '0x000000' }" :color="'blue'" v-model="type_risk_landshaft"
                    legend="Выберите тип" :options="options" />
                <div v-if="type_risk_landshaft === 'worth'" class="inputs">
                    <h3>Оценка рисков через измерение ценности информации</h3>
                    <div v-for="(item, i) in worth" class="input">
                        <p>Удельная ценность {{ item.name }}</p>
                        <input class="mod" type="number" step="0.1" min="0" max="1" v-model="item.value" placeholder="0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
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
    riskAvail
} from '@/composables/useRiskFunctions'

const props = defineProps({
    capec: Object,
    cve_list: Array
})

const type_risk_landshaft = ref('base')

const options = [{
    value: 'base',
    label: 'Абстрактная оценка рисков'
}, {
    value: 'worth',
    label: 'Оценка рисков с использованием ценности информации'
}
]

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
            name: 'Риск целостности',
            data: [],
            color: '#4E81BD'
        },
        {
            name: 'Риск конфиденциальности',
            data: [],
            color: '#C1504C'
        },
        {
            name: 'Риск доступности',
            data: [],
            color: '#9BBB5A'
        }
    ]
    props.cve_list.forEach(cve => {
        categories.value.push(cve?.cveId)
        chart_series[0].data.push(Number(riskConf(parse(cve?.metrics), props.capec?.likelihoodOfAttack, worth.value[0].value, type_risk_landshaft)))
        chart_series[1].data.push(Number(riskInt(parse(cve?.metrics), props.capec?.likelihoodOfAttack, worth.value[1].value, type_risk_landshaft)))
        chart_series[2].data.push(Number(riskAvail(parse(cve?.metrics), props.capec?.likelihoodOfAttack, worth.value[2].value, type_risk_landshaft)))
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
    const chart = Highcharts.chart('myDiv', {
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
            text: type_risk_landshaft.value === 'worth' ? 'Риск ландшафт с использованием ценности информации' : 'Абстрактный риск ландшафт',
            align: 'center'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '11px' // Установка размера шрифта подписей по оси X
                }
            },
            categories: categories.value,
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            max: 1,
            tickInterval: 1,
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
})
onMounted(() => {
    setAxesConf()
    const chart = Highcharts.chart('myDiv', {
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
            text: type_risk_landshaft.value === 'worth' ? 'Риск ландшафт с использованием ценности информации' : 'Абстрактный риск ландшафт',
            align: 'center'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '11px' // Установка размера шрифта подписей по оси X
                }
            },
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
                     color: black;
                     //  border: 1px solid rgb(206, 206, 206);
                     border-radius: 10px;
                     padding: 3px 10px 5px 10px;

                 }


             }
         }
     }
 }
</style>