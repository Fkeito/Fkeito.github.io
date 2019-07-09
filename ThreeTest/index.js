window.addEventListener('DOMContentLoaded', init);
class Scene{
    constructor(camera){
        this.scene = new THREE.Scene();

        this.mainCamera = camera;
    }
}
function init(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const cam = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    cam.position.set(0, 0, 10);

    mainScene = new Scene(cam);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.intensity = 2;
    dirLight.position.set(1, 1, 1);
    mainScene.scene.add(dirLight);

    renderer.render(mainScene.scene, mainScene.mainCamera);

    renderer.domElement.onwheel = onMouseWheel;

    requestAnimationFrame(awake);
}

let renderer;
let mainScene;

let box;

let wheelDelta = 0;

function awake(){
    box = Box(1,1,1);
    mainScene.scene.add(box);

    requestAnimationFrame(start);
}
function start(){

    update();
}
function update(){
    requestAnimationFrame(update);

    mainScene.mainCamera.position.z = Math.min(20, Math.max(5, mainScene.mainCamera.position.z + wheelDelta * 0.05));
    wheelDelta = 0;

    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    renderer.render(mainScene.scene, mainScene.mainCamera);
}

function Box(x,y,z){
    const geometory = new THREE.BoxGeometry(x, y, z);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });
    const box = new THREE.Mesh(geometory, material);
    return box;
}

function onMouseWheel(e){
    wheelDelta = e.deltaY;
}

