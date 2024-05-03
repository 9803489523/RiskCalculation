<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useWindowSize } from '@vueuse/core'

let renderer
let controls

const experience = ref(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(125, 1.77, 0.1, 1000)
camera.position.set(2, 5, 10)

for (let index = 0; index < 10; index++) {
    createCube(index)

}
function createCube(index) {
    const geometry = new THREE.BoxGeometry(index, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(index / 2, 0/2, 1 / 2)
    scene.add(cube)
}


// Добавляем AxesHelper
const axesHelper = new THREE.AxesHelper(15)
scene.add(axesHelper)

function updateCamera() {
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
}

function updateRenderer() {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

function setRenderer() {
    if (experience.value) {
        renderer = new THREE.WebGLRenderer({ canvas: experience.value, antialias: true })
        updateRenderer()
    }
}

function setControls() {
    controls = new OrbitControls(camera, renderer.domElement);
}

watch(aspectRatio, () => {
    updateCamera()
    updateRenderer()
    setControls()
})

onMounted(() => {
    setRenderer()
    setControls();
})

</script>
<template>
    <div>
        <canvas class="landshaft" ref="experience" />
    </div>
</template>

<style>
.landshaft {
    width: 100% !important;
    height: 600px !important;
    box-sizing: border-box;

}
</style>