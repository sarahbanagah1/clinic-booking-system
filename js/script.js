document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. إنشاء حساب جديد
    // ==========================================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (!name || !email || !password || !confirmPassword) {
                alert("الرجاء تعبئة جميع الحقول");
                return;
            }

            if (password !== confirmPassword) {
                alert("كلمتا المرور غير متطابقتين");
                return;
            }

            localStorage.setItem("clinicUserName", name);
            localStorage.setItem("clinicUserEmail", email);
            localStorage.setItem("clinicUserPassword", password);
            localStorage.setItem("clinicAccountCreated", "true");

            window.location.href = "index.html";
        });
    }


    // ==========================================
    // 2. تسجيل الدخول
    // ==========================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            if (!email || !password) {
                alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
                return;
            }

            const savedEmail = localStorage.getItem("clinicUserEmail");
            const savedPassword = localStorage.getItem("clinicUserPassword");

            if (!savedEmail || !savedPassword) {
                alert("لا يوجد حساب مسجل. قم بإنشاء حساب جديد أولاً.");
                return;
            }

            if (email !== savedEmail || password !== savedPassword) {
                alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                return;
            }

            localStorage.setItem("clinicLoggedIn", "true");

            window.location.href = "home.html";
        });
    }


    // ==========================================
    // 3. تسجيل الخروج
    // ==========================================

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {

        const text = link.textContent.trim();

        if (text.includes("خروج")) {

            link.addEventListener("click", function (event) {

                event.preventDefault();

                localStorage.removeItem("clinicLoggedIn");

                window.location.href = "index.html";
            });
        }
    });


    // ==========================================
    // 4. حجز موعد
    // ==========================================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const patientName = document.getElementById("patientName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const department = document.getElementById("department").value;
            const appointmentDate = document.getElementById("appointmentDate").value;
            const appointmentTime = document.getElementById("appointmentTime").value;
            const notes = document.getElementById("notes").value.trim();

            if (
                !patientName ||
                !phone ||
                !email ||
                !department ||
                !appointmentDate ||
                !appointmentTime
            ) {
                alert("الرجاء تعبئة جميع بيانات الحجز");
                return;
            }

            const booking = {
                patientName: patientName,
                phone: phone,
                email: email,
                department: department,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime,
                notes: notes
            };

            localStorage.setItem(
                "clinicBooking",
                JSON.stringify(booking)
            );

            alert(
                "تم حجز الموعد بنجاح\n" +
                "المريض: " + patientName + "\n" +
                "التاريخ: " + appointmentDate + "\n" +
                "الوقت: " + appointmentTime
            );

            bookingForm.reset();
        });
    }


    // ==========================================
    // 5. نموذج تواصل معنا
    // ==========================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("الرجاء تعبئة جميع بيانات الرسالة");
                return;
            }

            const contactMessage = {
                name: name,
                email: email,
                message: message
            };

            localStorage.setItem(
                "clinicContactMessage",
                JSON.stringify(contactMessage)
            );

            alert("تم إرسال رسالتك بنجاح");

            contactForm.reset();
        });
    }

});
