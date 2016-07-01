import THREE from 'three';

const NEAR = 1;
const FAR = 10000;

function SmileySlider(container) {

  let scene;
  let camera;
  let renderer;
  let faceMesh;
  let eye1Mesh;
  let eye2Mesh;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let smileCurve;
  let smileLine;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, width / height, NEAR, FAR );
    camera.position.z = 500;

    let faceGeo = new THREE.CylinderGeometry( 200, 200, 20, 40 );
    let faceMat = new THREE.MeshLambertMaterial({color: 0xf5e92e});
    faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.rotation.x = Math.PI / 2;
    scene.add(faceMesh);

    let eye1Geo = new THREE.CircleGeometry( 10, 10 );
    let eye1Mat = new THREE.MeshBasicMaterial({color: 0x000000});
    eye1Mesh = new THREE.Mesh(eye1Geo, eye1Mat);
    eye1Mesh.position.set(-50, 50, 10);
    scene.add(eye1Mesh);

    let eye2Geo = new THREE.CircleGeometry( 10, 10 );
    let eye2Mat = new THREE.MeshBasicMaterial({color: 0x000000});
    eye2Mesh = new THREE.Mesh(eye2Geo, eye2Mat);
    eye2Mesh.position.set(50, 50, 10);
    scene.add(eye2Mesh);

    initSmile();

    let ambientLight = new THREE.AmbientLight( 0xCCCCCC );
    scene.add( ambientLight );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize( width, height );

    container.appendChild( renderer.domElement );

  }

  function initSmile() {

    let smileGeo = new THREE.Geometry();
    smileCurve = new THREE.QuadraticBezierCurve3();
    smileCurve.v0 = new THREE.Vector3(-100, -50, 10);
    smileCurve.v1 = new THREE.Vector3(0, -150, 10);
    smileCurve.v2 = new THREE.Vector3(100, -50, 10);
    for (let j = 0; j < 20; j++) {
      smileGeo.vertices.push( smileCurve.getPoint(j / 20) )
    }

    let smileMat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
    smileLine = new THREE.Line(smileGeo, smileMat);
    scene.add(smileLine);

  }

  function animate() {

    requestAnimationFrame( animate );

    //mesh.rotation.x += 0.01;

    renderer.render( scene, camera );

  }

}

export default SmileySlider;
