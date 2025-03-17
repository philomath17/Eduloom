document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded!");

    // Get elements
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    // ✅ 1. Signup Form Validation & Submission
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;
            const passwordError = document.getElementById("password-error");
            const confirmPasswordError = document.getElementById("confirm-password-error");

            // ✅ Password Validation: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            let isValid = true;

            // Debugging logs
            console.log("Password:", password, "Confirm Password:", confirmPassword);
            console.log("Regex Test:", passwordPattern.test(password), "Passwords Match:", password === confirmPassword);

            // Validate password strength
            if (!passwordPattern.test(password)) {
                passwordError.textContent = "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
                passwordError.style.display = "block";
                isValid = false;
            } else {
                passwordError.style.display = "none";
            }

            // Validate password match
            if (password !== confirmPassword) {
                confirmPasswordError.textContent = "Passwords do not match.";
                confirmPasswordError.classList.remove("hidden");
                isValid = false;
            } else {
                confirmPasswordError.style.display = "none";
            }

            if (!isValid) return;

            // Proceed with signup request
            try {
                const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });

                if (response.ok) {
                    alert("Signup successful!");
                    window.location.href = "signin.html";
                } else {
                    alert("Signup failed. Try again.");
                }
            } catch (error) {
                console.error("Signup Error:", error);
            }
        });
    }

    // ✅ 2. Sign-in Form Submission
    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://127.0.0.1:8000/api/signin/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    alert("Login successful!");
                    window.location.href = "dashboard.html";
                } else {
                    alert("Invalid credentials. Try again.");
                }
            } catch (error) {
                console.error("Login Error:", error);
            }
        });
    }

    // ✅ 3. Modal Handling for Class Creation & Joining
    const createClassBtn = document.getElementById("createClassBtn");
    const joinClassBtn = document.getElementById("joinClassBtn");
    const createClassModal = document.getElementById("createClassModal");
    const joinClassModal = document.getElementById("joinClassModal");
    const closeButtons = document.querySelectorAll(".closeModal");

    function openModal(modal) {
        if (modal) modal.classList.add("active");
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove("active");
    }

    if (createClassBtn) {
        createClassBtn.addEventListener("click", () => openModal(createClassModal));
    }

    if (joinClassBtn) {
        joinClassBtn.addEventListener("click", () => openModal(joinClassModal));
    }

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            closeModal(createClassModal);
            closeModal(joinClassModal);
            document.getElementById("createClassForm")?.reset();
            document.getElementById("joinClassForm")?.reset();
        });
    });

    if (document.getElementById("createClassForm")) {
        document.getElementById("createClassForm").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Class Created!");
            closeModal(createClassModal);
        });
    }

    if (document.getElementById("joinClassForm")) {
        document.getElementById("joinClassForm").addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Joined Class!");
            closeModal(joinClassModal);
        });
    }

    // ✅ 4. Theme Toggle with Light/Dark Mode
    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-theme");
            themeIcon.classList.replace("ri-sun-line", "ri-moon-line");
        } else {
            body.classList.remove("dark-theme");
            themeIcon.classList.replace("ri-moon-line", "ri-sun-line");
        }
    }

    // ✅ Ensure elements exist before using them
    if (themeToggle && themeIcon) {
        // Load theme from localStorage (Default: Light Mode)
        const savedTheme = localStorage.getItem("theme") || "light";
        applyTheme(savedTheme);

        themeToggle.addEventListener("click", () => {
            const newTheme = body.classList.contains("dark-theme") ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    } else {
        console.error("Theme Toggle elements not found.");
    }
});
