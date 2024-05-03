<template>
    <div class="container">
        <h1>Главная страница</h1>
        <div class="line">
            <div v-for="i in row_1" :key="i.id" class="item">
                <img :src="i.img" alt="">
                <div class="info">
                    <USkeleton v-if="!i?.count" class="h-4 w-[40px]" />
                    <h3 v-if="i?.count">{{ i.count }}</h3>
                    <p>{{ i.desc }}</p>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="item desc">
                <p>Данный инструментарий включает в себя подробную информацию об актуальных шаблонах атак и уязвимостях.</p>
                <p>На главной странице доступна информация, которая обновляется каждый день<br /> 1. Количество шаблонов
                    атак, сколько из шаблонов атак имею связь с описание ошибки CWE. <br /> И сколько из этих шаблонов атак
                    имеют связь с уязвимостями представленными в CISA KEV.</p>
                <p>По кнопкам сбоку мы можем переключаться между страницами.<br /> Есть 3 основные страницы:</p>
                <ol style="padding: 0 15px;">
                    <li>Каталог шаблонов атак CAPEC</li>
                    <li>Каталог уязвимостей CISA KEV</li>
                    <li>Анализ выбранных пар CAPEC &ndash; CISA KEV</li>
                </ol>
                <h4>Описание страниц</h4>
                <ol start="1">
                    <li>Каталог CAPEC.</li>
                </ol>
                <p>На этой странице предоставлены шаблоны CAPEC, у которых есть связь с одной или несколькими уязвимостями
                    CISA KEV.</p>
                <p>На странице есть поиск, с помощью которого можно искать шаблоны по ключевым словам. <br /> Поиск
                    осуществляется по полям ID, Название, Описание.</p>
                <p>Открыв карточку с названием CAPEC-XXX, у нас откроется страница, на которой представлен риск-ландшафт для
                    пар CAPEC-XXX и используемых уязвимостей CVE-XXXX-XXX.</p>
                <p>Нажав на графике на нужную пару, она подсветится ниже. При нажатии на эту пару откроется модальное окно,
                    в котором описана вся информация об паре CAPEC-XXX | CVE-XXXX-XXX. Проверив что, данная пара подходит
                    нам по описаниям, эту пару можно добавить к сравнению, нажав на кнопку добавить к сравнению.</p>
                <ol start="2">
                    <li>Каталог CVE.</li>
                </ol>
                <p>На этой странице предоставлены уязвимости CVE, у которых есть связь с одним или несколькими шаблонами
                    атаки.</p>
                <p>На странице есть поиск, с помощью которого можно искать шаблоны по ключевым словам.</p>
                <p>Поиск осуществляется по полям ID, Название, Описание.</p>
                <p>Открыв карточку с названием CVE-XXXX-XXX, у нас откроется страница, на которой представлен риск-ландшафт
                    для пар CVE-XXXX-XXX и шаблонов атаки CAPEC-XXX, который используют эту уязвимость.</p>
                <p>Нажав на графике на нужную пару, она подсветится ниже. При нажатии на эту пару откроется модальное окно,
                    в котором описана вся информация об паре CAPEC-XXX | CVE-XXXX-XXX. Проверив что, данная пара подходит
                    нам по описаниям, эту пару можно добавить к сравнению, нажав на кнопку добавить к сравнению.</p>
                <ol start="3">
                    <li>Анализ выбранных пар</li>
                </ol>
                <p>На этой странице предоставлены пары CVE-XXXX-XXX | CAPEC-XXX, которые мы выбрали для сравнения.&nbsp;</p>
                <p></p>
                <h4>Использование.</h4>
                <p>Данный инструментарий позволяет использовать общий язык для описания и анализа угроз безопасности, что
                    облегчит и структурирует информацию об уязвимостях.</p>
                <p>Так же, помогает обучающимся и специалистам лучше понимать связи между различными типами уязвимостей,
                    методами атак и подходами к их устранению. Это также может служить образовательным ресурсом для
                    разработчиков программного обеспечения, менеджеров проектов и исследователей в области безопасности.</p>
                <p>Интеграция данных CWE, CAPEC и CVE может улучшить процессы оценки уязвимостей и управления рисками.
                    Организации смогут лучше определять приоритеты при устранении уязвимостей, понимая, какие слабости
                    наиболее часто эксплуатируются и какие атаки наиболее вероятны.</p>
                <p>Исследователи и разработчики инструментов безопасности смогут использовать интегрированную базу данных
                    для анализа тенденций, разработки новых методов обнаружения уязвимостей и создания более эффективных
                    средств защиты.</p>
                <p>Интеграция этих стандартов и баз данных в одну систему в рамках дипломного проекта не только усилит
                    понимание текущего ландшафта угроз, но и способствует разработке новых стратегий для предотвращения и
                    реагирования на кибератаки.</p>
            </div>
            <div class="item kpi1">
                <div id="kpi"></div>
            </div>
            <div class="item kpi2">
                <div id="kpi2"></div>
            </div>
        </div>

    </div>
