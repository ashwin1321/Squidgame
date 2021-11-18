const scene = new THREE.Scene();                // creating the new scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xb7c3f3, 1);       // 1st color code 2nd opacity

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);


// global variables

const start_position = 3;
const end_position = -start_position;

function createCube(size, positionX, rotY = 0, color = 0xfbc851) {
    // creating the virtual world
    const geometry = new THREE.BoxGeometry(size.w, size.h);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = positionX;
    cube.rotation.y = rotY;
    scene.add(cube);
    return cube;

}
camera.position.z = 5;

const loader = new THREE.GLTFLoader();



class Doll {
    constructor() {
        loader.load("../models/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        })
    }

    lookBackward() {
        // this.doll.rotation.y  =-3.1;
        gsap.to(this.doll.rotation, { y: -3.1, duration: .45 })
    }

    lookForward() {
        // this.doll.rotation.y = 0;  
        gsap.to(this.doll.rotation, { y: 0, duration: .45 })
    }
}



// Creating the track

function createTrack() {

    createCube({ w: .2, h: 1.5, d: 1 }, start_position, -.35);
    createCube({ w: .2, h: 1.5, d: 1 }, end_position, .35);
    createCube({ w: start_position * 2 + .2, h: 1.5, d: 1 }, 0, 0, 0xe5a716).position.z = -.8;



}
createTrack()

class Player {
    constructor() {
        const geometry = new THREE.SphereGeometry(.2, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    }
}

const player = new Player()

let doll = new Doll;
setTimeout(() => {
    doll.lookBackward()
}, 1000);


function animate() {                  // continuously run bhairakhxa so manually render garna code garnu parena 

    renderer.render(scene, camera);

    // cube.rotation.z += 0.0001;               // cube lai kun axis ma kati speed ma rotate garaune
    requestAnimationFrame(animate);
}
animate();


// make the doll responsive

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;             // aspect ratio milako
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}



