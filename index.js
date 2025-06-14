document.addEventListener("DOMContentLoaded", () => {
    loadFiles();
    checkLoginStatus();
});

function loadFiles() {
    fetch("files.json")
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById("file-list");
            fileList.innerHTML = "";
            files.forEach(file => {
                const fileItem = document.createElement("div");
                fileItem.innerHTML = `<a href="uploads/${file.filename}" download>${file.filename}</a>`;
                fileList.appendChild(fileItem);
            });
        })
        .catch(error => console.error("خطأ في تحميل الملفات:", error));
}

function uploadFile() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!file) {
        alert("يرجى اختيار ملف!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(() => {
        alert("تم رفع الملف بنجاح!");
        loadFiles();
    })
    .catch(error => console.error("خطأ في رفع الملف:", error));
}

// تسجيل الدخول للمديرين
function login() {
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("admin-pass").value;

    fetch("users.json")
        .then(response => response.json())
        .then(users => {
            const foundUser = users.find(u => u.username === user && u.password === pass);
            if (foundUser) {
                alert("تم تسجيل الدخول بنجاح!");
                localStorage.setItem("isAdmin", "true");
                checkLoginStatus();
            } else {
                alert("خطأ في تسجيل الدخول! تأكد من اسم المستخدم وكلمة المرور.");
            }
        })
        .catch(error => console.error("خطأ في تسجيل الدخول:", error));
}

// إنشاء حساب جديد
function register() {
    const newUser = document.getElementById("new-user").value;
    const newPass = document.getElementById("new-pass").value;

    if (!newUser || !newPass) {
        alert("يرجى إدخال اسم مستخدم وكلمة مرور!");
        return;
    }

    fetch("users.json")
        .then(response => response.json())
        .then(users => {
            if (users.some(u => u.username === newUser)) {
                alert("اسم المستخدم موجود بالفعل!");
                return;
            }

            users.push({ username: newUser, password: newPass });
            fetch("save_users.php", {
                method: "POST",
                body: JSON.stringify(users),
                headers: { "Content-Type": "application/json" }
            })
            .then(() => {
                alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
                showLogin();
            })
            .catch(error => console.error("خطأ في إنشاء الحساب:", error));
        });
}

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
        document.getElementById("upload-box").style.display = "block";
        document.getElementById("login-box").style.display = "none";
        document.getElementById("register-box").style.display = "none";
    } else {
        document.getElementById("upload-box").style.display = "none";
    }
}

// تسجيل خروج المدير
function logout() {
    localStorage.removeItem("isAdmin");
    alert("تم تسجيل الخروج!");
    location.reload();
}

// إظهار نموذج تسجيل الحساب
function showRegister() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
}

// العودة إلى تسجيل الدخول
function showLogin() {
    document.getElementById("register-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}