window.addEventListener('load',function(){
    //Capturar el formulario 
    let form = document.querySelector('.sing-up-form-container');
    let warningBlock = document.querySelector(".warning-block")
    let warningTitle = document.querySelector(".warning-title")
    let errorsHtml = document.querySelector(".errors");
    let cleanFormButton = document.querySelector(".clean-form")

    //console.log(form.elements.email.value);
    form.addEventListener('submit',function(event){

        if(!validaciones(event)){
            event.preventDefault();
        }else{
            form.submit();
        }    

        function validaciones(event){
          //Destructuring  
          //let {firstName, lastName, nameUser, email, password, passwordConfirmed, avatar  } = formulario.elements;
          let errors = [];
          /* console.log(form.elements.passwordConfirmed.value); */

          //Validar Nombre
          if( form.firstName.value == ''){
            errorsHtml.push('Ingrese su nombre');
            form.firstName.classList.add('is-invalid');  
              //errorsHtml['firstName'] = 'El campo nombre no puede estar vacio...';
          }else if (form.firstName.value.length < 5 ) {
            errors.push("El nombre debe tener al menos 6 caracteres.");
            form.firstName.classList.remove("is-valid")
            form.firstName.classList.add("is-invalid")
          }

          //Validar Apellido
          if(lastName.value == ''){
            errorsHtml.push('Ingrese su apellido');
            lastName.classList.add('is-invalid');   
            //errorsHtml['lastName'] = 'El campo nombre no puede estar vacio...';
        }else if (lastName.value.length < 5 ) {
            errors.push("El nombre debe tener al menos 6 caracteres.");
            lastName.classList.remove("is-valid")
            lastName.classList.add("is-invalid")
          }

        //Validar Nombre de usuario
          if( form.nameUser.value == ''){
            errorsHtml.push('El campo nombre no puede estar vacio...');
              nameUser.classList.add('is-invalid');   
              //errorsHtml['firstName'] = 'El campo nombre no puede estar vacio...';
          }else if (nameUser.value.length < 5 ) {
            errors.push("El nombre debe tener al menos 6 caracteres.");
            nameUser.classList.remove("is-valid")
            nameUser.classList.add("is-invalid")
          }

        //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   
        if(!reEmail.test(email.value)){
            errorsHtml.push('El email es inválido.');
            email.classList.add('is-invalid');   
            //errorsHtml['lastName'] = 'El campo nombre no puede estar vacio...';
        }else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
        //Aquí valido el password haciendo uso de Expresiones Regulares
        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
        let rePassword = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
        if(!rePassword.test(password.value)){
            errorsHtml.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
            password.classList.add('is-invalid');   
            //errorsHtml['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }
        //Aquí valido a que la confirmación del password no llegue vacia
        if(passwordConfirmed.value == ""){
            errorsHtml.push('La confirmación de la contraseña no puede estar vacia');
            passwordConfirmed.classList.add('is-invalid');   

        }else{
            //Ahora valido si las dos contraseñas son iguales
            if(password.value != passwordConfirmed.value && passwordConfirmed != ""){
                errorsHtml.push('Las contraseñas deben ser iguales');
                passwordConfirmed.classList.add('is-invalid');   
                //errorsHtml['last_name'] = 'El campo nombre no puede estar vacio...';
            }else{
                passwordConfirmed.classList.add('is-valid');
                passwordConfirmed.classList.remove('is-invalid');
            }
        }
        //Aquí valido que el usuario coloque su avatar (Yo en mi caso lo considero como un dato obligatorio, ustedes si quieren lo validan como deseen)
        if(avatar.value == ''){
            errorsHtml.push('Debe seleccionar su avatar en formato JPG - PNG ó JPEG');
            avatar.classList.add('is-invalid');   
            //errorsHtml['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            avatar.classList.add('is-valid');
            avatar.classList.remove('is-invalid');
        }

          //Aquí enviamos los errores al usuario
          /* let ulErrores = document.getElementById('.errors'); */
          /* ulErrores.classList.add('alert-danger') */
          console.log(errors);
          if (errors.length > 0) {
      
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
    }
});
  
})