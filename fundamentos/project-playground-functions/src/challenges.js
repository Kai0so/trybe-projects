// Desafio 1
function compareTrue(value1, value2) {
    if (value1 && value2 === true) {
        return true;
    } else {
        return false;
    }
}

// Desafio 2
function calcArea(base, height) {
    let area = (base * height) / 2;
    return area;
}

// Desafio 3
function splitSentence(string) {
    let separatedWords = string.split(" ")
    return separatedWords;
}

// Desafio 4
function concatName(name) {
    let firstName = name[0];
    let lastName = name[name.length - 1];
    let concatenatedNames = lastName + ', ' + firstName;
    return concatenatedNames;
}

// Desafio 5
function footballPoints(wins, ties) {
    let winPoints = wins * 3;
    let tiePoints = ties * 1;
    let totalPoints = winPoints + tiePoints;
    return totalPoints;
}

// Desafio 6
function highestCount(numberList) {
    let highNumber = numberList[0];
    let repeat = 0;
    for (let i = 0; i < numberList.length; i += 1) {
        if (highNumber < numberList[i]) {
            highNumber = numberList[i];
        }
    }
    for (let i2 = 0; i2 < numberList.length; i2 += 1) {
        if (highNumber === numberList[i2]) {
            repeat += 1;
        }
    }
    return repeat;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
    let distanceCat1 = cat1 - mouse;
    let distanceCat2 = cat2 - mouse;
    if (Math.abs(distanceCat1) < Math.abs(distanceCat2)) {
        return "cat1";
    } else if (Math.abs(distanceCat1) > Math.abs(distanceCat2)) {
        return "cat2";
    } else if (Math.abs(distanceCat1) === Math.abs(distanceCat2)) {
        return "os gatos trombam e o rato foge";
    }
}

// Desafio 8
function fizzBuzz(numberArray) {
    let stringList = []
    for (let i = 0; i < numberArray.length; i += 1) {
        if (numberArray[i] % 3 === 0 && numberArray[i] % 5 !== 0) {
            stringList.push("fizz");
        } else if (numberArray[i] % 5 === 0 && numberArray[i] % 3 !== 0) {
            stringList.push("buzz");
        } else if (numberArray[i] % 3 === 0 && numberArray[i] % 5 === 0) {
            stringList.push("fizzBuzz")
        } else if (numberArray[i] % 3 !== 0 && numberArray[i] % 5 !== 0) {
            stringList.push("bug!");
        }
    }
    return stringList;
}


// Desafio 9
function encode() {
    // seu código aqui
}

function decode() {
    // seu código aqui
}

module.exports = {
    calcArea,
    catAndMouse,
    compareTrue,
    concatName,
    decode,
    encode,
    fizzBuzz,
    footballPoints,
    highestCount,
    splitSentence,
};