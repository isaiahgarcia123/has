import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/PointerLockControls.js';

let scene, camera, renderer, controls;
let ghost;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
const velocity = new THREE.Vector3();
const speed = 5;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 10, 50);

  camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 1000);
  camera.position.y = 2;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(1920, 1080);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.PointLight(0xffffff, 1, 50);
  light.position.set(0, 10, 0);
  scene.add(light);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Ghost
  const ghostGeometry = new THREE.SphereGeometry(1, 32, 32);
  const ghostMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7
  });
  ghost = new THREE.Mesh(ghostGeometry, ghostMaterial);
  ghost.position.set(10, 2, 0);
  scene.add(ghost);

  // Controls
  controls = new PointerLockControls(camera, document.body);
  document.body.addEventListener('click', () => controls.lock());
  scene.add(controls.getObject());

  document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') moveForward = true;
    if (e.code === 'KeyS') moveBackward = true;
    if (e.code === 'KeyA') moveLeft = true;
    if (e.code === 'KeyD') moveRight = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') moveForward = false;
    if (e.code === 'KeyS') moveBackward = false;
    if (e.code === 'KeyA') moveLeft = false;
    if (e.code === 'KeyD') moveRight = false;
  });
}

function animate() {
  requestAnimationFrame(animate);

  velocity.x = 0;
  velocity.z = 0;

  if (moveForward) velocity.z -= speed * 0.1;
  if (moveBackward) velocity.z += speed * 0.1;
  if (moveLeft) velocity.x -= speed * 0.1;
  if (moveRight) velocity.x += speed * 0.1;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  // 👻 Ghost AI (Hunt Player)
  const playerPos = controls.getObject().position;
  const direction = new THREE.Vector3().subVectors(playerPos, ghost.position);
  direction.y = 0;
  direction.normalize();
  ghost.position.add(direction.multiplyScalar(0.02));

  // 📟 EMF Detection
  const distance = ghost.position.distanceTo(playerPos);
  const emfLevel = Math.max(0, 5 - Math.floor(distance));
  document.getElementById("emf").innerText = "EMF: " + emfLevel;

  renderer.render(scene, camera);
}