</template>

<script setup>

let text = `

`

// import Highcharts from 'highcharts'
// import SolidGauge from 'highcharts/modules/solid-gauge';
// import Exporting from 'highcharts/modules/exporting';
// SolidGauge(Highcharts);
// Exporting(Highcharts);


const json = ref({})
const row_1 = ref([
    {
        id: 0,
        count: json.value?.capecCount,
        type: 'capec',
        desc: 'шаблонов атаки',
        img: 'capec.png'
    },
    {
        id: 1,
        count: json.value?.cweCount,
        type: 'cwe',
        desc: 'типов ошибки',
        img: 'cwe.png'
    },
    {
        id: 2,
        count: json.value?.cveCount,
        type: 'cve',
        desc: 'уязвимостей CISA KEV',
        img: 'cve.png'
    },
    {
        id: 3,
        count: json.value?.bduCount,
        type: 'bdu',
        desc: 'уязвимостей БДУ',
        img: 'bdu.png'
    }
])
const row_2 = ref([{
    id: 0,
    type: 'capec',
    desc: 'шаблонов атаки',
    img: 'capec.png'
},
{
    id: 1,
    type: 'kpi',
    desc: 'типов ошибки',
    img: 'cwe.png'
},
{
    id: 2,
    type: 'locked',
    desc: 'уязвимостей CISA KEV',
    img: 'cve.png'
},
{
    id: 3,
    type: 'kpi2',
    desc: 'уязвимостей БДУ',
    img: 'bdu.png'
}])


