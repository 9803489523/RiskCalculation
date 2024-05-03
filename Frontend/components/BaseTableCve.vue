<template>
    <div class="table">
        <h5 style="display: flex; justify-content: space-between;">Схемы атак, которые использует уязвимость {{ cve_id }}
            <span @click="downloadXLSX()" style="cursor: pointer; color: blue; text-decoration: underline;">Скачать</span>
        </h5>
        <table v-show="false" id="TableToExport">

            <template v-if="json?.cve_list">
                <template v-for="(cve, i) in json?.cve_list ">
                    <thead style="margin-bottom: 100px; padding-bottom: 100px;">
                        <tr v-if="cve.cve_id === cve_id">
                            <th>Идентификатор атаки</th>
                            <th>Сценарий атаки </th>
                            <th style="width: 100px;">Тип ошибки</th>
                            <th style="width: 150px;">Идентификаторы уязвимостей которые использует атака</th>
                            <th style="width: 150px;">Значение риска</th>
                            <th>Меры по смягчению последствий</th>
                            <th>Меры реагирования устранения уязвимостей</th>
                            <!-- todo -->
                            <!-- <th>Меры ликвидации последствий</th> -->
                        </tr>
                    </thead>
                    <template v-if="cve?.capec_list.length > 0">
                        <template v-for="capec in cve?.capec_list">
                            <tbody v-if="cve.cve_id === cve_id">
                                <tr>
                                    <td>CAPEC-{{ capec.id }}</td>
                                    <td>
                                        <p v-for="step in capec.capec_info.execution_flow?.Attack_Step">{{ step.Description
                                        }}</p>
                                    </td>
                                    <td>{{ cve?.cve_weaknesses[0].description[0].value }}</td>
                                    <td>{{ cve.cve_id }}</td>
                                    <td><i>Risk = </i>{{ risk(cve.metrics, capec.capec_info.loa) }}</td>
                                    <td>
                                        <p v-for="Mitigation in capec.capec_info?.mitigations?.Mitigation">{{ Mitigation }}
                                        </p>
                                    </td>
                                    <td>
                                        <div v-for="ref in cve?.references" class="ref">
                                            <a :href="ref?.url" target="_blank" rel="noopener noreferrer">{{ ref?.url }}</a>
                                            <p v-for="tag in ref?.tags">{{ tag }}</p>
                                        </div>

                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </template>

                </template>
            </template>


            <tbody>




                <!-- <template v-for="cwe in capec.cwe_list"> -->
                <!-- <tr>
                    <td v-for="cve in cwe.cve_list.slice(0,2)" class="cwes column">
                        <p> {{ cve.cve_id }} </p>
                    </td>
                </tr> -->
                <!-- <tr v-for="cwe in capec.cwe_list(0, 2)">
                    <td v-for="cve in cwe.cve_list.slice(0,2)" class="cwes column">
                        <p> {{ cve.cve_id }} </p>
                    </td>
                </tr> -->
                <!-- </template> -->
            </tbody>
        </table>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
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
import axios from 'axios'

