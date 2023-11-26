window.addEventListener('load', function(){
    let formulario = document.querySelector('.forms-container')
    const title = document.getElementById('title');
    const author = document.querySelector('#author');
    const coverImg = document.querySelector('#coverImg');
    const genre = document.querySelector('#category-select-main');
    const description = document.querySelector('#description');
    const biography = document.querySelector('#biography');
    const priceHardCover = document.querySelector('#priceHardCover');
    const priceSoftCover = document.querySelector('#priceSoftCover');
    const priceAudio = document.querySelector('#priceAudio');
    const priceEpub = document.querySelector('#priceEpub');
    
    
    function validator (input){
        
        input.addEventListener('blur',function(){
        if ((input== 'description' || input== 'biography')&& input.value.length<21 && input.value.length>0){
            document.querySelector('.fix-' +input.id+'-short').style.display = 'block'

        }else{
            document.querySelector('.fix-' +input.id+'-short').style.display = 'none'
        }

        if (input!='description' && input.value.length<6 && input.value.length>0){
            document.querySelector('.fix-' +input.id+'-short').style.display = 'block'

        }else{
            document.querySelector('.fix-' +input.id+'-short').style.display = 'none'
        }
        if (input!='description' && input.value.length==0) {
            document.querySelector('.fix-' +input.id+'-null').style.display = 'block'
        
        }else{
            document.querySelector('.fix-' +input.id+'-null').style.display = 'none'
        }
    })   
}
    function validatorPrecios (input){
        input.addEventListener('blur',function(){
        if (input.value.length==0) {
            document.querySelector('.fix-' +input.id+'-null').style.display = 'block'
        
        }else{
            document.querySelector('.fix-' +input.id+'-null').style.display = 'none' 
        }

        let regex = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;
        console.log(input.value)
        if (regex.test(parseFloat(input.value))) {
            document.querySelector('.fix-' +input.id+'-short').style.display = 'none'
        
        } else {
            document.querySelector('.fix-' +input.id+'-short').style.display = 'block'
            
        }
        })
    }    
    coverImg.addEventListener('blur',function(){
        let file = this.files[0];
        if(!file){
            document.querySelector('.fix-portada').style.display = 'block'
        }
    })
    coverImg.addEventListener("change", function(){
    let file = this.files[0];
    let fileExtension = file.name.split('.').pop().toLowerCase();
    let allowedExtensions = ['gif','jpeg', 'jpg', 'png'];
    if (file) {
        document.querySelector('.fix-portada').style.display = 'none'
        if (allowedExtensions.indexOf(fileExtension) === -1) {
            alert('Comprueba la extensión de tus imágenes. Los formatos aceptados son .gif, .jpeg, .jpg y .png');
            coverImg.value = "";
            return false;
        }
    }
    })
    genre.addEventListener("blur", function(){
    let genreError = document.getElementById('genreError');
    if (genre.value == '') {
        genreError.textContent = 'Por favor, seleccione un género.';
    } else {
        genreError.textContent = '';
        
    }
    })
    validator(title)
    validator(author )
    validator(description )
    validator(biography)
    validatorPrecios(priceHardCover)
    validatorPrecios(priceSoftCover)
    validatorPrecios(priceAudio)
    validatorPrecios(priceEpub)

    formulario.addEventListener('submit',function(event) {
        let fixes = document.querySelector ('.fixes ul');
        //event.preventDefault()
        if (title.value === '' && author.value === '' && coverImg.value === '' && genre.value === '' &&
        description.value === '' && biography.value === '' && priceHardCover.value === '' &&
        priceSoftCover.value === '' && priceAudio.value === '' && priceEpub.value === '') {
            //event.preventDefault()
            fixes.innerHTML = "<li class='text-danger'>Todos los campos están vacíos</li>";
        } else {
            //event.preventDefault()
            fixes.innerHTML = ""
            let campos = [title, author, coverImg, description, biography,  priceHardCover, priceSoftCover, priceAudio, priceEpub];
            let labelElement = ""
            let labelText = ""
            for (let i = 0; i < campos.length; i++) {
                if (campos[i].value.trim() === '') {
                    labelElement = document.querySelector('label[for="' + campos[i].id + '"]');
                    labelText = labelElement.textContent;
                    fixes.innerHTML +=  "<li class='text-danger'> el campo " +labelText + " no puede estar vacío</li>";
                    }
                }
            if (genre.value.trim() === '') {
                fixes.innerHTML +=  "<li class='text-danger'> el campo Genero no puede estar vacío</li>";
                }
        }
        //Se comprueba si no hay ningun error detectado en todo el formulario
        let paragraphs = document.querySelectorAll('p.text-danger');
        let trueOrFalse = Array.from(paragraphs).some(function(paragraph) {
            let displayValue = window.getComputedStyle(paragraph).getPropertyValue('display');
            return displayValue === 'block';
        });
        let lista = fixes.getElementsByTagName('li')
        // console.log(paragraphs)
        // console.log(trueOrFalse) 
        // console.log(lista.length)  
        if (trueOrFalse || lista.length !=0) {
            alert('Por favor, corrige los errores antes de cargar el libro.');
            event.preventDefault()
            return;
        }else{
            alert('El libro se guardó correctamente');
        } 
    })
    
})
        





