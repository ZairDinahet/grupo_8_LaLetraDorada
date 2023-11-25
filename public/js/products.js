window.addEventListener('load', function(){
    let formulario = document.querySelector('form')
    const title = document.getElementById('title');
    const author = document.querySelector('#author');
    const coverImg = document.querySelector('#coverImg');
    const genre = document.querySelector('#category-select-main');
    const description = document.querySelector('#description');
    const biography = document.querySelector('#biography');
    const priceHardCover = document.querySelector('#priceHardCover');
    const priceSoftCover = document.querySelector('#priceSoftCover');
    const priceAudio = document.querySelector('#priceAudio');

    let fixes = document.querySelector ('.fixes ul');

    console.log(formulario)
    // let element=[]
    // element = (author.closest('.right').querySelectorAll('p'))
    // console.log(element)
    // console.log(element[0].id)//null
    // console.log(element[1].id)//short
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
    })}
    function validatorPrecios (input){
        // input.addEventListener('change',function(){
        // if (typeof(input)==string || typeof(input)==character ){
        //     document.querySelector('.fix-' +input.id+'-short').style.display = 'block'

        // }else{
        //     document.querySelector('.fix-' +input.id+'-short').style.display = 'none'
        // }
        //)}
        
        input.addEventListener('blur',function(){
        if (input.value.length==0) {
            document.querySelector('.fix-' +input.id+'-null').style.display = 'block'
        
        }else{
            document.querySelector('.fix-' +input.id+'-null').style.display = 'none'
        }

        let regex = /^[0-9]{1,10}(\.[0-9]{1,2})?$/;

        if (regex.test(input)) {
            document.querySelector('.fix-' +input.id+'-short').style.display = 'block'
        
        } else {
            document.querySelector('.fix-' +input.id+'-short').style.display = 'none'
        }
        })
    }    
    formulario.addEventListener('submit',function(event) {
        if (title.value == ''|| author.value == '' || coverImg.value == '' || genero.value == '' || description.value == '' || biography.value == '' ||
        title.value == null|| author.value == null || coverImg.value == null || genero.value == null || description.value == null || biography.value == null){
            errores.innerHtml ='<li>Los campos no pueden estar vacios</li>'
            formulario.preventDefault(e)
        } else {
            alert('La Pelicula se guardo')
        }
 
    })
    coverImg.addEventListener("change", function(){
        let file = this.files[0];
    if (file) {
        let fileExtension = file.name.split('.').pop().toLowerCase();
        let allowedExtensions = ['gif','jpeg', 'jpg', 'png'];
        if (allowedExtensions.indexOf(fileExtension) === -1) {
            alert('Comprueba la extensión de tus imágenes. Los formatos aceptados son .gif, .jpeg, .jpg y .png');
            coverImg.value = "";
            return false;
        }
    }
    })
    genre.addEventListener("blur", function(){
    let genreError = document.getElementById('genreError');
    if (genre.value === '') {
        genreError.textContent = ' Por favor, seleccione un género.';
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
})





