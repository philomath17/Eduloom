document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

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
        });
    }

    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

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
        });
    }

    // ---- New Modal Logic for Class Creation and Joining ----
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
        button.addEventListener("click", function () {
            closeModal(createClassModal);
            closeModal(joinClassModal);
            document.getElementById("createClassForm")?.reset();
            document.getElementById("joinClassForm")?.reset();
        });
    });

    if (document.getElementById("createClassForm")) {
        document.getElementById("createClassForm").addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Class Created!");
            closeModal(createClassModal);
        });
    }

    if (document.getElementById("joinClassForm")) {
        document.getElementById("joinClassForm").addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Joined Class!");
            closeModal(joinClassModal);
        });
    }
});
