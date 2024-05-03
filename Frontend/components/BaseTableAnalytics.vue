<template>
    <div class="table">
        <h5 style="display: flex; justify-content: center;">
            <span @click="downloadXLSX()" style="cursor: pointer; color: blue; text-decoration: underline;">Скачать информацию в XLSX</span>
        </h5>
        <table v-show="false" id="TableToExport">

            <thead style="margin-bottom: 100px; padding-bottom: 100px;">
                <tr>
                    <th>Порядковый номер сочетания</th>
                    <th>Идентификатор шаблона атаки CAPEC</th>
                    <th>Наименование шаблона атаки CAPEC</th>
                    <th>Описание шаблона атаки CAPEC</th>
                    <th>Сценарий атаки </th>
                    <th>Вероятность успешного использования шаблона атаки CAPEC</th>
                    <th>Тип ошибки CWE</th>
                    <th>Идентификатор уязвимости CVE</th>
                    <th>Наименование уязвимости CVE/БДУ</th>
                    <th>Описание уязвимости CVE/БДУ</th>
                    <th v-if="type !== 'time' && type !== 'sum'" style="width: 150px;">Абстрактное значение риска
                        конфиденциальности</th>
                    <th v-if="type !== 'time' && type !== 'sum'" style="width: 150px;">Абстрактное значение риска
                        доступности</th>
                    <th v-if="type !== 'time' && type !== 'sum'" style="width: 150px;">Абстрактное значение риска
                        целостности</th>
                    <th>Меры по смягчению последствий</th>
                    <th>Меры реагирования на уязвимость</th>
                </tr>
            </thead>
            <tbody v-for="(pair, i) in props.pairs">
                <tr>
                    <td>{{ i + 1 }}</td>
                    <td>CAPEC-{{ pair.capec?.capecId }}</td>
                    <td>{{ pair.capec?.name }}</td>
                    <td>{{ pair.capec?.description }}</td>
                    <td v-if="parse(pair.capec.executionFlow)?.Attack_Step">
                        <p v-for="step in parse(pair.capec.executionFlow).Attack_Step">{{ step.Description
                        }}</p>
                    </td>
                    <td v-else>
                        Для данной пары, CAPEC не продоставил информацию о сценарии атаки.
                    </td>
                    <td>{{ pair.capec?.likelihoodOfAttack }}</td>
                    <td>CWE-{{ parse(pair.cve?.relatedWeaknesses)[0] }}</td>

                    <td>{{ pair.cve?.cveId }}</td>
                    <td>{{ pair?.bduDto ? pair?.bduDto.vulnerabilityName : pair.cve?.cisaVulnerabilityName }}</td>
                    <td>{{ pair?.bduDto ? pair?.bduDto.vulnerabilityDescription : pair.cve?.cisaVulnerabilityName }}</td>
                    <td>{{ Number(riskConf(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, calcStore.worth.value,
                        calcStore.type)) }}</td>
                    <td>{{ Number(riskInt(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, calcStore.worth.value,
                        calcStore.type)) }}</td>
                    <td>{{ Number(riskAvail(parse(pair.cve?.metrics), pair.capec?.likelihoodOfAttack, calcStore.worth.value,
                        calcStore.type)) }}</td>
                    <td>
                        <p v-for="Mitigation in parse(pair.capec?.mitigations).Mitigation">{{ Mitigation }}
                        </p>
                    </td>
                    <td>
                        <p v-if="pair?.bduDto">{{ pair?.bduDto.remediationMeasures }}</p>
                        <div class="ref">
                            <p :href="pair?.bduDto.sourcesLinks" v-if="pair?.bduDto">{{ pair?.bduDto.sourcesLinks }}</p>
                        </div>
                        <div v-for="ref in parse(pair.cve?.references)" class="ref">
                            <p :href="ref?.url" target="_blank" rel="noopener noreferrer">{{ ref?.url }}</p>
                            <div v-for="tag in ref?.tags" class="text">
                                <p>{{ tag }}</p>
                                <br style="mso-data-placement:same-cell;">
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script setup>
import { useCalcRiskStore } from '@/stores/calc'
const calcStore = useCalcRiskStore()
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
} from '@/composables/useRiskFunctionsStore'

const props = defineProps({
    pairs: Array
})

function parse(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return 'null';
    }
}

const json = ref([])

function downloadXLSX() {
    var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
}




</script>

<style lang="scss" scoped>
.ref {
    padding: 20px 0;

    a {
        white-space: wrap;
        /* Запрещаем перенос строк */
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }

    p {
        margin: 0;
        padding: 0;

        /* Добавляем многоточие */
    }

    border-bottom: 1px solid black;
}

.table {
    // padding: 50px;
}

.item {
    display: flex;
    gap: 20px;


    .column {
        border: 1px solid black;
        padding: 15px;
        width: 200px;

    }
}

table {
    table-layout: fixed;
    width: 100%;

    td {
        tr {
            border: 1px solid black;
        }
    }

    th {
        font-weight: 600 !important;
    }

    tr,
    th,
    td {
        font-family: serif;
        font-weight: 300;
        font-size: 14px;
        line-height: 1.25;
        text-align: center;
    }

    th.blank {
        width: 10px;
    }

    th,
    tr,
    td {
        border: 1px solid grey;
        padding: 15px;
    }
}
</style>