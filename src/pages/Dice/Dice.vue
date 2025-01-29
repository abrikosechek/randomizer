<template>
  <div class="page">
    <h1>
      Dice roller
    </h1>

    <div ref="cardComponent" id="card" class="card container-glass">
      <canvas ref="canvasComponent" />
    </div>

    <div class="page__buttons">
      <Button @click="resetScene">
        Reset
      </Button>
      <Button @click="createCube">
        Throw
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as THREE from "three"
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import * as CANNON from "cannon-es"
import Button from "@/components/ui/Button.vue"

const cardComponent = ref()
const canvasComponent = ref()

onMounted(() => {
  initScene()
  createGround()
  renderScene()
})

// scene/world variables
let scene, camera, renderer, world
let ambientLight, pointLight
// object variables
let ground0, groundBody0
let ground1, groundBody1
let ground2, groundBody2
let ground3, groundBody3
let cubes = []

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
}

const initScene = () => {
  const width = cardComponent.value.offsetWidth
  const height = cardComponent.value.offsetHeight

  // three.js
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)

  pointLight = new THREE.PointLight(0xffffff, 1000)
  pointLight.position.x = 0
  pointLight.position.z = 0
  pointLight.position.y = 30
  scene.add(pointLight)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasComponent.value,
    antialias: true
  })
  renderer.setSize(width, height)

  // cannon-es
  world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -2.91, 0)
  })
}

const createGround = () => {
  const color = 0x313131
  const wireframe = false

  // three object
  const groundGeometry0 = new THREE.PlaneGeometry(30, 30)
  const groundMaterial0 = new THREE.MeshStandardMaterial({
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
  const groundMaterial1 = new THREE.MeshStandardMaterial({
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
  const groundMaterial2 = new THREE.MeshStandardMaterial({
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
  const groundMaterial3 = new THREE.MeshStandardMaterial({
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
  const cubeObject = {
    mesh: null,
    body: null
  }
  const geometrySize = 4

  // three object
  let geometry = new RoundedBoxGeometry(geometrySize, geometrySize, geometrySize, 6, 0.4);

  const textureLoader = new THREE.TextureLoader()
  const materials = ['1', "2", "3", "4", "5", "6"]
    .map((item) =>
    (new THREE.MeshStandardMaterial({
      map: textureLoader.load(`dice/${item}.png`)
    }))
    )

  cubeObject.mesh = new THREE.Mesh(geometry, materials);
  scene.add(cubeObject.mesh);

  // cannon object
  cubeObject.body = new CANNON.Body({
    mass: 12,
    shape: new CANNON.Box(new CANNON.Vec3(geometrySize / 2, geometrySize / 2, geometrySize / 2)),
    position: new CANNON.Vec3(25, 12, 0)
  })
  const moveImpulse = new CANNON.Vec3(-120, -2, getRandomNumber(-3, 2))
  cubeObject.body.applyImpulse(moveImpulse)

  const angularVelocity = new CANNON.Vec3(getRandomNumber(-2, 1), Math.PI * getRandomNumber(-3, 2), getRandomNumber(-3, 2)); // Rotating around Y-axis
  cubeObject.body.angularVelocity.copy(angularVelocity);

  world.addBody(cubeObject.body)

  cubes.push(cubeObject)
}

const renderScene = () => {
  //   camera final
  camera.position.x = -5;
  camera.position.y = 21;
  camera.position.z = 6;
  camera.rotation.x = -1.3;
  //   camera far
  // camera.position.y = 40;
  // camera.position.z = 30;
  // camera.rotation.x = -1;
  //   camera aside
  // camera.position.z = 20;
  // camera.position.y = 0.2;
  // camera.rotation.x = -0.2;

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

  renderer.setAnimationLoop(animate)

  function animate() {
    world.step(1 / 60)

    // link objects
    cubes.forEach((cube) => {
      cube.mesh.position.copy(cube.body.position)
      cube.mesh.quaternion.copy(cube.body.quaternion)
    })

    renderer.render(scene, camera)
  }
}

const resetScene = () => {
  cubes.forEach((item) => {
    scene.remove(item.mesh)
    world.removeBody(item.body)
  })

  cubes = []
}
</script>

<style scoped lang='scss'>
.page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  &__buttons {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
  }
}

.card {
  width: 100%;
  padding: 0;
  aspect-ratio: 1/1;
  overflow: hidden;
}
</style>