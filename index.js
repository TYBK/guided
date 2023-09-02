  const firebaseConfig = {
  apiKey: "AIzaSyCU6aoGuiBmCp73yiU_Xfc1URv8ZqHn6M4",
  authDomain: "guided-efd44.firebaseapp.com",
  projectId: "guided-efd44",
  storageBucket: "guided-efd44.appspot.com",
  messagingSenderId: "914223813485",
  appId: "1:914223813485:web:fe46a318f4135ee9584064",
  measurementId: "G-SXGSSNCG04"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);


// create account //

  const createAccountForm = document.getElementById('create-account-form');
  const errorMessage = document.getElementById('error-message');

  createAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Perform basic validation
    if (email === '' || newPassword === '' || confirmPassword === '') {
      errorMessage.textContent = 'Please fill in all fields.';
      return;
    }

    if (newPassword !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      return;
    }

    try {
      // Create a new user with Firebase Authentication
      await firebase.auth().createUserWithEmailAndPassword(email, newPassword);

      // Redirect to the dashboard or another page
      window.location.href = 'dashboard.html';
    } catch (error) {
      // Handle authentication errors and display error messages
      console.error(error);
      errorMessage.textContent = error.message;
    }
  });

  // Define function to go back to the login page
  function goBack() {
    window.location.href = 'login.html';
  }


  // login //

  const loginForm = document.getElementById('login-form');

  // Define the function to redirect to the create account page
  function redirectToCreateAccount() {
    window.location.href = 'create-account.html';
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Sign in user with Firebase Authentication
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

      // User signed in successfully
      const user = userCredential.user;

      // You can redirect to a dashboard or another page here
      window.location.href = 'dashboard.html';
    } catch (error) {
      // Handle authentication errors and display error messages
      console.error(error);
      errorMessage.textContent = 'Invalid email or password.';
    }
  });
  