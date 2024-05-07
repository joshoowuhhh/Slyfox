import * as THREE from 'three';

import {OrbitControls} from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, cube, cylinder, ship;

function init () {
    scene = new THREE.Scene();
    const light = new THREE.DirectionalLight(0xffffff, 10);
    light.position.set(1,1,5);
    scene.add(light);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader();
    loader.load('assets/slyfox2601.gltf', function (gltf) {
        ship = gltf.scene;
        console.log(ship);
        scene.add(ship);

    const spaceTexture = new THREE.TextureLoader().load('space.jpg');
    scene.background = spaceTexture;

    })
    
    
    camera.position.z = 5;
}


function animate() {
	requestAnimationFrame( animate );

    ship.rotation.x += 0.03;
	//ship.rotation.y += 0.03;
    //ship.rotation.z += 0.07;
    

	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
