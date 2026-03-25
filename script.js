// SIGNUP
function signup() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;
    let confirmPass = document.getElementById("confirmPassword").value;

    if (!user || !pass || !confirmPass) {
        showError("All fields are required");
        return;
    }

    if (user.length < 3) {
        showError("Username must be at least 3 characters");
        return;
    }

    if (pass.length < 6) {
        showError("Password must be at least 6 characters");
        return;
    }

    if (pass !== confirmPass) {
        showError("Passwords do not match");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    showSuccess("Account created successfully!");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

// LOGIN
function login() {
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value;

    if (!user || !pass) {
        showError("Please fill in all fields");
        return;
    }

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (user === storedUser && pass === storedPass) {
        showSuccess("Login successful!");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        showError("Invalid username or password");
    }
}

// LOGOUT
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
}

// Show Success Message
function showSuccess(message) {
    showNotification(message, "success");
}

// Show Error Message
function showError(message) {
    showNotification(message, "error");
}

// Universal Notification Function
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles if not already in CSS
if (!document.querySelector('style[data-notification]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notification', 'true');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .notification.show {
            opacity: 1;
        }

        .notification.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .notification.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }

        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Form submission on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                login();
            }
        });
    }
});