function DiagramCAPEC(capec_count, capec_with_cwe, capec_with_cve) {

    Highcharts.chart('kpi', {

        chart: {
            type: 'solidgauge',
            maxWidth: '400px',
            height: '400px',
            backgroundColor: '#39394B'
        },

        title: {
            text: 'Количество зависимостей CAPEC',
            style: {
                color: "white",

                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                color: "white",
                align: 'center',
                fontSize: '16px'
            },
            valueSuffix: '%',
            pointFormat: '<p style="text-align:center">{series.name}<br>' +
                '<span style="font-size: 2em;  color: {point.color}; ' +
                'font-weight: bold">{point.value}</span></p>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) + 15
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Conversion
                outerRadius: '112%',
                innerRadius: '100%',
                backgroundColor: 'rgba(193, 80, 76, 0.50)',
                borderWidth: 0
            }, { // Track for Engagement
                outerRadius: '99%',
                innerRadius: '87%',
                backgroundColor: 'rgba(78, 129, 189, 0.50)',
                borderWidth: 0
            }, { // Track for Feedback
                outerRadius: '86%',
                innerRadius: '74%',
                backgroundColor: 'rgba(155, 187, 90, 0.5)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            name: 'Всего CAPEC',
            data: [{
                color: '#C1504C',
                align: 'center',
                value: capec_count,
                radius: '112%',
                innerRadius: '100%',
                y: 100
            }],
        }, {
            name: 'CAPEC с CWE',
            data: [{
                color: '#4E81BD',
                value: capec_with_cwe+'/'+capec_count,
                radius: '99%',
                innerRadius: '87%',
                y: Math.round(capec_with_cwe / capec_count * 100)
            }],
        }, {
            name: 'CAPEC с CVE',
            data: [{
                color: '#9BBB5A',
                value: capec_with_cve+'/'+capec_count,
                radius: '86%',
                innerRadius: '74%',
                y: Math.round(capec_with_cve / capec_count * 100)
            }],
        }]
    });
}
function DiagramCVE(cve_count, cve_with_bdu, cve_with_capec) {

    Highcharts.chart('kpi2', {

        chart: {
            type: 'solidgauge',
            maxWidth: '400px',
            height: '400px',
            backgroundColor: '#39394B'
        },

        title: {
            text: 'Количество зависимостей CVE',
            style: {
                color: "white",

                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                color: "white",
                align: 'center',
                fontSize: '16px'
            },
            valueSuffix: '%',
            pointFormat: '<p style="text-align:center">{series.name}<br>' +
                '<span style="font-size: 2em;  color: {point.color}; ' +
                'font-weight: bold">{point.value}</span></p>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) + 15
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Conversion
                outerRadius: '112%',
                innerRadius: '100%',
                backgroundColor: 'rgba(193, 80, 76, 0.50)',
                borderWidth: 0
            }, { // Track for Engagement
                outerRadius: '99%',
                innerRadius: '87%',
                backgroundColor: 'rgba(78, 129, 189, 0.50)',
                borderWidth: 0
            }, { // Track for Feedback
                outerRadius: '86%',
                innerRadius: '74%',
                backgroundColor: 'rgba(155, 187, 90, 0.5)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        series: [{
            name: 'Всего CVE в CISA KEV',
            data: [{
                color: '#C1504C',
                align: 'center',
                value: cve_count,
                radius: '112%',
                innerRadius: '100%',
                y: 100
            }],
        }, {
            name: 'CVE с БДУ',
            data: [{
                color: '#9BBB5A',
                value: cve_with_bdu+'/'+cve_count,
                radius: '99%',
                innerRadius: '87%',

                y: Math.round(cve_with_bdu / cve_count * 100)
            }],
        }, {
            name: 'CVE с CAPEC',
            data: [{
                color: '#4E81BD',
                value: cve_with_capec+'/'+cve_count,
                radius: '86%',
                innerRadius: '74%',
                y: Math.round(cve_with_capec / cve_count * 100)
            }],
        },]
    });
}
onMounted(async () => {
    await nextTick()
    DiagramCAPEC(json.value.capecCount, json.value.capecWithCweCount, json.value.capecCountWithCveLinked )
    DiagramCVE(json.value.cveCount, json.value.countCveBduPairs, json.value.cveCountWithCapecLinked)
})
onUpdated(() => {
    DiagramCAPEC(json.value.capecCount, json.value.capecWithCweCount, json.value.capecCountWithCveLinked )
    DiagramCVE(json.value.cveCount, json.value.countCveBduPairs, json.value.cveCountWithCapecLinked)
})
async function fetchMainPageInformation() {
    const response = await $axios().get('/api/main/', {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    })
    json.value = response.data
    row_1.value[0].count = response.data.capecCount
    row_1.value[1].count = response.data.cweCount
    row_1.value[2].count = response.data.cveCount
    row_1.value[3].count = response.data.bduCount

}
fetchMainPageInformation()

</script>

<style lang="scss" scoped>
body {
    background: #222131;
}

#kpi {}

.container {

    h1 {
        margin-bottom: 35px;
        font-size: 2rem;
    }

    .grid {
        display: grid;
        grid-template-columns: 2.5fr 1.5fr;
        grid-template-areas:
            'a b'
            'a c';
        gap: 28px;

        .locked {
            &::before {
                display: block;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(255, 255, 255, 0.233);
                width: 100%;
                height: 100%;
                filter: blur(2px);
                z-index: 0;
            }
        }

        .desc {
            display: block !important;
            grid-area: a;
            overflow-y: scroll;
            height: 1028px !important;
            padding: 50px;

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

            h3,
            h4 {
                font-weight: 500;
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }

            p {
                font-weight: 400 !important;
                color: white !important;
                text-align: justify;
                margin-bottom: 1rem;
            }

            ol {
                padding-left: 50px;
                list-style: decimal;

                li {
                    margin-bottom: 1rem;
                }
            }
        }

        .kpi1 {
            grid-area: b;
        }

        .kpi2 {
            grid-area: c;
        }

        .item {
            position: relative;
            background-color: #39394B;
            height: 500px;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;

            img {
                width: 100px;
            }

            p {
                color: black;
                font-weight: 700;
            }


        }
    }

    .line {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 28px;
        margin-bottom: 28px;

        .item {
            background-color: #39394B;
            height: 100px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            .info {
                h3 {
                    font-weight: 500;
                }
            }
        }
    }
}</style>