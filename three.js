const wallMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const wall1 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 1), wallMat);
wall1.position.set(0, 5, -25);
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 1), wallMat);
wall2.position.set(0, 5, 25);
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 50), wallMat);
wall3.position.set(-25, 5, 0);
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 50), wallMat);
wall4.position.set(25, 5, 0);
scene.add(wall4);
