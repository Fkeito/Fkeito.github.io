window.addEventListener('DOMContentLoaded', init);
function init(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    mainCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    mainCamera.position.set(0, 0, 10);

    scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.intensity = 2;
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    renderer.render(scene, mainCamera);

    requestAnimationFrame(awake);
}

let renderer;
let scene;
let mainCamera;

let box;

let wheelDelta = 0;
let mouseDragXDelta = 0;
let distance = 10;
let deg = 0;

function awake(){
    box = Box(1,1,1);
    scene.add(box);

    renderer.domElement.onwheel = onMouseWheel;
    renderer.domElement.onmouseup = onMouseClickUp;
    renderer.domElement.onmousedown = onMouseClickDown;
    renderer.domElement.onmousemove = onMouseMove;

    requestAnimationFrame(start);
}
function start(){

    update();
}
function update(){
    requestAnimationFrame(update);

    //camera
    distance = Math.min(20, Math.max(5, distance + wheelDelta * 0.05));
    wheelDelta = 0;
    deg += mouseDragXDelta;
    mainCamera.position.x = distance * Math.sin(deg * 0.01);
    mainCamera.position.z = distance * Math.cos(deg * 0.01);

    mainCamera.lookAt(new THREE.Vector3(0, 0, 0));

    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    renderer.render(scene, mainCamera);
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
let isDrag = false;
let preMousePos;
function onMouseClickDown(e){
    isDrag = true;
    preMousePos = e.clientX;
}
function onMouseClickUp(e){
    isDrag = false;
    mouseDragXDelta = 0;
}
function onMouseMove(e){
    if(isDrag){
        mouseDragXDelta = preMousePos - e.clientX;
        preMousePos = e.clientX;
    }
}

