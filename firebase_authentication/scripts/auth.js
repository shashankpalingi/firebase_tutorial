import { auth } from './firebase.js';
import { createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch((err) => {
        console.log(err.message);
    });

});