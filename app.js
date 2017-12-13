$(function () {

	$('#login-form-link').click(function (e) {
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function (e) {
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('.fbLogo').click(fbLogin);

});

var sendEmail = function () {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification()
		.then(function () {
			console.log('El correo se envió');
		}, function (error) {
			console.log(error)
		})
}



//Create User
var createUser = function () {
	var email = $('#email-new').val();
	var password = $('#password-new').val();

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function (data) {
			console.log(data)
			sendEmail();
		})
		.catch(function (error) {
			console.log(error)
		})
	getUser();
	return false;
}


//Get User
var getUser = function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log(user)
			$('.saludo').html('Tu usuario es: <b>' + user.email + '</b>')
			$('#access').hide();
			$('#logged').show();
		} else {
			$('#access').show();
			$('#logged').hide();
		}
	})
}

getUser();

var login = function () {
	var email = $('#email').val();
	var password = $('#password').val();

	firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function (error) {
			console.log(error)
		})
}

var logout = function () {
	firebase.auth().signOut()
		.then(function () {
			console.log('Ya terminó la sesión')
		}, function (error) {
			console.log(error);
		})
}

var recoverPass = function () {
	var auth = firebase.auth();
	var emailAddress = $('#email').val();

	auth.sendPasswordResetEmail(emailAddress)
		.then(function () {
			alert('Se ha enviado un correo a su cuenta. Por favor sigue los pasos indicados.');
		}, function (error) {
			console.log(error)
		})
}


var fbLogin = function () {
	//Facebook login actions...
}