
    let formulario = document.querySelector("form.login-form-content");
    const campoEmail = document.querySelector("#email")
    const campoPassword = document.querySelector("#password")
    const errorEmail = document.querySelector("#errorEmail")
    const erroresPass = document.querySelector("#errorPass")

    formulario.addEventListener("submit", function (e) {
        if (campoEmail.value == "" && campoPassword.value == "") {
            errorEmail.innerHTML = 'Campo requerido';
            erroresPass.innerHTML = 'Campo requerido';
           e.preventDefault();
        }
    })

    campoEmail.addEventListener("blur", function () {
        if (campoEmail.value === "") {
           errorEmail.innerHTML = 'Debe completar este campo';
        } else if (!campoEmail.value.includes('@')) {
           errorEmail.innerHTML = 'El correo electrónico debe contener "@"';
        } 
    });
    
    campoPassword.addEventListener("blur", function () {
        if (campoPassword.value === "") {
            erroresPass.innerHTML = 'Debe completar este campo';
        }
    });

   

 
