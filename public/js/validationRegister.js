/* console.log('archivo vinculado'); */
const firstNameField = document.querySelector("[name=firstName]");
const lastNameField = document.querySelector("[name=lastName]");
const nameUserField = document.querySelector("[name=nameUser]");
const passwordField = document.querySelector("[name=password]");
const passwordConfirmedField = document.querySelector("[name=passwordConfirmed]");
const emailField = document.querySelector("[name=email]");
const fileField = document.querySelector("[name=avatar]");

/* console.log(firstNameField, passwordField,emailField, fileField, nameUserField, passwordConfirmedField); */
const setErrors = (message, field, isError = true) => {
  if (isError) {
    field.classList.add("invalid");
    field.nextElementSibling.classList.add("error");
    field.nextElementSibling.innerText = message;
  } else {
    field.classList.remove("invalid");
    field.nextElementSibling.classList.remove("error");
    field.nextElementSibling.innerText = "";
  }
}

const validateEmptyField = (message, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  if (fieldValue.trim().length === 0) {
    setErrors(message, field);
  } else {
    setErrors("", field, false);
  }
}

const validateEmailFormat = e => {
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
    setErrors("Ingrese un email válido", field);
  } else {
    setErrors("", field, false);
  }
}

firstNameField.addEventListener("blur", (e) => validateEmptyField("Ingrese su nombre", e));
lastNameField.addEventListener("blur", (e) => validateEmptyField("Ingrese su apellido", e));
nameUserField .addEventListener("blur", (e) => validateEmptyField("Ingrese un nombre de usuario", e));
passwordField.addEventListener("blur", (e) => validateEmptyField("Ingrese su contraseña", e));
passwordConfirmedField.addEventListener("blur", (e) => validateEmptyField("Confirme su contraseña", e));
emailField.addEventListener("blur", (e) => validateEmptyField("Ingrese un email válido", e));

emailField.addEventListener("input", validateEmailFormat);

fileField.addEventListener("change", (e) => {
  const field = e.target;
  const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
  const allowedExt = ["jpg", "jpeg", "png", "gif"];
  if (!allowedExt.includes(fileExt)) {
    setErrors(`Extensiones permitidas: ${allowedExt.join(", ")}`, field);
  } else {
    setErrors("", field, false);
  }
});