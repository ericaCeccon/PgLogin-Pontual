/* =========================================================
   MOSTRAR / OCULTAR SENHA
========================================================= */

const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";

        if (eyeIcon) {
            eyeIcon.innerHTML = isPassword
                ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
                : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
        }
    });
}

/* =========================================================
   BOTÃO CONTINUAR
========================================================= */

const continueBtn = document.getElementById("continueButton");
const emailInput = document.getElementById("email");

if (continueBtn) {
    continueBtn.addEventListener("click", function () {
        const email = emailInput ? emailInput.value.trim() : "";
        const pass = passwordInput ? passwordInput.value.trim() : "";

        if (!email) {
            alert("Por favor, digite seu email.");
            if (emailInput) emailInput.focus();
            return;
        }

        if (!pass) {
            alert("Por favor, digite sua senha.");
            if (passwordInput) passwordInput.focus();
            return;
        }

        const originalHtml = continueBtn.innerHTML;
        continueBtn.innerHTML = "<span>Entrando...</span>";
        continueBtn.disabled = true;

        setTimeout(() => {
            continueBtn.innerHTML = "<span>✓ Sucesso!</span>";
            continueBtn.style.background = "linear-gradient(90deg, #10b981, #059669)";
            continueBtn.disabled = false;
        }, 600);
    });
}
