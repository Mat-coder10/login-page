const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!firstName || !lastName || !username || !email || !password) {
        message.textContent = "لطفاً تمام فیلدها را تکمیل کن.";
        message.style.color = "#f87171";
        return;
    }

    if (password.length < 8) {
        message.textContent = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
        message.style.color = "#f87171";
        return;
    }

    // رمز عبور را ذخیره نمی‌کنیم.
    const userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        createdAt: new Date().toISOString()
    };

    try {
        const savedUsers = JSON.parse(
            localStorage.getItem("registeredUsers") || "[]"
        );

        const usernameExists = savedUsers.some(
            user => user.username.toLowerCase() === username.toLowerCase()
        );

        if (usernameExists) {
            message.textContent = "این نام کاربری قبلاً ثبت شده است.";
            message.style.color = "#f87171";
            return;
        }

        savedUsers.push(userData);

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(savedUsers)
        );

        message.textContent = "حساب کاربری با موفقیت ثبت شد!";
        message.style.color = "#34d399";

        form.reset();

        console.log("اطلاعات کاربران:", savedUsers);

    } catch (error) {
        message.textContent = "ذخیره اطلاعات انجام نشد.";
        message.style.color = "#f87171";

        console.error("Storage error:", error);
    }
});