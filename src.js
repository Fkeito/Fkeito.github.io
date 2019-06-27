console.log('Hello, World');

class FizzBuzz{
    constructor(divide, text){
        this._divide = divide;
        this._text = text;
        this._count = divide.length;
    }

    set(divide, text){
        this._divide = divide;
        this._text = text;
        this._count = divide.length;
    }

    check(value){
        let result = "";
        for(let i = 0;i < this._count;i++){
            if(value % this._divide[i] === 0) result += this._text[i];
        }
        if(result === "") return value;
        else return result;
    }
}

let fizzbuzz = new FizzBuzz([3,5],["fizz","buzz"]);

function changeRuleSize(value){
    const inputRules = document.getElementById('inputFizzBuzzRule');
    const inputRule = document.getElementsByClassName('fizzBuzzRule');

    const currentSize = inputRule.length;
    //console.log(currentSize);

    const countDiff = value - currentSize;
    if(countDiff > 0){
        for(let i = 0;i < countDiff;i++){
            let tr = document.createElement('tr');
            tr.className = 'fizzBuzzRule';

            let td1 = document.createElement('td');
            let input1 = document.createElement('input');
            input1.type = "number";
            input1.min = "1";
            input1.max = "99";
            input1.className = "divideNumber";
            td1.appendChild(input1);

            let td2 = document.createElement('td');
            let input2 = document.createElement('input');
            input2.type = "text";
            input2.className = "displayText";
            td2.appendChild(input2);

            tr.appendChild(td1);
            tr.appendChild(td2);

            inputRules.appendChild(tr);
        }
    }
    if(countDiff < 0){
        for(let i = currentSize - 1;i >= value;i--){
            inputRules.removeChild(inputRule[i]);
        }
    }
}

function checkFizzBuzz(value){
    const divideNumber = document.getElementsByClassName('divideNumber');
    const displayText = document.getElementsByClassName('displayText');

    const count = divideNumber.length;
    let num = new Array(count);
    let tex = new Array(count);
    for(let i = 0;i < count;i++){
        num[i] = divideNumber[i].value;
        tex[i] = displayText[i].value;
    }

    fizzbuzz.set(num, tex);

    const display = document.getElementById('displayFizzBuzz');
    display.innerText = fizzbuzz.check(value);
}

