<template>
    <button v-if="!isAdded" @click="button_click" class="button add">Добавить к сравнению</button>
    <button v-else @click="button_click" class="button remove">Убрать из сравнения</button>
</template>

<script setup>
import { usePairsStore } from '@/stores/pairs'
const pairsStore = usePairsStore()
const emit = defineEmits(['button_clicked'])
const toast = useToast()
function onCallback () {
  alert('Добавлено к сравнению')
}

const props = defineProps({
    pair: Object
})

const isAdded = computed(() => {
    return pairsStore.checkBoolean(props.pair)
})

function button_click() {
    pairsStore.togglePair(props.pair)
    toast.add({ title: 'Добавляется в базу', timeout: 1000, callback: onCallback })
}
</script>

<style lang="scss" scoped>
.button {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;

    width: 800px;
    height: 50px;
    border-radius: 0px;
}

.add {
    border: 1px solid #4A668E;
    background: #4A668E;
    color: white;
}

.remove {
    background: #222131;
    color: white;
    border: 1px solid white;
}
</style>