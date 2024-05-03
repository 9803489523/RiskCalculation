<script setup lang="ts">
const props = defineProps({
    cve: Object,
    capec_list: Array
})

</script>

<template>
    <div class="div">

        <TresCanvas shadows alpha clear-color="#82DBC5" class="landshaft">
            <TresPerspectiveCamera :position="[5, 3, 10]" :look-at="[0, 0, 0]" />
            <!-- <TresAxis/> -->
            <OrbitControls />
            <!-- <TresOrbitControls /> -->
            <TresMesh>
                <TresBoxGeometry :args="[1, 1, 1]" :position="[0, 0, 0]" />
                <TresMeshBasicMaterial color="black" />
            </TresMesh>
            <!-- <TresMesh>
            <TresBoxGeometry :args="[1, 1, 2]" :position="[0, 0, 0]" />
            <TresMeshBasicMaterial color="black" />
        </TresMesh>
        <TresMesh>
            <TresBoxGeometry :args="[1, 1, 3]" :position="[0, 0, 0]" />
            <TresMeshBasicMaterial color="black" />
        </TresMesh> -->
            <TresAmbientLight :intensity="1" />
        </TresCanvas>
        {{ props.capec_list }}
    </div>
</template>

<style>
.landshaft {
    width: 100%;
    height: 600px;
    box-sizing: border-box;
}
</style>
  
