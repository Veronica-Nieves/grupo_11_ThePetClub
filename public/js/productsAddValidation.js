window.onload = function(){

    console.log("Estamos en la consola de la validación Front")
    let form = document.querySelector(".form-container");
    let errorsHtml = document.querySelector(".errores");
    let cleanFormButton = document.querySelector(".clean-form")

    let regWhiteSpace = /\s/; 
    let regSpecialCaracters = /^([a-z0-9]+(\/{1}[a-z0-9]+)*)+(?!([\/]{2}))$/; 
    let regAlphaNum = /^[A-Za-z\s]+$/;
    
//-------------------VALIDACION FRONT PARA UN NUEVO PRODUCTO --------------------//


    /* ------ FORMUKARIO -------*/
    form.name.focus();
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let errors = ["¡¡ ADVERTENCIA !!\n"];

    // NOMBRE
        if (form.name.value == "") {
            errors.push("Debe ingresar un nombre");
            form.name.classList.remove("is-valid")
            form.name.classList.add("is-invalid")
        } else if (form.name.value.length < 3 ) {
            errors.push("El nombre debe tener al menos 3 caracteres");
            form.name.classList.remove("is-valid")
            form.name.classList.add("is-invalid")
        } else {
            form.name.classList.remove("is-invalid")
            form.name.classList.add("is-valid")
        }

        

    // SKU
        if (form.sku.value == "") {
            errors.push("Debe ingresar un SKU con al menos 3 caracteres");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
        } else if (form.sku.value.length < 3 ) {
            errors.push("El SKU debe tener al menos 3 caracteres");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
        } else if (regWhiteSpace.test(form.sku.value) ) {
            errors.push("El SKU no debe incluir espacios en blanco");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
            /* Falta corregir que No acepte caracteres especiales
        } else if (NOT(regAlphaNum.test(form.sku.value)) ) {
            errors.push("El SKU no debe incluir caracteres especiales");
            form.sku.classList.remove("is-valid")
            form.sku.classList.add("is-invalid")
            */
        } else {
            form.sku.classList.remove("is-invalid")
            form.sku.classList.add("is-valid")
        }

    // DESCRIPCIÓN
    if (form.description.value == "") {
        errors.push("Debe ingresar la descripción del producto");
        form.description.classList.remove("is-valid")
        form.description.classList.add("is-invalid")
    } else if (form.description.value.length < 10 ) {
        errors.push("El nombre debe tener al menos 10 caracteres");
        form.description.classList.remove("is-valid")
        form.description.classList.add("is-invalid")
    } else {
        form.description.classList.remove("is-invalid")
        form.description.classList.add("is-valid")
    }

    // PRECIO
    if (form.price.value == "") {
        errors.push("Ingresar el precio del producto");
        form.price.classList.remove("is-valid")
        form.price.classList.add("is-invalid")
    } else if ( !(Number(form.price.value)) || form.price.value <= 0) {
        errors.push("El precio debe ser un valor numérico mayor que cero");
        form.price.classList.remove("is-valid")
        form.price.classList.add("is-invalid")
    } else {
        form.price.classList.remove("is-invalid")
        form.price.classList.add("is-valid")
    }

    // PRECIO DE OFERTA
    if (form.priceOffer.value == "") {
        errors.push("Ingresar el precio de oferta del producto. Solo se mostratrá si indica que el producto está en oferta");
        form.priceOffer.classList.remove("is-valid")
        form.priceOffer.classList.add("is-invalid")
    } else if ( !(Number(form.priceOffer.value)) || form.priceOffer.value <= 0) {
        errors.push("El precio de oferta debe ser un valor numérico mayor que cero");
        form.priceOffer.classList.remove("is-valid")
        form.priceOffer.classList.add("is-invalid")
    } else if ( form.priceOffer.value >= form.price.value) {
        errors.push("El precio de oferta debe ser menor o igual que el precio regular del producto");
        form.priceOffer.classList.remove("is-valid")
        form.priceOffer.classList.add("is-invalid")
    } else {
        form.priceOffer.classList.remove("is-invalid")
        form.priceOffer.classList.add("is-valid")
    }

     // PIECES
    if (form.pieces.value == "") {
        errors.push("Debe ingregar el inventario del producto");
        form.pieces.classList.remove("is-valid")
        form.pieces.classList.add("is-invalid")
    } else if ( !(Number(form.pieces.value)) || form.pieces.value <= 0) {
        errors.push("El inventario debe ser un valor numérico mayor que cero");
        form.pieces.classList.remove("is-valid")
        form.pieces.classList.add("is-invalid")
    } else {
        form.pieces.classList.remove("is-invalid")
        form.pieces.classList.add("is-valid")
    }

    
    // Mostrar Errores
    console.log(errors);
    if (errors.length > 0) {

        event.preventDefault();
        errorsHtml.innerHTML = "";
        errors.forEach(error => {
            errorsHtml.innerHTML += "<li>" + error + "</li>"
        });
        errorsHtml.classList.remove("hide")
    } else {
        errorsHtml.innerHTML = "";
        form.submit();
    }

    });


    /* ------ LIMPIAR FORMULARIO -------*/
    cleanFormButton.addEventListener('click', function(){
        errorsHtml.innerHTML = "";
        errorsHtml.classList.add("hide")

    });

    
}