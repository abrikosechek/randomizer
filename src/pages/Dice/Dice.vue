<template>
  <div class="page">
    <div ref="cardComponent" class="card">
      <!-- <canvas ref="canvasComponent" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as THREE from 'three';
import Button from "@/components/ui/Button.vue"

const cardComponent = ref()
const canvasComponent = ref();

let scene
let camera
let renderer
let cube

const initScene = () => {
  const width = cardComponent.value.offsetWidth
  const height = cardComponent.value.offsetHeight

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  cardComponent.value.appendChild(renderer.domElement)

  camera.position.z = 5
}

const renderScene = () => {
  function animate() {
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;

    renderer.render(scene, camera)
  }
  
  renderer.setAnimationLoop(animate)
}

const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

onMounted(() => {
  initScene()
  renderScene()
  createCube()
})
</script>

<style scoped lang='scss'>
.page {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.card {
  width: 100%;
  aspect-ratio: 1/1.2;
  background: var(--bg-light);
  border-radius: 4px;
  overflow: hidden;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 4px;
  gap: 4px;
}
</style>