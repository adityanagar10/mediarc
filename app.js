const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));


var firstname = "";
var symp = "";
var cty = "";
var username="";
var doci = "";

//----------------- DataBases -----------------//

mongoose.connect("mongodb+srv://admin:qsvQjmPPnADSp83d@pawhelper.5qct4.mongodb.net/profileDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const profileSchema = {
    fname: String,
    lname: String,
    phoneNumber: Number,
    email: String,
    password: String,
    adress: String,
    city: String,
    state: String,
    zip: Number
}

const doctorSchema = {
    f_name: String,
    l_name: String,
    phone_number: Number,
    email: String,
    clinic_address: String,
    city : String,
    degrees: String,
    rating: Number,
    specialisation: String
}


const Profile = mongoose.model("Profile", profileSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);

//-----------------login page-----------------//

app.get("/", function (req, res) {
    res.render("login");
})

app.post("/", function (req, res) {

    username = req.body.login;
    var password = req.body.password;

    Profile.findOne({
        email: username
    }, function (err, foundUser) {
        if (err) {

            console.log(err);

        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("homepage");
                } else {
                    alert("Wrong password or email");
                    res.render("login");
                }
            }
        }
    });

});


//----------------- sign up page-----------------//

app.post('/signup', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    const details = new Profile({
        fname: fname,
        lname: lname,
        phoneNumber: phone,
        email: email,
        password: password,
        adress: address,
        city: city,
        state: state,
        zip: zip
    })

    details.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("homepage");
        }
    })
})

//----------------- sign up doctor page-----------------//

app.get('/doctorregistration',function(req, res){
    res.render("doctor");
})

app.post('/doctorregistration', function (req, res) {
    const fname = req.body.f_name;
    const lname = req.body.l_name;
    const phone = req.body.phone_number;
    const email = req.body.email_doctor;
    const address = req.body.address;
    const city = req.body.clinic_city;
    const degree = req.body.degree;
    const specialisation = req.body.specialisation;

    const doctor = new Doctor({
        f_name: fname,
        l_name: lname,
        phone_number: phone,
        clinic_address: address,
        city: city,
        degrees: degree,
        specialisation: specialisation
    })

    doctor.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("homepage");
        }
    })
})


//----------------- profile -----------------//

app.get("/profile", function (req, res) {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;


    Profile.find({
        email: ema
    }, function (err, profiles) {
        if (err) {
            console.log(err);
        } else {
            res.render("profile", {
                profile: profiles[0]
            });
            console.log(profiles);
        }
    })

})


app.post("/profile", function (req, res) {
    ema = req.body.email;
    firstname = req.body.fname;

    // Profile.find({email: ema}, function(err, profiles){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log(profiles);
    //     }
    // })

    res.redirect("/profile");
})

//----------------- search -----------------//


app.get("/search", function(req,res){
    if(symp === "fever" || symp === "headache" || symp==="cold"){
        doci = "General Physician";
    }
    else if(symp ==="toothache" || symp ==="cavity" || symp==="bad breath"){
        doci = "Dentist";
    }

    console.log(doci);
    console.log(cty);

    Doctor.find({
        city: cty,
        specialisation: doci
    }, function(err , doctors){
        if(err){
            console.log(err);
        } else {
            console.log(doctors);
            res.render("results", { doctor: doctors});
        }
    })



})
app.post("/search", function(req,res){
    symp = req.body.problem;
    cty = req.body.city;
    res.redirect("/search");


})

let port = process.env.PORT;
if(port == null || port==""){
  port = 3000;
}

app.listen(port, function () {
    console.log("----Server Started----");
})

//----------------- search -----------------//

app.post("/booking", function(req,res){
    console.log(username);
})


//Cardiologist
//General Physician
//Dentist
//General Surgeon
//Dermatologist