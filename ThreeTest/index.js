window.addEventListener('DOMContentLoaded', init);
function init(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    mainCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    mainCamera.position.set(0, 0, 20);

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

let boxes;
let spheres = [];
const materials = [
    new THREE.MeshBasicMaterial({color: 0xff6699}),
    new THREE.MeshBasicMaterial({color: 0x99ff66}),
    new THREE.MeshBasicMaterial({color: 0x6699ff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0x000000}),
];

/*
let wheelDelta = 0;
let mouseDragXDelta = 0;
let distance = 10;
let deg = 0;
*/

function awake(){
    /*
    renderer.domElement.onwheel = onMouseWheel;
    renderer.domElement.onmouseup = onMouseClickUp;
    renderer.domElement.onmousedown = onMouseClickDown;
    renderer.domElement.onmousemove = onMouseMove;
    */
    renderer.domElement.onmousedown = function(){
        if(isChanging) return;
        isChanging = true;
        change = setInterval(changeColor, 1000);
    }

    requestAnimationFrame(start);
}
function start(){
    boxes = [
        Box(1, 1, 1, materials[3]),
        Box(0.6, 0.6, 0.6, materials[0]),
        Box(1, 1, 1, materials[3]),
        Box(0.6, 0.6, 0.6, materials[1]),
        Box(1, 1, 1, materials[3]),
        Box(0.6, 0.6, 0.6, materials[2])
    ];
    for(let i = 0;i < 6;i++){
        boxes[i].position.set((2 - 0.1 * (i % 2)) * (Math.floor(i / 2) - 1), 0, i % 2);
        scene.add(boxes[i]);
    }
    for(let i = -1;i <= 1;i += 2){
        for(let j = -1;j <= 1;j++){
            const sphere = Sphere(0.1, 4, 4, materials[3]);
            sphere.position.x = 0.75 * j + 5 * i;
            spheres.push(sphere);
            scene.add(sphere);
        }
    }

    update();
}
function update(){
    requestAnimationFrame(update);

    //camera
    /*
    distance = Math.min(20, Math.max(5, distance + wheelDelta * 0.05));
    wheelDelta = 0;
    deg = Math.min(4, Math.max(-4, deg + mouseDragXDelta * 0.05));
    mainCamera.position.x = distance * Math.sin(deg * 0.01);
    mainCamera.position.z = distance * Math.cos(deg * 0.01);
    */

    mainCamera.lookAt(new THREE.Vector3(0, 0, 0));

    for(let i = 0;i < 6;i++){
        boxes[i].rotation.x += 0.01;
        boxes[i].rotation.y += 0.01;
    }

    renderer.render(scene, mainCamera);
}

function Box(x,y,z,material){
    const geometory = new THREE.BoxGeometry(x, y, z);
    const box = new THREE.Mesh(geometory, material);
    return box;
}
function Sphere(r,w,h,material){
    const geometory = new THREE.SphereGeometry(r, w, h);
    const box = new THREE.Mesh(geometory, material);
    return box;
}

let change;
let isChanging = false;
let colorIndex = 0;
function changeColor(e){
    if(colorIndex > 2){
        for(let i = 0;i < 3;i++){
            boxes[i * 2 + 1].material = materials[i];
            spheres[i].material = materials[3];
            spheres[i + 3].material = materials[3];
        }

        isChanging = false;
        colorIndex = 0;
        clearInterval(change);
        return;
    }

    boxes[colorIndex * 2 + 1].material = materials[4];
    spheres[colorIndex].material = materials[colorIndex];
    spheres[colorIndex + 3].material = materials[colorIndex];

    colorIndex++;
}


/*
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
*/
