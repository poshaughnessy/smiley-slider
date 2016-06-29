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

    geometry = new THREE.CylinderGeometry( 200, 200, 20, 40 );
    material = new THREE.MeshLambertMaterial({color: 0xf5e92e});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let ambientLight = new THREE.AmbientLight( 0xAAAAAA );
    scene.add( ambientLight );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize( width, height );

    container.appendChild( renderer.domElement );

  }

  function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;

    renderer.render( scene, camera );

  }

}

export default SmileySlider;
