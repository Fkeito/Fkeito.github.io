const field = document.getElementById('field');
const score = document.getElementById('score');
const cards = random();
deal(field, cards);

function random(){
    let cards = [];

    for(let i = 0;i < 8;i++){
        cards.push(i+1);
        cards.push(i+1);
    }

    let n = 16;
    while(n){
        i = Math.floor(Math.random() * n--);
        if(i === n) continue;
        cards[i] += cards[n];
        cards[n] = cards[i] - cards[n];
        cards[i] -= cards[n];
    }

    return cards;
}
function deal(field, cards){
    for(let i = 0;i < 4;i++){
        let row = document.createElement('tr');
        for(let j = 0;j < 4;j++){
            let card = document.createElement('td');
            card.name = cards[4 * i + j];
            card.className = 'card';
            card.onclick = click;
            card.innerText = '裏';

            row.appendChild(card);
        }
        field.appendChild(row);
    }
}

let open = 0;
let firstCard;
let turning = 0;
function click(e){
    card = e.target;

    if(!(card.innerText === '裏')) return;

    if(open === 0){
        turnFront(card);
        open++;

        firstCard = card;
    }
    else if(open === 1){
        turnFront(card);
        open++;
        countHand();

        if(firstCard.name === card.name){
            firstCard.className = 'pairedCard';
            card.className = 'pairedCard'
            setTimeout("makePair()",500);
        }
        else setTimeout("turnBack()",1000);
    }


}
function turnFront(card){
    if(card.innerText === '裏'){
        if(open > 1) return;
        card.innerText = card.name;
    }
}
function turnBack(){
    vaildCards = document.getElementsByClassName('card');
    for(let i = 0;i < vaildCards.length;i++){
        vaildCards[i].innerText = '裏';
    }
    open = 0;
}
let pairedCards = 0;
function makePair(){
    pairedCards++;
    if(pairedCards >= 8){
        score.innerText += 'でClear';
    }

    open = 0;
}
let hand = 0;
function countHand(){
    score.innerText = ++hand + '手 ';
}