let mousePos = { x: 0.5, y: 0.5 };
// document.addEventListener("mousemove", function (event) {
//   // mousePos = {
//   //   x: event.clientX / window.innerWidth,
//   //   y: event.clientY / window.innerHeight,
//   // };
// });
let phase = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 25;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let boxSize = 0.2;
let geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
let materialGreen = new THREE.MeshBasicMaterial({
  transparent: true,
  color: 0xff2a6d,
  opacity: 0.35,
  side: THREE.DoubleSide,
});

let pitchSegments = 60;
let elevationSegments = pitchSegments / 2;
let particles = pitchSegments * elevationSegments;
let side = Math.pow(particles, 1 / 3);

let radius = 18;

let parentContainer = new THREE.Object3D();
scene.add(parentContainer);

function posInBox(place) {
  return (place / side - 0.5) * radius * 1.2;
}

//Plant the seeds, grow some trees in a grid!
for (let p = 0; p < pitchSegments; p++) {
  let pitch = (Math.PI * 2 * p) / pitchSegments;
  for (let e = 0; e < elevationSegments; e++) {
    let elevation = Math.PI * (e / elevationSegments - 0.5);
    let particle = new THREE.Mesh(geometry, materialGreen);

    parentContainer.add(particle);

    let dest = new THREE.Vector3();
    dest.z = Math.sin(pitch) * Math.cos(elevation) * radius; //z pos in sphere
    dest.x = Math.cos(pitch) * Math.cos(elevation) * radius; //x pos in sphere
    dest.y = Math.sin(elevation) * radius; //y pos in sphere

    particle.position.x = posInBox(parentContainer.children.length % side);
    particle.position.y = posInBox(
      Math.floor(parentContainer.children.length / side) % side
    );
    particle.position.z = posInBox(
      Math.floor(parentContainer.children.length / Math.pow(side, 2)) % side
    );
    particle.userData = {
      dests: [dest, particle.position.clone()],
      speed: new THREE.Vector3(),
    };
  }
}

function render() {
  phase += 0.0001;
  for (let i = 0, l = parentContainer.children.length; i < l; i++) {
    let particle = parentContainer.children[i];
    let dest =
      particle.userData.dests[
        Math.floor(phase) % particle.userData.dests.length
      ].clone();
    let diff = dest.sub(particle.position);
    particle.userData.speed.divideScalar(1.025); // Some drag on the speed
    particle.userData.speed.add(diff.divideScalar(1300)); // Modify speed by a fraction of the distance to the dest
    particle.position.add(particle.userData.speed);
    particle.lookAt(dest);
  }

  parentContainer.rotation.y = phase * 3;
  parentContainer.rotation.x = (mousePos.y - 0.5) * Math.PI;
  parentContainer.rotation.z = (mousePos.x - 0.5) * Math.PI;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
