
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

// create delete button element
var deleteBtn = document.createElement('button');
deleteBtn.id = 'deleteBtn';
deleteBtn.innerText = "Delete Last Entry";
deleteBtn.onclick = handleDelete;

var table = document.createElement('table');



// add delete button to form element
var form = document.getElementsByTagName('form')[0];
form.appendChild(deleteBtn);

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

var tableBorder = 'border: 2px solid #333;'

// create table to show household list
function createTable() {
    table.id = 'table';
    table.style.cssText = 'border-collapse: collapse; margin-top: 2em; margin-left: 2em;'
    var tr = document.createElement('tr');
    tr.id = 'tr-0';
    var th = document.createElement('th');
    th.innerText = 'ID';
    th.style.cssText = tableBorder;
    tr.appendChild(th);
    var keys = Object.keys(household[0]);
    var values = Object.values(household[0]);
    keys.forEach(key => {
        var thead = document.createElement('th');
        thead.innerText = key.toUpperCase();
        thead.style.cssText = tableBorder;
        tr.appendChild(thead);
    });
    var tr2 = document.createElement('tr');
    tr2.id = 'tr-1';
    var td = document.createElement('td');
    td.innerText = '1';
    td.style.cssText = tableBorder;
    tr2.appendChild(td);
    values.forEach(val => {
        var td = document.createElement('td');
        td.innerText = val;
        td.style.cssText = tableBorder;
        tr2.appendChild(td);
    })
    table.appendChild(tr);
    table.appendChild(tr2);
    document.body.appendChild(table);
}

function handleAdd() {
    if(!validateAge() && !validateRel()) {
        if(chbx.checked) {
            person.smoker = true;
        } else {
            person.smoker = false;
        }
        household.push(person);
        if(household.length == 1) createTable();
        else {
            var values = Object.values(person);
            var tr = document.createElement('tr');
            tr.id = 'tr-' + household.length;
            var td = document.createElement('td');
            td.innerText = household.length;
            td.style.cssText = tableBorder;
            tr.appendChild(td);
            values.forEach(val => {
                var td = document.createElement('td');
                td.innerText = val;
                td.style.cssText = tableBorder;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        }
        resetForm();
        console.log('household: ', household);
    }
    return false;
}

function handleDelete() {
    if(household.length === 1) {
        document.body.removeChild(table);
    } else {
        var tr = document.getElementById(`tr-${household.length}`);
        console.log('tr: ', tr);
        table.removeChild(tr);
    }
    household.pop();
    console.log('household after pop: ', household);
    return false;
}
