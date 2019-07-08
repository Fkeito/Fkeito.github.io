function translateBox(b){
    b.classList.toggle('active');
}
function moveBox(b){
    b.classList.add('move');
    //b.onanimationend=function(){b.classList.remove('move')};
    b.addEventListener('animationend',()=>{
        b.classList.remove('move')
    })
}
function rotateBox(b){
    b.classList.add('rotate');
    //b.onanimationend=function(){b.classList.remove('rotate')};
    b.addEventListener('animationend',()=>{
        b.classList.remove('rotate')
    })
}
