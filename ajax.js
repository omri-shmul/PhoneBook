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
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/Person/'+ id +'.json',
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
    firebase.database().ref("Person/"+id).on('value', function (snapshot) {
        document.getElementById('fname').value = snapshot.val().First_Name;
        document.getElementById('lname').value = snapshot.val().Last_Name;
        document.getElementById('id').value = snapshot.val().ID;
        document.getElementById('email').value = snapshot.val().Email;
        document.getElementById('phone').value = snapshot.val().Phone;
        document.getElementById('city').value = snapshot.val().City;
        document.getElementById('street').value = snapshot.val().Street_Name;
        document.getElementById('snum').value = snapshot.val().Street_Number;
        document.getElementById('fnum').value = snapshot.val().Floor_Number;
        document.getElementById('apnum').value = snapshot.val().Apartment_Number;  
    });
}

document.getElementById("showtable").onclick = function () {
    Start();
    clearTable();
    firebase.database().ref("Person").orderByChild("Last_Name").equalTo(lname).once('value', function (AllRecords) {

        AllRecords.forEach(
            function (CurrentRecord) {
                var fname_l = CurrentRecord.val().First_Name;
                var lname_l = CurrentRecord.val().Last_Name;
                var id_l = CurrentRecord.val().ID;
                var Phone_l = CurrentRecord.val().Phone;
                var city_l = CurrentRecord.val().City;
                var street_l = CurrentRecord.val().Street_Name;
                var stnum_l = CurrentRecord.val().Street_Number;
                var fnum_l = CurrentRecord.val().Floor_Number;
                var apnum_l = CurrentRecord.val().Apartment_Number;
                var email_l = CurrentRecord.val().Email;
                addItem(fname_l, lname_l, id_l, Phone_l, city_l, street_l, stnum_l, fnum_l, apnum_l, email_l);
            }
        );
    });
}

function addItem(fname_l, lname_l, id_l, Phone_l, city_l, street_l, stnum_l, fnum_l, apnum_l, email_l) {
    var tableBody = document.getElementById('tableBody');
    var row = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');
    var td10 = document.createElement('td');

    td1.innerHTML = fname_l;
    td2.innerHTML = lname_l;
    td3.innerHTML = id_l;
    td4.innerHTML = Phone_l;
    td5.innerHTML = city_l;
    td6.innerHTML = street_l;
    td7.innerHTML = stnum_l;
    td8.innerHTML = fnum_l;
    td9.innerHTML = apnum_l;
    td10.innerHTML = email_l;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    row.appendChild(td8);
    row.appendChild(td9);
    row.appendChild(td10);

    tableBody.appendChild(row);
}

function clearTable() {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
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
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/Person/'+ id +'.json',
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
        url: 'https://first-test-32b87-default-rtdb.firebaseio.com/Person/'+ id +'.json',
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
