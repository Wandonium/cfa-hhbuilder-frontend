
// get references to DOM elements
var addBtn = document.getElementsByClassName("add")[0];

var ageLbl = document.querySelector('[for="age"]');
var relLbl = document.querySelector('[for="rel"]');

var ageInput = document.getElementById('age');
var chbx = document.getElementById('smoker');
var select = document.getElementById('rel');

// assign event handlers to DOM elements
addBtn.onclick = handleAdd;
ageInput.onkeydown = handleKeyDown;
select.onchange = handleSelect;

// create error paragraphs to be added to DOM dynamically
var agePara = document.createElement('p');
agePara.id = "agePara";
agePara.style.color = 'red';

var relPara = document.createElement('p');
relPara.id = "relPara";
relPara.style.color = 'red';

// household list and initial empty person object
var household = [];
var person = {};

function handleKeyDown() {
    if(document.getElementById('agePara')) {
        ageLbl.removeChild(agePara);
    }
}

function handleSelect() {
    if(document.getElementById('relPara')) {
        relLbl.removeChild(relPara);
    }
}

function validateAge () {
    var age = ageInput.value;
    
    var errString = "Fatal Error!";
    var showError = true;

    if(age === '') {
        errString += ' Age cannot be empty!';
    } else {
        var validAge = parseInt(age);
        if(validAge === NaN || validAge <= 0) {
            errString += ' Please enter a valid number'
        } else {
            person.age = validAge;
            ageInput.value = validAge;
            showError = false;
        }
    }

    if(showError) {
        agePara.innerHTML = errString;
        ageLbl.appendChild(agePara);
    }
    return showError;
}

function validateRel () {
    var rel = select.value;
    
    var errString = "Fatal Error!";
    var showError = true;

    if(rel === '') {
        errString += ' Must select a relationship!';
    } else {
        person.relationship = rel;
        showError = false;
    }

    if(showError) {
        relPara.innerHTML = errString;
        relLbl.appendChild(relPara);
    }
    return showError;
}

function resetForm () {
    ageInput.value = '';
    select.value = '';
    chbx.checked = false;
    person = {age: '', relationship: ''};
}

function handleAdd() {
    if(!validateAge() && !validateRel()) {
        if(chbx.checked) {
            person.smoker = true;
        } else {
            person.smoker = false;
        }
        household.push(person);
        resetForm();
        console.log('household: ', household);
    }
    return false;
}
