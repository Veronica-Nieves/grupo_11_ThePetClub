window.addEventListener('load',function(){
    //Capturar el formulario 
    let formulario = document.querySelector('.formulario');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit',function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        }    

        function validaciones(evento){
          //Destructuring  
          let {first_name, last_name, email, password, password_confirmed, avatar  } = formulario.elements;
          let errores = [];
          console.log(formulario.elements.password_confirmed.value);
          //Validar Nombre
          if(first_name.value == ''){
              errores.push('El campo nombre no puede estar vacio...');
              first_name.classList.add('is-invalid');   
              //errores['first_name'] = 'El campo nombre no puede estar vacio...';
          }else{
              first_name.classList.add('is-valid');
              first_name.classList.remove('is-invalid');
          }

          //Validar Apellido
          if(last_name.value == ''){
            errores.push('El campo apellido no puede estar vacio...');
            last_name.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
        }
        //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   
        if(!reEmail.test(email.value)){
            errores.push('El email es inválido...');
            email.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
        //Aquí valido el password haciendo uso de Expresiones Regulares
        //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
        let rePassword = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
        if(!rePassword.test(password.value)){
            errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
            password.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }
        //Aquí valido a que la confirmación del password no llegue vacia
        if(password_confirmed.value == ""){
            errores.push('La confirmación de la contraseña no puede estar vacia');
            password_confirmed.classList.add('is-invalid');   

        }else{
            //Ahora valido si las dos contraseñas son iguales
            if(password.value != password_confirmed.value && password_confirmed != ""){
                errores.push('Las contraseñas deben ser iguales');
                password_confirmed.classList.add('is-invalid');   
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            }else{
                password_confirmed.classList.add('is-valid');
                password_confirmed.classList.remove('is-invalid');
            }
        }
        //Aquí valido que el usuario coloque su avatar (Yo en mi caso lo considero como un dato obligatorio, ustedes si quieren lo validan como deseen)
        if(avatar.value == ''){
            errores.push('Debe seleccionar su avatar en formato JPG - PNG ó JPEG');
            avatar.classList.add('is-invalid');   
            //errores['last_name'] = 'El campo nombre no puede estar vacio...';
        }else{
            avatar.classList.add('is-valid');
            avatar.classList.remove('is-invalid');
        }

          //Aquí enviamos los errores al usuario
          let ulErrores = document.getElementById('errores');
          ulErrores.classList.add('alert-danger')
          if(errores.length > 0){
              evento.preventDefault();
              ulErrores.innerHTML = "";
              for (let i = 0 ; i < errores.length; i++){
                ulErrores.innerHTML += `<li> ${errores[i]} </li> `
              }
              errores = [];
          }else{
              return true;
          } 
        }
        
    })

})