window.onload = function () {
    let form = document.querySelector('#registerForm');
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let email = document.querySelector('#email');
    let age = document.querySelector('#age');
    let password = document.querySelector('#password')

    let errorFirstName = document.createElement('p');
    let errorLastName = document.createElement('p');
    let errorEmail = document.createElement('p');
    let errorAge = document.createElement('p');
    let errorPassword = document.createElement('p');

    let errorFirstNameContainer = document.querySelector('#errorFirstName');
    errorFirstNameContainer.appendChild(errorFirstName);

    let errorLastNameContainer = document.querySelector('#errorLastName');
    errorLastNameContainer.appendChild(errorLastName);

    let errorEmailContainer = document.querySelector('#errorEmail');
    errorEmailContainer.appendChild(errorEmail);

    let errorAgeContainer = document.querySelector('#errorAge');
    errorAgeContainer.appendChild(errorAge);

    let errorPasswordContainer = document.querySelector('#errorPassword')
    errorPasswordContainer.appendChild(errorPassword);

    form.addEventListener('submit', (event) => {
        if (firstName.value == '' || lastName.value == '' || age.value == '' || email.value == '') {
            event.preventDefault();
            alert('Los campos no pueden estar vacíos');
        } else {
            alert('El perfil se guardó correctamente');
        }
    });

    firstName.addEventListener('blur', (event) => {
        if (firstName.value == '' || firstName.value.length < 2) {
            errorFirstName.textContent = 'El nombre debe tener al menos 2 caracteres';
            firstName.classList.add('invalid');
            firstName.classList.remove('valid');
        } else {
            errorFirstName.textContent = '';
            firstName.classList.remove('invalid');
            firstName.classList.add('valid');
        }
    });

    lastName.addEventListener('blur', (event) => {
        if (lastName.value == '' || lastName.value.length < 2) {
            errorLastName.textContent = 'El apellido debe tener al menos 2 caracteres';
            lastName.classList.add('invalid');
            lastName.classList.remove('valid');
        } else {
            errorLastName.textContent = '';
            lastName.classList.remove('invalid');
            lastName.classList.add('valid');
        }
    });

    email.addEventListener('blur', (event) => {
        if (email.value == "" || !email.value.includes('@')) {
            errorEmail.textContent = 'Ingresa un correo electrónico válido';
            email.classList.add('invalid');
            email.classList.remove('valid');
        } else {
            errorEmail.textContent = '';
            email.classList.remove('invalid');
            email.classList.add('valid');
        }
    });

    age.addEventListener('blur', (event) => {
        if (age.value == "" || age.value <= 0 || age.value > 110) {
            errorAge.textContent = 'Ingresa un valor entre 1 y 110';
            age.classList.add('invalid');
            age.classList.remove('valid');
        } else {
            errorAge.textContent = '';
            age.classList.remove('invalid');
            age.classList.add('valid');
        }
    });

    password.addEventListener('blur', (event) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            errorPassword.textContent = 'La contraseña debe 8 caracteres, una mayúscula, una minúscula y un carácter especial';
            password.classList.add('invalid');
            password.classList.remove('valid');
        } else {
            errorPassword.textContent = '';
            password.classList.remove('invalid');
            password.classList.add('valid');
        }
    });
    
};