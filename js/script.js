let tbody = document.getElementById('tbody');
let addVehicleBtn = document.getElementById('addVehicleBtn');
let overlay = document.getElementById('overlay');
let acknowledgement = document.getElementById('acknowledgement');
let main = document.getElementById('main');
let containerAcw = document.getElementById('containerAcw');
let time;
let flag1 = true;
let car = 50;
let bike = 25;
let scooty = 20;
let auto = 40;
let truck = 70;

function addVehicle() {
    let vehicleType = document.getElementById('vehicleType');
    let vehicleNo = document.getElementById('vehicleNo');
    let vehicleOwner = document.getElementById('vehicleOwner');
    let newTime = new Date();
    let currentDate = newTime.getDate();
    let month = newTime.getMonth()+1;
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    tbody.innerHTML += `
        <tr>
            <td>${currentDate} - ${month}</td>
            <td>${vehicleNo.value}</td>
            <td>${vehicleOwner.value}</td>
            <td>${vehicleType.value}</td>
            <td>${hours}:${minutes}</td>
            <td>--</td>
            <td>
                <button type="button" onclick="departVehicle(this)">Depart</button>
            </td>
            <td><button type="button" disabled onclick="printAcknowledgement(this.parentNode.parentNode)">Print</button></td>
        </tr>
        `;
    vehicleNo.value = "";
    vehicleNo.innerHTML = "";
    vehicleOwner.value = "";
    vehicleOwner.innerHTML = "";
    vehicleType.value = "Select";
}

function departVehicle(element) {
    let newTime = new Date();
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    element.parentNode.parentNode.children[5].innerText = `${hours}:${minutes}`;
    element.disabled = true;
    element.parentNode.parentNode.children[7].children[0].disabled = false;
}
function disableBtn() {
    let vehicleType = document.getElementById('vehicleType').value;
    let vehicleNo = document.getElementById('vehicleNo');
    let vehicleOwner = document.getElementById('vehicleOwner');
    vehicleNo.value = vehicleNo.value.trim();
    if (vehicleNo.value.length == 0 || vehicleOwner.value.length == 0 || vehicleType == "Select" || vehicleNo.value.length != 8) {
        addVehicleBtn.disabled = true;
    }
    else {
        addVehicleBtn.disabled = false;
    }
}
function toggleModal(){
    if (!flag1) {
        overlay.style.display = "none";
        acknowledgement.style.display = "none";
        main.style.display = "block";
        flag1 = true;
    } else {
        overlay.style.display = "block";
        acknowledgement.style.display = "flex";
        main.style.display = "none";
        flag1 = false;
    }
}
function printAcknowledgement(elem){
    toggleModal();
    let totalTimeVar = totalTime(stringSeperator(elem.children[4].innerHTML), stringSeperator(elem.children[5].innerHTML));
    containerAcw.innerHTML = `
    <div class="name acknowledgement-value">
                <strong>Name : </strong>
                <div>${elem.children[0].innerHTML}</div>
            </div>
    <div class="name acknowledgement-value">
                <strong>Vehicle Number : </strong>
                <div>${elem.children[1].innerHTML}</div>
            </div>
            <div class="vehicleNo acknowledgement-value">
                <strong>Vehicle Owner : </strong>
                <div>${elem.children[2].innerHTML}</div>
            </div>
            <div class="vehicleType acknowledgement-value">
                <strong>Vehicle Type : </strong>
                <div>${elem.children[3].innerHTML} </div>
            </div>
            <div class="entryTime acknowledgement-value">
                <strong>Entry Time : </strong>
                <div>${elem.children[4].innerHTML}</div>
            </div>
            <div class="exitTime acknowledgement-value">
                <strong>Exit Time : </strong>
                <div>${elem.children[5].innerHTML}</div>
            </div>
            <div class="totalTime acknowledgement-value">
                <strong>Total Time : </strong>
                <div>${totalTimeVar}hr</div>
            </div>
            <div class="amount acknowledgement-value">
                <strong>Amount : </strong>
                <div>${totalTimeVar >= 0 ? getMoney(elem.children[3].innerHTML) : getAmount(elem.children[3].innerHTML)}Rs</div>
            </div>
    `
}

function stringSeperator(string){
    let newString = string.slice(0, 2)
    return Number(newString);
}
function totalTime(entry, exit){
    if (exit - entry > 0) {
        time = exit - entry;
    } else {
        time = -(exit - entry);
    }
    return time;
}
function getAmount(type){
    let money;
    if (type == "Bike") {
        money = time*bike;
    }else if(type == "Scooty"){
        money = time*scooty;
    } else if(type == "Car") {
        money = time*car;
    }
    else if(type == "Auto"){
        money = time*auto;
    }
    else if(type == "Truck"){
        money = time*truck;
    }
    return money;
}

function getMoney(type){
    let money;
    if (type == "Bike") {
        money = bike;
    }else if(type == "Scooty"){
        money = scooty;
    } else if(type == "Car") {
        money = car;
    }
    else if(type == "Auto"){
        money = auto;
    }
    else if(type == "Truck"){
        money = truck;
    }
    return money;
}
