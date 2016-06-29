import THREE from 'three';

const NEAR = 1;
const FAR = 10000;

function SmileySlider(container) {

  let scene;
  let camera;
  let renderer;
  let geometry;
  let material;
  let mesh;
  let width = window.innerWidth;
  let height = window.innerHeight;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, width / height, NEAR, FAR );
    camera.position.z = 500;

    geometry = new THREE.CylinderGeometry( 200, 200, 20, 50 );
    material = new THREE.MeshBasicMaterial({color: 0xff0000});

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( width, height );

    container.appendChild( renderer.domElement );

  }

  function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;

    renderer.render( scene, camera );

  }

}

export default SmileySlider;
