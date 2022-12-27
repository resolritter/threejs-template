import * as THREE from "three"

let renderer
let mesh
let camera
let scene

window.addEventListener("resize", onWindowResize, false)

init()
animate()

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10,
  )
  camera.position.z = 1

  scene = new THREE.Scene()

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshPhongMaterial({
    emissive: 0x111111,
    envMap: camera.renderTarget,
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const dirLight = new THREE.DirectionalLight(0xff0000, 1)
  dirLight.target.position.set(0, 0, -1)
  dirLight.add(dirLight.target)
  dirLight.lookAt(-1, -1, 0)
  scene.add(dirLight)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
