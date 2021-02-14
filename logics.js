// Get all data from the form
var email, fname, lname, phone, city, street, snum, fnum, apnum, id;

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
}

document.getElementById("delete").onclick = function () {
    Start();
    firebase.database().ref("Person/" + id).remove();
}