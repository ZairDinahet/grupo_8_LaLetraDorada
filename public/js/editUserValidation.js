window.onload = function () {
    let formulario = document.querySelector('form');
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let email = document.querySelector('#email');
    let age = document.querySelector('#age');

    let errorFirstName = document.createElement('p');
    let errorLastName = document.createElement('p');
    let errorEmail = document.createElement('p');
    let errorAge = document.createElement('p');

    let errorFirstNameContainer = document.querySelector('#errorFirstName');
    errorFirstNameContainer.appendChild(errorFirstName);

    let errorLastNameContainer = document.querySelector('#errorLastName');
    errorLastNameContainer.appendChild(errorLastName);

    let errorEmailContainer = document.querySelector('#errorEmail');
    errorEmailContainer.appendChild(errorEmail);

    let errorAgeContainer = document.querySelector('#errorAge');
    errorAgeContainer.appendChild(errorAge);

    formulario.addEventListener('submit', (event) => {
        if (firstName.value == '' || lastName.value == '' || age.value == '' || email.value == '') {
            event.preventDefault();
            alert('Los campos no pueden estar vacios');
        } else {
            alert('El perfil se guardo correctamente');
        }
    })

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
    })

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
    })

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
    })

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
    })
}