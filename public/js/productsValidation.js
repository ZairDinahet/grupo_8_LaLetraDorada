window.addEventListener('load', function(){
    let form = document.querySelector('.forms-container');
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let coverImg = document.querySelector('#coverImg');
    let genre = document.querySelector('#category-select-main');
    let description = document.querySelector('#description');
    let biography = document.querySelector('#biography');
    let priceHardCover = document.querySelector('#priceHardCover');
    let priceSoftCover = document.querySelector('#priceSoftCover');
    let priceAudio = document.querySelector('#priceAudio');
    let priceEpub = document.querySelector('#priceEpub');

    function validateField(element, errorMessage) {
        if (element.value.trim() === '') {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }
    }

    function clearErrors(currentInput, otherInputs) {
        otherInputs.forEach(input => {
            if (input !== currentInput) {
                let errorMessage = input.nextElementSibling;
                errorMessage.style.display = 'none';
            }
        });
    }

    title.addEventListener('blur', function() {
        let errorMessage = document.querySelector('.fix-title-null');
        validateField(this, errorMessage);
    });

    author.addEventListener('blur', function() {
        let errorMessage = document.querySelector('.fix-author-null');
        validateField(this, errorMessage);
    });

    coverImg.addEventListener('blur', function() {
        let errorMessage = document.querySelector('.fix-portada');
        validateField(this, errorMessage);
    });

    genre.addEventListener('change', function() {
        let errorMessage = document.querySelector('#genreError');
        validateField(this, errorMessage);
    });

    description.addEventListener('blur', function() {
        let errorMessage = document.querySelector('.fix-description-null');
        validateField(this, errorMessage);
    });

    biography.addEventListener('blur', function() {
        let errorMessage = document.querySelector('.fix-biography-null');
        validateField(this, errorMessage);
    });

    priceHardCover.addEventListener('input', function() {
        let errorMessage = document.querySelector('.fix-priceHardCover-null');
        validateField(this, errorMessage);
        clearErrors(this, [priceSoftCover, priceAudio, priceEpub]);
    });

    priceSoftCover.addEventListener('input', function() {
        let errorMessage = document.querySelector('.fix-priceSoftCover-null');
        validateField(this, errorMessage);
        clearErrors(this, [priceHardCover, priceAudio, priceEpub]);
    });

    priceAudio.addEventListener('input', function() {
        let errorMessage = document.querySelector('.fix-priceAudio-null');
        validateField(this, errorMessage);
        clearErrors(this, [priceHardCover, priceSoftCover, priceEpub]);
    });

    priceEpub.addEventListener('input', function() {
        let errorMessage = document.querySelector('.fix-priceEpub-null');
        validateField(this, errorMessage);
        clearErrors(this, [priceHardCover, priceSoftCover, priceAudio]);
    });

    form.addEventListener('submit', function(event) {
        let errors = [];

        if (title.value.trim() === '') {
            errors.push('El título es obligatorio');
        }

        if (author.value.trim() === '') {
            errors.push('El autor es obligatorio');
        }

        if (coverImg.value.trim() === '') {
            errors.push('La portada es obligatoria');
        }

        if (genre.value === '') {
            errors.push('Seleccione un género');
        }

        if (description.value.trim() === '') {
            errors.push('La descripción es obligatoria');
        }

        if (biography.value.trim() === '') {
            errors.push('La biografía del autor es obligatoria');
        }

        if (
            priceHardCover.value.trim() === '' &&
            priceSoftCover.value.trim() === '' &&
            priceAudio.value.trim() === '' &&
            priceEpub.value.trim() === ''
        ) {
            errors.push('Al menos un precio debe ser ingresado');
        }

        if (errors.length > 0) {
            event.preventDefault();
            let errorMessageContainer = document.querySelector('.error-message p');
            errorMessageContainer.innerHTML = '';
            errors.forEach(function(error) {
                let errorMessage = document.createElement('span');
                errorMessage.textContent = error;
                errorMessageContainer.appendChild(errorMessage);
                errorMessageContainer.appendChild(document.createElement('br'));
            });
        }
    });
});
