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

  $('.fbLogo').click( fbLogin )
});

let sendEmail = () => {
  let user = firebase.auth().currentUser // quien es el usuario activo

  user.sendEmailVerification()
    .then(() => {
      console.log('El correo se envio')
    }, (err) => {
      console.log( err )
    })
}


// createUser
let createUser = () => {
  let email = $('#email-new').val(),
    password = $('#password-new').val()

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(( data ) => {
      console.log( data )
      sendEmail()
    })
    .catch((err) => {
      console.error( err )
    })
  getUser()
  return false
}

// getUser
let getUser = () => {
  firebase.auth().onAuthStateChanged(( user ) => {
    // existe el usuario?
    if ( user ) {
      console.log( user )
      $('.saludo').html(`Tu correo es: <b>${ user.email }</b>, tu displayname de facebook es: ${ user.displayName }`)
      $('#access').hide()
      $('#logged').show()
    } else {
      $('#access').show()
      $('#logged').hide()
    }
  })
}

getUser()

let login = () => {
  let email     = $('#email').val(),
      password  = $('#password').val()

  firebase.auth().signInWithEmailAndPassword( email, password )
    .catch(( err ) => {
      console.log( err )
    })
}
// Nota: onAuthStateChanged isgue activo, ya que es parte de toda la instancia de Firebase ojo


let logout = () => {
  firebase.auth().signOut()
  .then(() => {
    // todo salio correctamente
    console.log('Ya termino la sesión')
  }, (err) => {
    console.log( err )
  })
}
// Nota: onAuthStateChanged isgue activo, ya que es parte de toda la instancia de Firebase ojo

let recoverPass = () => {
  let auth          = firebase.auth(),
      emailAddress  = $('#email').val()
  
  auth.sendPasswordResetEmail( emailAddress )
    .then(() => {
      alert('Se ha enviado un correo a su cuenta, Por favor sigue los pasos indicados')
    }, ( err ) => {
      console.log( err )
    })
}

var fbLogin = function () {
  //Facebook login actions...
  
  let provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup( provider )
    .then((result) => {
      console.log( result )
    }, (err) => {
      console.log( err )
    })
}