export default defineComponent({
    props: {
        cve_id: String,
    },
    name: 'Table',
    data() {
        return {
            json: {}
        }
    },
    methods: {
        async fetchProducts() {
            const response = await axios.get('/cvetocapec.json')
            this.json = response.data
        },
        downloadXLSX() {
            var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            /* Export to file (start a download) */
            XLSX.writeFile(wb, "SheetJSTable.xlsx");
        },
        loaToNubmer(value) {
            if (value) {
                switch (value) {
                    case 'Very Low':
                        return 0.1
                    case 'Low':
                        return 0.3
                    case 'Medium':
                        return 0.5
                    case 'High':
                        return 0.7
                    case 'Very High':
                        return 0.9
                    default:
                        return
                }
            } else {
                return 0.1
            }

        },
        attackVectorToNubmer(value) {
            switch (value) {
                case 'NETWORK':
                    return 0.9
                case 'ADJACENT_NETWORK':
                    return 0.7
                case 'LOCAL':
                    return 0.5
                case 'PHYSICAL':
                    return 0.3
                default:
                    return
            }
        },
        attackComplexityToNubmer(value) {
            switch (value) {
                case 'LOW':
                    return 0.8
                case 'HIGH':
                    return 0.3
                default:
                    return
            }
        },
        privilegesRequiredToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0.8
                case 'LOW':
                    return 0.55
                case 'HIGH':
                    return 0.3
                default:
                    return
            }
        },
        userInteractionToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0.8
                case 'REQUIRED':
                    return 0.3
                default:
                    return
            }
        },
        confidentialityImpactToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'LOW':
                    return 0.5
                case 'HIGH':
                    return 1
                default:
                    return
            }
        },
        integrityImpactToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'LOW':
                    return 0.5
                case 'HIGH':
                    return 1
                default:
                    return
            }
        },
        availabilityImpactToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'LOW':
                    return 0.5
                case 'HIGH':
                    return 1
                default:
                    return
            }
        },
        //V2

        confidentialityImpactV2ToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'PARTIAL':
                    return 0.5
                case 'COMPLETE':
                    return 1
                default:
                    return
            }
        },
        integrityImpactV2ToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'PARTIAL':
                    return 0.5
                case 'COMPLETE':
                    return 1
                default:
                    return
            }
        },
        availabilityImpactV2ToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0
                case 'PARTIAL':
                    return 0.5
                case 'COMPLETE':
                    return 1
                default:
                    return
            }
        },
        accessVectorToNubmer(value) {
            switch (value) {
                case 'NETWORK':
                    return 0.9
                case 'ADJACENT_NETWORK':
                    return 0.7
                case 'LOCAL':
                    return 0.5
                default:
                    return
            }
        },
        accessComplexityToNubmer(value) {
            switch (value) {
                case 'LOW':
                    return 0.9
                case 'MEDIUM':
                    return 0.7
                case 'HIGH':
                    return 0.5
                default:
                    return
            }
        },
        authenticationToNubmer(value) {
            switch (value) {
                case 'NONE':
                    return 0.9
                case 'SINGLE':
                    return 0.7
                case 'MULTIPLE':
                    return 0.5
                default:
                    return
            }
        },
        risk(metrics, loa) {
            if (metrics?.cvssMetricV31) {
                let aV = this.attackVectorToNubmer(metrics?.cvssMetricV31[0].cvssData.attackVector)
                let aC = this.attackComplexityToNubmer(metrics?.cvssMetricV31[0].cvssData.attackComplexity)
                let pR = this.privilegesRequiredToNubmer(metrics?.cvssMetricV31[0].cvssData.privilegesRequired)
                let uI = this.userInteractionToNubmer(metrics?.cvssMetricV31[0].cvssData.userInteraction)
                // impact
                let cI = this.confidentialityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.confidentialityImpact)
                let iI = this.integrityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.integrityImpact)
                let aI = this.availabilityImpactToNubmer(metrics?.cvssMetricV31[0].cvssData.availabilityImpact)
                let p_j = this.loaToNubmer(loa)
                let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
                let Risk = aV / 0.9 * aC / 0.8 * pR / 0.8 * uI / 0.8 * impact * p_j / 0.9
                return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
                // return [aV, aC, pR, uI, cI, iI, aI]
            }
            else if (metrics?.cvssMetricV30) {
                let aV = this.attackVectorToNubmer(metrics?.cvssMetricV30[0].cvssData.attackVector)
                let aC = this.attackComplexityToNubmer(metrics?.cvssMetricV30[0].cvssData.attackComplexity)
                let pR = this.privilegesRequiredToNubmer(metrics?.cvssMetricV30[0].cvssData.privilegesRequired)
                let uI = this.userInteractionToNubmer(metrics?.cvssMetricV30[0].cvssData.userInteraction)
                // impact
                let cI = this.confidentialityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.confidentialityImpact)
                let iI = this.integrityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.integrityImpact)
                let aI = this.availabilityImpactToNubmer(metrics?.cvssMetricV30[0].cvssData.availabilityImpact)
                let p_j = this.loaToNubmer(loa)
                let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
                let Risk = aV / 0.9 * aC / 0.8 * pR / 0.8 * uI / 0.8 * impact * p_j / 0.9
                return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
                // return [aV, aC, pR, uI, cI, iI, aI]
            } else if (metrics?.cvssMetricV2) {
                let aV = this.accessVectorToNubmer(metrics?.cvssMetricV2[0].cvssData.accessVector)
                let aC = this.accessComplexityToNubmer(metrics?.cvssMetricV2[0].cvssData.accessComplexity)
                let aU = this.authenticationToNubmer(metrics?.cvssMetricV2[0].cvssData.authentication)
                // impact
                let cI = this.confidentialityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.confidentialityImpact)
                let iI = this.integrityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.integrityImpact)
                let aI = this.availabilityImpactV2ToNubmer(metrics?.cvssMetricV2[0].cvssData.availabilityImpact)
                let p_j = this.loaToNubmer(loa)
                let impact = (1 - (1 - cI) * (1 - iI) * (1 - aI))
                let Risk = aV / 0.9 * aC / 0.8 * aU / 0.8 * impact * p_j / 0.9
                return (Math.ceil(Risk * 1000) / 1000).toFixed(4)
                // return [aV, aC, aU, cI, iI, aI]

            }
            // return metrics
        }
    },
    beforeMount() {
        this.fetchProducts()
    }
})

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