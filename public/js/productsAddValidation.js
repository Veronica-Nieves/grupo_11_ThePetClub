window.onload = function(){

    console.log("Estamos en la consola de la validación Front")
    let form = document.querySelector(".form-container");
    let warningBlock = document.querySelector(".warning-block")
    let warningTitle = document.querySelector(".warning-title")
    let errorsHtml = document.querySelector(".errors");
    let cleanFormButton = document.querySelector(".clean-form")

    // Identifica si una cadena contiene espacios en blanco
    let regWhiteSpace = /\s/; 
    // Identifica cadenas alfanuméricas (Solo caracteres dentro del rango)
    let regAlphaNum = /[A-Za-z0-9]/;
    // Identifica cadenas con caracteres especiales (detecta cualquier caracter que No entre en el rango [A-Za-z0-9])
    let regSpecialCaracter = /[^A-Za-z0-9]/; 


//-------------------VALIDACION FRONT PARA UN NUEVO PRODUCTO --------------------//


    /* ------ FORMUKARIO -------*/
    form.name.focus();
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let errors = [];

    // NOMBRE
        if (form.name.value == "") {
            errors.push("Debe ingresar un nombre.");
            form.name.classList.remove("is-valid")
            form.name.classList.add("is-invalid")
        } else if (form.name.value.length < 5 ) {
            errors.push("El nombre debe tener al menos 5 caracteres.");
            form.name.classList.remove("is-valid")
            form.name.classList.add("is-invalid")
        } else {
            form.name.classList.remove("is-invalid")
            form.name.classList.add("is-valid")
        }


    // SKU
        if (form.sku.value == "") {
            errors.push("Debe ingresar un SKU.");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
        } else if ( form.sku.value.length < 3 || regWhiteSpace.test(form.sku.value) || regSpecialCaracter.test(form.sku.value)) {
            errors.push("El SKU debe tener al menos 3 caracteres, no debe incluir espacios en blanco ni caracteres especiales.");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
        } else {
            form.name.classList.remove("is-invalid")
            form.name.classList.add("is-valid")
        }


    // DESCRIPCIÓN
    if (form.description.value == "") {
        errors.push("Debe ingresar la descripción del producto.");
        form.description.classList.remove("is-valid")
        form.description.classList.add("is-invalid")
    } else if (form.description.value.length < 20 ) {
        errors.push("La descripción debe tener al menos 20 caracteres.");
        form.description.classList.remove("is-valid")
        form.description.classList.add("is-invalid")
    } else {
        form.description.classList.remove("is-invalid")
        form.description.classList.add("is-valid")
    }


    // PRECIO
    if (form.price.value == "") {
        errors.push("Indique el precio del producto.");
        form.price.classList.remove("is-valid")
        form.price.classList.add("is-invalid")
    } else if ( !(Number(form.price.value)) || form.price.value <= 0) {
        errors.push("El precio debe ser un valor numérico mayor que cero.");
        form.price.classList.remove("is-valid")
        form.price.classList.add("is-invalid")
    } else {
        form.price.classList.remove("is-invalid")
        form.price.classList.add("is-valid")
    }

    
    // PRECIO DE OFERTA
    if (form.priceOffer.value == "" && form.offer.value == "si") {
        errors.push("Indique el precio de oferta del producto (solo se mostratrá si indica que el producto está en oferta).");
        form.priceOffer.classList.remove("is-valid")
        form.priceOffer.classList.add("is-invalid")
    } else if ( !(Number(form.priceOffer.value)) || form.priceOffer.value <= 0 || form.priceOffer.value >= form.price.value ) {
        errors.push("El precio de oferta debe ser un valor numérico mayor que cero y menor que el precio regular del producto.");
        form.priceOffer.classList.remove("is-valid")
        form.priceOffer.classList.add("is-invalid")
    } else {
        form.priceOffer.classList.remove("is-invalid")
        form.priceOffer.classList.add("is-valid")
    }


     // PIECES
    if (form.pieces.value == "") {
        errors.push("Indique el inventario del producto.");
        form.pieces.classList.remove("is-valid")
        form.pieces.classList.add("is-invalid")
    } else if ( !(Number(form.pieces.value)) || form.pieces.value <= 0) {
        errors.push("El número de piezas de inventario debe ser un valor numérico mayor que cero.");
        form.pieces.classList.remove("is-valid")
        form.pieces.classList.add("is-invalid")
    } else {
        form.pieces.classList.remove("is-invalid")
        form.pieces.classList.add("is-valid")
    }

    
    // Mostrar Errores
    console.log(errors);
    if (errors.length > 1) {

        event.preventDefault();
        errorsHtml.innerHTML = "";
        errors.forEach(error => {
            errorsHtml.innerHTML += "<li> <i class='fa-solid fa-triangle-exclamation' style='color: #eb0505;'></i>  " + error + "</li>"
        });
        warningBlock.classList.remove("hide");
        warningTitle.classList.remove("hide");
        errorsHtml.classList.remove("hide");

    } else {
        errorsHtml.innerHTML = "";
        form.submit();
    }

    });


    /* ------ LIMPIAR FORMULARIO -------*/
    cleanFormButton.addEventListener('click', function(){

        errorsHtml.innerHTML = "";
        warningBlock.classList.add("hide");
        warningTitle.classList.add("hide");
        errorsHtml.classList.add("hide");
    
        form.name.classList.remove("is-invalid");
        form.sku.classList.remove("is-invalid");
        form.description.classList.remove("is-invalid");
        form.price.classList.remove("is-invalid");
        form.priceOffer.classList.remove("is-invalid");
        form.pieces.classList.remove("is-invalid");

    });

    
}