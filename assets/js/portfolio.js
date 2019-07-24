// --------------------------------------------------------------
// global variables

var welcomePage = $("#welcome-page").show();
var signInPage = $("#signin-page").hide();
var signUpPage = $("#signup-page").hide();

// --------------------------------------------------------------
// display other page sections

$("#welcome").on("click", function () {
    welcomePage.fadeIn();
    signInPage.hide();
    signUpPage.hide();

    // add active class to welcome nav item
    $("#welcome").addClass("active");

    // remove active class to nav items
    $(".signin").removeClass("active");
    $("#signup").removeClass("active");
});

$(".signin").on("click", function () {
    signInPage.fadeIn();
    welcomePage.hide();
    signUpPage.hide();

    // add active class to sign in nav items
    $(".signin").addClass("active");

    // remove active class to nav items
    $("#welcome").removeClass("active");
    $("#signup").removeClass("active");

});

$("#signup").on("click", function () {
    signUpPage.fadeIn();
    signInPage.hide();
    welcomePage.hide();

    // add active class from welcome nav item
    $("#signup").addClass("active");

    // remove active class to nav items
    $("#welcome").removeClass("active");
    $(".signin").removeClass("active");
});

// disable default page load on form submit
$("#signup-button").on("click", function (event) {
    event.preventDefault();
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


// --------------------------------------------------------------
// firebase config

var firebaseConfig = {
    apiKey: "AIzaSyBsLs7OS5tgblrWoApObrZ9cpjndB9fDVU",
    authDomain: "portfolio-a425e.firebaseapp.com",
    databaseURL: "https://portfolio-a425e.firebaseio.com",
    projectId: "portfolio-a425e",
    storageBucket: "",
    messagingSenderId: "122253291947",
    appId: "1:122253291947:web:43682f8c0743c01e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userData = firebase.database();
const auth = firebase.auth();

// --------------------------------------------------------------
// Sign Up button

// Button for signing up user
$("#signup-button").on("click", function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Grabs user input
    var firstName = $("#firstname-input").val().trim();
    var lastName = $("#lastname-input").val().trim();
    var email = $("#email-input").val().trim();
    var password = $("#password-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    // Uploads train data to the database
    userData.ref().push(newUser);

    // Logs everything to console
    console.log(newUser.firstName);
    console.log(newUser.lastName);
    console.log(newUser.email);
    console.log(newUser.password);

    // Alert
    alert("User successfully added");

    // Clears all of the text-boxes
    $("#firstname-input").val("");
    $("#lastname-input").val("");
    $("#email-input").val("");
    $("#password-input").val("");

    // Create a new user
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

});

$("#signout-button").hide();
$("#signedin-message").hide();

// --------------------------------------------------------------
// Sign In button

$("#signin-button").on("click", function (event) {
    // Grabs user input
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    console.log(email, password);

    function clearUserInputs () {
        // Clears all of the text-boxes
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#password").val("");
    }

    userData.ref().on("child_added", function (childSnapshot) {
        childSnapshot.val().email;
        childSnapshot.val().password;
    });

    // Login a user
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    // Add a realtime Listener
    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $("#signout-button").show();
            $("#signedin-message").show();
            clearUserInputs();
        } else {
            console.log('not logged in');
            $("#signout-button").hide();
            $("#signedin-message").hide();
            clearUserInputs();
        }
    });
});

// --------------------------------------------------------------
// Sign Out button

// Button for logging out user
$("#signout-button").on("click", function () {
    auth.signOut();

    // Clears all of the text-boxes
    $("#firstname-input").val("");
    $("#lastname-input").val("");
    $("#email-input").val("");
    $("#password-input").val("");

    // Add a realtime Listener
    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $("#signout-button").show();
            $("#signedin-message").show();
        } else {
            console.log('not logged in');
            $("#signout-button").hide();
            $("#signedin-message").hide();
        }
    });
});
