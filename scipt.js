/* =========================================================
   MOSTRAR / ESCONDER SENHA
========================================================= */

const password = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const eyeIcon =
    document.getElementById("eyeIcon");


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.textContent = "◉";

    } else {

        password.type = "password";

        eyeIcon.textContent = "◉";
    }

});


/* =========================================================
   VERIFICAÇÃO DO USUÁRIO
========================================================= */

const username =
    document.getElementById("username");

const usernameCheck =
    document.getElementById("usernameCheck");


username.addEventListener("input", function () {

    if (username.value.length >= 4) {

        usernameCheck.classList.add("show");

    } else {

        usernameCheck.classList.remove("show");

    }

});


/* =========================================================
   BOTÃO CONTINUAR
========================================================= */

const continueButton =
    document.getElementById("continueButton");


continueButton.addEventListener("click", function () {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const user =
        username.value.trim();

    const pass =
        password.value.trim();


    /* validações */

    if (name === "") {

        alert("Digite seu nome completo.");

        document.getElementById("name").focus();

        return;
    }


    if (phone === "") {

        alert("Digite seu número de telefone.");

        document.getElementById("phone").focus();

        return;
    }


    if (user.length < 4) {

        alert("O usuário precisa ter pelo menos 4 caracteres.");

        username.focus();

        return;
    }


    if (pass.length < 12) {

        alert("A senha precisa ter pelo menos 12 caracteres.");

        password.focus();

        return;
    }


    /* sucesso */

    continueButton.innerHTML =
        "✓ Conta criada!";


    continueButton.style.background =
        "linear-gradient(90deg, #ff7900, #e9184f)";


    console.log("Cadastro realizado!");

});


/* =========================================================
   MÁSCARA DE TELEFONE
========================================================= */

const phone =
    document.getElementById("phone");


phone.addEventListener("input", function (event) {

    let value =
        event.target.value.replace(/\D/g, "");


    if (value.length > 11) {

        value = value.substring(0, 11);

    }


    if (value.length <= 10) {

        value = value.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );

    } else {

        value = value.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            "($1) $2-$3"
        );

    }


    event.target.value = value;

});