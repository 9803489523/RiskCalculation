




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

import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()

const pairs = ref({})

const capec_list = ref([])
const cve_list = ref([])

const meshes = ref([]);

async function fetchProducts() {
    await $axios().post('/capec/getPair', {

        pairList: pairsStore.pairs,
        headers: {
            "ngrok-skip-browser-warning": "69420",
        },
    }).then(res => pairs.value = res.data)
}

onMounted(async () => {
    await nextTick()
    const storedPairs = localStorage.getItem('pairs');
    pairs.value = JSON.parse(storedPairs);
    await fetchProducts()

    // pairs.value.pairs.forEach((p, i) => {
    //     const pair = {
    //         cve: p.cve,
    //         capec: p.capec,
    //         color: getRandomColor(i),
    //         riskC: Number(riskConf(parse(p.cve?.metrics), p.capec?.likelihoodOfAttack)),
    //         riskI: Number(riskInt(parse(p.cve?.metrics), p.capec?.likelihoodOfAttack)),
    //         riskA: Number(riskAvail(parse(p.cve?.metrics), p.capec?.likelihoodOfAttack))
    //     }
    //     if (capec_list.value.indexOf(p.capec.capecId) === -1) {
    //         capec_list.value.push(p.capec.capecId)
    //     }
    //     if (cve_list.value.indexOf(p.cve.cveId) === -1) {
    //         cve_list.value.push(p.cve.cveId)
    //     }
    //     meshes.value.push(pair)
    // });

    console.log(capec_list, cve_list);

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getRandomColor(i) {
        var letters = '0123456789ABCDEF';
        let r = 0
        let g = 122
        let b = 255

        g -= i * randomIntFromInterval(5, 9)
        b -= i * randomIntFromInterval(5, 9)

        let color = `rgb(${r}, ${g}, ${b})`;
        return color;
    }

    function parse(data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return 'null';
        }
    }
    function onMeshClick(data) {
    }
});
let meshes_length = computed(() => {
    return meshes.value.length + 2
})
</script>

<template>
    <div class="list row">
        <div class="grid">
            <!-- <TresCanvas shadows alpha clear-color="#82DBC5" class="landshaft">
                <TresPerspectiveCamera :position="[-5, 4, 10]" :look-at="[5, 2, 5]" :args="[75, 1, 0.1, 1000]" />
                <OrbitControls :target="[5, 0, 5]" />
                <AxesHelper :linewidth="[5]" :position="[-0.5, 0, -0.5]" :args="[100]" />
                <GridHelper :args="[100, 100]" :position="[50 - 0.5, 0, 50 - 0.5]" />
                <TresMesh @click="() => onMeshClick(mesh)" v-for="(mesh, i) in meshes"
                    :position="[capec_list.indexOf(mesh.capec.capecId), mesh.riskC / 2, cve_list.indexOf(mesh.cve.cveId)]">
                    <TresBoxGeometry :args="[1, mesh.riskC, 1,]" />
                    <TresMeshStandardMaterial :color="mesh.color" />
                </TresMesh>
                <Text3D text="my 3d text" center :size="0.8" />
                <TresAmbientLight :intensity=".7" />
            </TresCanvas> -->
            <!-- <div id="myDiv" class="landshaft">
            </div> -->
            <div class="calc">
                <h2>Калькулятор</h2>
                <p> Удельная ценность информации 0-1 к.ц.д х3<br>
                    Через значения простоя х3<br></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped> .row {

     // Добавьте этот CSS класс в ваш стилевой файл для подсветки
     width: 100%;

     .grid {
         display: grid;
         grid-template-columns: 3fr 1fr;
         gap: 8px;
     }

     .landshaft {
         width: 100%;
         height: 600px;
         box-sizing: border-box;

     }

     .calc {
         background-color: #39394B;

         box-sizing: border-box;
         padding: 30px;
         height: 600px;
         border-radius: 10px;

        //   //  border: 1px solid rgb(206, 206, 206);
     }
 }
</style>