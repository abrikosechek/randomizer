<template>
  <div class="page">
    <div ref="cardComponent" id="card" class="card">
      <canvas ref="canvasComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as THREE from "three"
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import * as CANNON from "cannon-es"
import Button from "@/components/ui/Button.vue"

const cardComponent = ref()
const canvasComponent = ref()

onMounted(() => {
  initScene()
  createGround()
  createCube()
  renderScene()
})

// scene/world variables
let scene, camera, renderer, world
// object variables
let ground0, groundBody0
let ground1, groundBody1
let ground2, groundBody2
let ground3, groundBody3
let cube, cubeBody

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const initScene = () => {
  const width = cardComponent.value.offsetWidth
  const height = cardComponent.value.offsetHeight

  // three.js
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasComponent.value
  })
  renderer.setSize(width, height)

  // cannon-es
  world = new CANNON.World({
    gravity: new CANNON.Vec3(0, - 0.91, 0)
  })
}

const createGround = () => {
  const color = 0x313131
  const wireframe = false

  // three object
  const groundGeometry0 = new THREE.PlaneGeometry(30, 30)
  const groundMaterial0 = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    wireframe
  })
  ground0 = new THREE.Mesh(groundGeometry0, groundMaterial0)
  scene.add(ground0)
  // cannon object
  groundBody0 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
    type: CANNON.Body.STATIC
  })
  // other
  groundBody0.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(groundBody0)

  // three object
  const groundGeometry1 = new THREE.PlaneGeometry(30, 20)
  const groundMaterial1 = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    wireframe
  })
  ground1 = new THREE.Mesh(groundGeometry1, groundMaterial1)
  scene.add(ground1)
  // cannon object
  groundBody1 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 10, 0.1)),
    type: CANNON.Body.STATIC,
    position: new CANNON.Vec3(0, 10, -15)
  })
  // other
  world.addBody(groundBody1)

  // three object
  const groundGeometry2 = new THREE.PlaneGeometry(30, 20)
  const groundMaterial2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  })
  ground2 = new THREE.Mesh(groundGeometry2, groundMaterial2)
  scene.add(ground2)
  // cannon object
  groundBody2 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 10, 0.1)),
    type: CANNON.Body.STATIC,
    position: new CANNON.Vec3(0, 10, 15)
  })
  // other
  world.addBody(groundBody2)

  // three object
  const groundGeometry3 = new THREE.PlaneGeometry(30, 20)
  const groundMaterial3 = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    wireframe
  })
  ground3 = new THREE.Mesh(groundGeometry3, groundMaterial3)
  scene.add(ground3)
  // cannon object
  groundBody3 = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(15, 10, 0.1)),
    type: CANNON.Body.STATIC,
    position: new CANNON.Vec3(-15, 10, 0)
  })
  // other
  groundBody3.quaternion.setFromEuler(0, -Math.PI / 2, 0)
  world.addBody(groundBody3)
}

const createCube = () => {
  const geometrySize = 4

  // three object
  let geometry = new RoundedBoxGeometry(geometrySize, geometrySize, geometrySize, 5, 1);
  console.log(geometry)
  const positionAttribute = geometry.attributes.position;

  console.log(positionAttribute)

  for (let i = 0; i < positionAttribute.count; i++) {

    let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);

    // modify position.x, position.y and position.z

    positionAttribute.setXYZ(i, position.x, position.y, position.z);
  }

  const material = new THREE.MeshBasicMaterial({ color: 0xc9c9c9, wireframe: false });

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // cannon object
  cubeBody = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(geometrySize / 2, geometrySize / 2, geometrySize / 2)),
    position: new CANNON.Vec3(20, 10, 0)
  })
  const moveImpulse = new CANNON.Vec3(-8, -4, 0)
  cubeBody.applyImpulse(moveImpulse)

  const angularVelocity = new CANNON.Vec3(getRandomNumber(-3, 2), Math.PI * getRandomNumber(-3, 3), getRandomNumber(-3, 2)); // Rotating around Y-axis
  cubeBody.angularVelocity.copy(angularVelocity);

  world.addBody(cubeBody)
}

const renderScene = () => {
  //   camera final
  camera.position.x = -5;
  camera.position.y = 17;
  camera.position.z = 12;
  camera.rotation.x = -1;
  //   camera far
  // camera.position.y = 40;
  // camera.position.z = 30;
  // camera.rotation.x = -1;
  //   camera aside
  // camera.position.z = 20;
  // camera.position.y = 0.2;
  // camera.rotation.x = -0.2;

  function animate() {
    world.step(1 / 60)

    // link objects
    cube.position.copy(cubeBody.position)
    cube.quaternion.copy(cubeBody.quaternion)
    //
    ground0.position.copy(groundBody0.position)
    ground0.quaternion.copy(groundBody0.quaternion)
    //
    ground1.position.copy(groundBody1.position)
    ground1.quaternion.copy(groundBody1.quaternion)
    //
    ground2.position.copy(groundBody2.position)
    ground2.quaternion.copy(groundBody2.quaternion)
    //
    ground3.position.copy(groundBody3.position)
    ground3.quaternion.copy(groundBody3.quaternion)

    renderer.render(scene, camera)
  }

  renderer.setAnimationLoop(animate)
}
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