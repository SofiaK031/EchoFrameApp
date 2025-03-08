const modal = document.getElementById("loginModal");

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-main");
    const main = document.querySelector("main");

    function updateMainPadding() {
        const headerHeight = header.offsetHeight;
        main.style.paddingTop = headerHeight + "px";
    }

    updateMainPadding();
    window.addEventListener("resize", updateMainPadding);
});

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    /*btn.addEventListener("click", function () {
        modal.style.display = "block";
    });*/

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector(".login-btn");
    let closeBtn = document.querySelector(".close");

    btn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});


// проверка отправки запроса на несуществующий сервер для Selenium, ошибка в любом случае при успешном заполнении полей формы
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let login = document.getElementById("login");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let role = document.getElementById("role");

    let loginError = document.getElementById("loginError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let roleError = document.getElementById("roleError");

    let isValid = true;

    // Очистка попередніх помилок
    loginError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    roleError.textContent = "";

    // Перевірка логіну
    if (login.value.trim().length < 3) {
        loginError.textContent = "Логін повинен містити щонайменше 3 символи.";
        loginError.style.display = "block";
        isValid = false;
    } else {
        loginError.style.display = "none";
    }

    // Перевірка email
    let emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Введіть правильну адресу електронної пошти.";
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Перевірка пароля
    if (password.value.trim().length < 6) {
        passwordError.textContent = "Пароль повинен містити щонайменше 6 символів.";
        passwordError.style.display = "block";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Перевірка ролі
    if (role.value === "") {
        roleError.textContent = "Оберіть вашу роль.";
        roleError.style.display = "block";
        isValid = false;
    } else {
        roleError.style.display = "none";
    }

    if (!isValid) return; // Якщо валідація не пройдена, припиняємо виконання

    console.log("Імітація запиту на бекенд...");

    // Імітація запиту на сервер
    fetch("https://nonexistent-backend.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login: login.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            role: role.value,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Сервер недоступний або не існує");
        }
        return response.json();
    })
    .then(data => {
        console.log("Успішний вхід:", data);
        alert("Успішний вхід!");
        
        // Зберігаємо в localStorage інформацію про помилку
        localStorage.setItem("postLoginError", "Виникла помилка після входу! Сервер недоступний.");
        
        // Перехід на index.html
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Помилка запиту:", error);
        
        // Отримуємо контейнер для помилки
        let serverError = document.getElementById("serverError");
        
        if (serverError) {
            serverError.textContent = "Помилка: сервер недоступний!";
            serverError.style.display = "block";
        } else {
            alert("Помилка: сервер недоступний!");
        }
    });
});