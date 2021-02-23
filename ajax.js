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

    var param = {
        ID: id,
        First_Name: fname,
        Last_Name: lname,
        Phone: phone,
        City: city,
        Street_Name: street,
        Street_Number: snum,
        Floor_Number: fnum,
        Apartment_Number: apnum,
        Email: email
    };

    $.ajax({
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/' + id + '.json',
        type: "PUT",
        data: JSON.stringify(param),
        succes: function () {
            console.log("succes");
        },
        error: function(error) {
            console.log("Error" + error);
        }
    });
    clearFields();
}

document.getElementById("search").onclick = function () {
    Start();
    firebase.database().ref(id).on('value', function (snapshot) {
        document.getElementById('fname').value = snapshot.val().First_Name;
        document.getElementById('lname').value = snapshot.val().Last_Name;
        document.getElementById('email').value = snapshot.val().Email;
        document.getElementById('phone').value = snapshot.val().Phone;
        document.getElementById('city').value = snapshot.val().City;
        document.getElementById('street').value = snapshot.val().Street_Name;
        document.getElementById('snum').value = snapshot.val().Street_Number;
        document.getElementById('fnum').value = snapshot.val().Floor_Number;
        document.getElementById('apnum').value = snapshot.val().Apartment_Number;
    });
}

document.getElementById("update").onclick = function () {
    Start();

    var param = {
        ID: id,
        First_Name: fname,
        Last_Name: lname,
        Phone: phone,
        City: city,
        Street_Name: street,
        Street_Number: snum,
        Floor_Number: fnum,
        Apartment_Number: apnum,
        Email: email
    };

    $.ajax({
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/' + id + '.json',
        type: "PUT",
        data: JSON.stringify(param),
        succes: function () {
            console.log("succes");
        },
        error: function (error) {
            console.log("Error" + error);
        }
    });
    clearFields();
}

document.getElementById("delete").onclick = function () {
    Start();

    var param = {
        ID: id,
        First_Name: fname,
        Last_Name: lname,
        Phone: phone,
        City: city,
        Street_Name: street,
        Street_Number: snum,
        Floor_Number: fnum,
        Apartment_Number: apnum,
        Email: email
    };

    $.ajax({
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/' + id + '.json',
        type: "DELETE",
        data: JSON.stringify(param),
        succes: function () {
            console.log("succes");
        },
        error: function (error) {
            console.log("Error" + error);
        }
    });
    clearFields();
}