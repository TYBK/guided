// Set up our register function
function register() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
  
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is missing or invalid.');
      return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        // Declare user variable
        const user = auth.currentUser;
  
              // Send email verification
              user.sendEmailVerification()
              .then(function () {
                // Email verification sent
                alert('Email verification sent. Please check your email to verify your account.');
      
                // Redirect to dash.html after email verification is sent
                window.location.href = 'dash.html';
              })
              .catch(function (error) {
                // Handle email verification error
                alert('Email verification could not be sent: ' + error.message);
              });
  
        // Add this user to Firebase Database
        const database_ref = database.ref();
  
        // Create User data
        const user_data = {
          email: email,
          full_name: full_name,
          last_login: Date.now(),
        };
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
          .then(() => {
            // User Created
            alert('User Created.');
  
            // Redirect to dash.html
            window.location.href = 'dash.html';
          })
          .catch(function (error) {
            // Handle database error
            alert('Error saving user data: ' + error.message);
          });
      })
      .catch(function (error) {
        // Firebase will use this to alert of its errors
        const error_message = error.message;
        alert(error_message);
      });
  }
  
  // Set up our login function
  function login() {
      // Get all our input fields
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    
      // Validate input fields
      if (!validate_email(email) || password.length < 6) {
        alert('Email or Password is missing or invalid.');
        return;
      }
    
      auth.signInWithEmailAndPassword(email, password)
        .then(function () {
          // Successfully logged in
          alert('Welcome!');
          window.location.href = 'dash.html'; // Redirect to dashboard
        })
        .catch(function (error) {
            // Handle email verification error
            alert('Email verification could not be sent: ' + error.message);
          });
    }
  // Add this user to Firebase Database
  const database_ref = database.ref();
  
  // Create User data
  const user_data = {
    last_login: Date.now(),
  };
  
  // Push to Firebase Database
  database_ref.child('users/' + user.uid).update(user_data)
    .then(() => {
      // User Logged In
      alert('User Logged In.');
    })
    .catch(function (error) {
      // Handle database error
      alert('Error updating user data: ' + error.message);
    });
  
  
  // Validate Functions
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than or equal to 6
    return password.length >= 6;
  }
  
  function validate_field(field) {
    return field !== null && field.length > 0;
  }
  