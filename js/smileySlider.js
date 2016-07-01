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
  let smileCurveSad;
  let smileCurveHappy;
  let smileGeoSad;
  let smileGeoHappy;
  let smileLine;
  let touchStartY = null;

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
    eye1Mat.side = THREE.DoubleSide;
    eye1Mesh = new THREE.Mesh(eye1Geo, eye1Mat);
    eye1Mesh.position.set(-50, 30, -30);
    eye1Mesh.rotation.x += Math.PI / 2;
    faceMesh.add(eye1Mesh);

    let eye2Geo = new THREE.CircleGeometry( 10, 10 );
    let eye2Mat = new THREE.MeshBasicMaterial({color: 0x000000});
    eye2Mat.side = THREE.DoubleSide;
    eye2Mesh = new THREE.Mesh(eye2Geo, eye2Mat);
    eye2Mesh.position.set(50, 30, -30);
    eye2Mesh.rotation.x += Math.PI / 2;
    faceMesh.add(eye2Mesh);

    initSmile();

    let ambientLight = new THREE.AmbientLight( 0xCCCCCC );
    scene.add( ambientLight );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize( width, height );

    container.appendChild( renderer.domElement );

    initControls();

  }

  function initSmile() {

    smileGeoSad = new THREE.Geometry();
    smileGeoHappy = new THREE.Geometry();

    smileCurveSad = new THREE.QuadraticBezierCurve3();
    smileCurveSad.v0 = new THREE.Vector3(-100, 10, 150);
    smileCurveSad.v1 = new THREE.Vector3(0, 10, 50);
    smileCurveSad.v2 = new THREE.Vector3(100, 10, 150);

    smileCurveHappy = new THREE.QuadraticBezierCurve3();
    smileCurveHappy.v0 = new THREE.Vector3(-100, 10, 50);
    smileCurveHappy.v1 = new THREE.Vector3(0, 10, 150);
    smileCurveHappy.v2 = new THREE.Vector3(100, 10, 50);

    for (let j = 0; j < 20; j++) {
      smileGeoSad.vertices.push( smileCurveSad.getPoint(j / 20) );
    }

    for (let j = 0; j < 20; j++) {
      smileGeoHappy.vertices.push( smileCurveHappy.getPoint(j / 20) );
    }

    let smileMat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } );
    smileLine = new THREE.Line(smileGeoSad, smileMat);

    tweenBetweenGeometries(smileLine, smileGeoSad, smileGeoHappy, 0.5, false);

    faceMesh.add(smileLine);

  }

  function initControls() {

    container.addEventListener( 'touchstart', onTouchStart, false );
    container.addEventListener( 'touchmove', onTouchMove, false );
    container.addEventListener( 'touchend', onTouchEnd, false );

  }

  function onTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('start', event);
    touchStartY = event.touches[0].clientY;
  }

  function onTouchMove(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('move', event);

    // Rotate face
    let deltaY = (event.touches[0].clientY - touchStartY) / 500;
    let rotX = Math.min( deltaY, Math.PI / 6 );
    rotX = Math.max( rotX, -Math.PI / 6 );
    faceMesh.rotation.x = Math.PI / 2 + rotX;

    // Morph smile
    tweenBetweenGeometries(smileLine, smileGeoSad, smileGeoHappy, 0.5, false);
    //console.log(smileGeo.vertices[1]);
    //smileGeo.verticesNeedUpdate = true;

  }

  function onTouchEnd(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  /**
   * Thanks to: http://jsdo.it/zz85/rVta
   * amount is between 0 and 1
   */
  function tweenBetweenGeometries( mesh, from, to, amount ) {

    var tmp = new THREE.Vector3(),
      len = from.vertices.length,
      i;

    for( i = 0; i < len; i ++ ) {

      tmp.copy( to.vertices[i] )
        .sub( from.vertices[i] )
        .multiplyScalar( amount )
        .add( from.vertices[i] );

      mesh.geometry.vertices[i].copy(tmp);

    }

    mesh.geometry.verticesNeedUpdate = true;

  }

}

export default SmileySlider;
