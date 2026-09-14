/* =========================================================
<<<<<<< HEAD
   MOSTRAR / OCULTAR SENHA
========================================================= */

const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
=======
   ESTADO DA APLICAÇÃO
========================================================= */

let currentRole = "colaborador"; // "colaborador" | "gestor"
let isGestorSignUp = false;

/* =========================================================
   ELEMENTOS DO DOM
========================================================= */

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const continueBtn = document.getElementById("continueButton");
const continueBtnText = document.getElementById("continueButtonText");

const btnRoleColaborador = document.getElementById("btnRoleColaborador");
const btnRoleGestor = document.getElementById("btnRoleGestor");
const formTitle = document.getElementById("formTitle");

const signupPrompt = document.getElementById("signupPrompt");
const signupPromptText = document.getElementById("signupPromptText");
const toggleSignMode = document.getElementById("toggleSignMode");

const passwordStrength = document.getElementById("passwordStrength");
const strengthText = document.getElementById("strengthText");
const segs = [
    document.getElementById("seg1"),
    document.getElementById("seg2"),
    document.getElementById("seg3"),
    document.getElementById("seg4")
];

const stepCards = document.querySelectorAll(".step");

/* =========================================================
   1. MOSTRAR / OCULTAR SENHA
========================================================= */
>>>>>>> 5df3018 (Atualiza página de cadastro)

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
<<<<<<< HEAD
   BOTÃO CONTINUAR
========================================================= */

const continueBtn = document.getElementById("continueButton");
const emailInput = document.getElementById("email");
=======
   2. INTERATIVIDADE DOS CARDS DE ETAPAS (LADO ESQUERDO)
========================================================= */

if (stepCards && stepCards.length > 0) {
    stepCards.forEach((card) => {
        card.addEventListener("click", () => {
            stepCards.forEach((c) => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
}

/* =========================================================
   3. SELETOR DE PERFIL (COLABORADOR / GESTOR)
========================================================= */

function updateRoleUI() {
    if (currentRole === "colaborador") {
        btnRoleColaborador.classList.add("active");
        btnRoleColaborador.setAttribute("aria-selected", "true");
        btnRoleGestor.classList.remove("active");
        btnRoleGestor.setAttribute("aria-selected", "false");

        formTitle.textContent = "Entrar como Colaborador";
        if (continueBtnText) continueBtnText.textContent = "Continuar";

        // No colaborador NÃO existe a opção de criar conta
        if (signupPrompt) signupPrompt.style.display = "none";

        // Esconde indicador de força da senha
        if (passwordStrength) passwordStrength.classList.remove("show");
        isGestorSignUp = false;
    } else {
        btnRoleGestor.classList.add("active");
        btnRoleGestor.setAttribute("aria-selected", "true");
        btnRoleColaborador.classList.remove("active");
        btnRoleColaborador.setAttribute("aria-selected", "false");

        if (signupPrompt) signupPrompt.style.display = "block";

        if (isGestorSignUp) {
            formTitle.textContent = "Criar conta de Gestor";
            if (continueBtnText) continueBtnText.textContent = "Criar conta";
            if (signupPromptText) signupPromptText.textContent = "Já possui uma conta de gestor?";
            if (toggleSignMode) toggleSignMode.textContent = "Entrar";
            if (passwordStrength) {
                passwordStrength.classList.add("show");
                updatePasswordStrength(passwordInput ? passwordInput.value : "");
            }
        } else {
            formTitle.textContent = "Entrar como Gestor";
            if (continueBtnText) continueBtnText.textContent = "Continuar";
            if (signupPromptText) signupPromptText.textContent = "Ainda não possui uma conta?";
            if (toggleSignMode) toggleSignMode.textContent = "Criar conta";
            if (passwordStrength) passwordStrength.classList.remove("show");
        }
    }
}

if (btnRoleColaborador && btnRoleGestor) {
    btnRoleColaborador.addEventListener("click", () => {
        currentRole = "colaborador";
        isGestorSignUp = false;
        updateRoleUI();
    });

    btnRoleGestor.addEventListener("click", () => {
        currentRole = "gestor";
        updateRoleUI();
    });
}

// Alternar entre Entrar e Criar Conta no modo Gestor
if (toggleSignMode) {
    toggleSignMode.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentRole === "gestor") {
            isGestorSignUp = !isGestorSignUp;
            updateRoleUI();
            if (isGestorSignUp && passwordInput) {
                passwordInput.focus();
            }
        }
    });
}

/* =========================================================
   4. MEDIDOR DE FORÇA DA SENHA (SENHA FRACA / MÉDIA / FORTE)
========================================================= */

function updatePasswordStrength(val) {
    if (!passwordStrength) return;

    if (!val || val.length === 0) {
        strengthText.textContent = "Muito fraca";
        strengthText.className = "strength-status weak";
        segs.forEach((seg) => {
            if (seg) seg.className = "strength-segment";
        });
        return;
    }

    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) score++;

    score = Math.max(1, score);

    let statusText = "Senha fraca";
    let statusClass = "weak";
    let segClass = "active-weak";

    if (score === 2) {
        statusText = "Senha média";
        statusClass = "medium";
        segClass = "active-medium";
    } else if (score === 3) {
        statusText = "Senha forte";
        statusClass = "strong";
        segClass = "active-strong";
    } else if (score >= 4) {
        statusText = "Senha muito forte";
        statusClass = "very-strong";
        segClass = "active-very-strong";
    }

    strengthText.textContent = statusText;
    strengthText.className = `strength-status ${statusClass}`;

    segs.forEach((seg, idx) => {
        if (!seg) return;
        if (idx < score) {
            seg.className = `strength-segment ${segClass}`;
        } else {
            seg.className = "strength-segment";
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
        if (isGestorSignUp) {
            updatePasswordStrength(e.target.value);
        }
    });
}

/* =========================================================
   5. BOTÃO CONTINUAR / ENVIAR
========================================================= */
>>>>>>> 5df3018 (Atualiza página de cadastro)

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

<<<<<<< HEAD
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
=======
        const originalText = continueBtnText ? continueBtnText.textContent : "Continuar";
        if (continueBtnText) {
            continueBtnText.textContent = isGestorSignUp ? "Criando conta..." : "Entrando...";
        }
        continueBtn.disabled = true;

        setTimeout(() => {
            if (continueBtnText) {
                continueBtnText.textContent = isGestorSignUp ? "✓ Conta criada!" : "✓ Sucesso!";
            }
            continueBtn.style.background = "linear-gradient(90deg, #10b981, #059669)";

            setTimeout(() => {
                continueBtn.disabled = false;
                if (continueBtnText) continueBtnText.textContent = originalText;
                continueBtn.style.background = "";
            }, 1800);
        }, 700);
    });
}

// Inicialização
updateRoleUI();
>>>>>>> 5df3018 (Atualiza página de cadastro)
