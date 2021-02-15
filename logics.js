// Get all data from the form
let email, fname, lname, phone, city, street, snum, fnum, apnum, id;
const inputs = document.querySelectorAll('input');
const mail = document.getElementById('email');


function Start() {
    email = document.getElementById('email').value;
    id = document.getElementById('id').value;
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    phone = document.getElementById('phone').value;
    city = document.getElementById('city').value;
    street = document.getElementById('street').value;
    snum = document.getElementById('snum').value;
    fnum = document.getElementById('fnum').value;
    apnum = document.getElementById('apnum').value;
}

function clearFields() {
    inputs.forEach(input => input.value = '');
}

function validateEmail(e) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(e.target.value);
    if (!isValid && e.target.value) {
        mail.classList.add('error')
    } else {
        mail.classList.remove('error')
    }
}

mail.addEventListener('input', validateEmail);


document.getElementById("submit").onclick = function () {
    Start();
    firebase.database().ref("Person/" + id).set({
        first_name: fname,
        last_name: lname,
        phone_number: phone,
        email_address: email,
        city_d: city,
        street_d: street,
        street_num: snum,
        floor_num: fnum,
        apartment_num: apnum,
        id_d: id
    });
    clearFields();
}

document.getElementById("search").onclick = function () {
    Start();
    firebase.database().ref("Person/" + id).on('value', function (snapshot) {
        document.getElementById('fname').value = snapshot.val().first_name;
        document.getElementById('lname').value = snapshot.val().last_name;
        document.getElementById('email').value = snapshot.val().email_address;
        document.getElementById('phone').value = snapshot.val().phone_number;
        document.getElementById('city').value = snapshot.val().city_d;
        document.getElementById('street').value = snapshot.val().street_d;
        document.getElementById('snum').value = snapshot.val().street_num;
        document.getElementById('fnum').value = snapshot.val().floor_num;
        document.getElementById('apnum').value = snapshot.val().apartment_num;
    });
}

document.getElementById("update").onclick = function () {
    Start();
    firebase.database().ref("Person/" + id).update({
        first_name: fname,
        last_name: lname,
        phone_number: phone,
        email_address: email,
        city_d: city,
        street_d: street,
        street_num: snum,
        floor_num: fnum,
        apartment_num: apnum
    });
    clearFields();
}

document.getElementById("delete").onclick = function () {
    Start();
    firebase.database().ref("Person/" + id).remove();
    clearFields();
}
