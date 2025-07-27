// Bật tắt icon
function toggleIcon(btn) {
    btn.classList.toggle("active");

    if (btn.classList.contains("heart")) {
        alert(
            "Bạn đã " + (btn.classList.contains("active") ? "thích" : "bỏ thích")
        );
    } else if (btn.classList.contains("cart")) {
        alert(
            "Bạn đã " +
            (btn.classList.contains("active")
                ? "thêm sản phẩm vào giỏ"
                : "xóa sản phẩm khỏi giỏ")
        );
    } else if (btn.classList.contains("like")) {
        alert(
            "Bạn đã " + (btn.classList.contains("active") ? "thích" : "bỏ thích")
        );
    }
}
// Hiển thị popup khi di chuột qua icon
const idk1 = document.getElementById("idk1");
const idk2 = document.getElementById("idk2");
const idk3 = document.getElementById("idk3");

const popup = document.getElementsByClassName("icon-container");

idk1.addEventListener("mouseover", () => {
    popup[0].style.opacity = "1";
    popup[0].style.backgroundColor = "#727272";
    popup[0].style.borderRadius = "5px";
    popup[0].style.padding = "5px";
    popup[0].style.pointerEvents = "auto";
});

idk1.addEventListener("mouseout", () => {
    popup[0].style.opacity = "0";
    popup[0].style.pointerEvents = "none";
});

idk2.addEventListener("mouseover", () => {
    popup[1].style.opacity = "1";
    popup[1].style.backgroundColor = "#727272";
    popup[1].style.borderRadius = "5px";
    popup[1].style.padding = "5px";
    popup[1].style.pointerEvents = "auto";
});

idk2.addEventListener("mouseout", () => {
    popup[1].style.opacity = "0";
    popup[1].style.pointerEvents = "none";
});

idk3.addEventListener("mouseover", () => {
    popup[2].style.opacity = "1";
    popup[2].style.backgroundColor = "#727272";
    popup[2].style.borderRadius = "5px";
    popup[2].style.padding = "5px";
    popup[2].style.pointerEvents = "auto";
});

idk3.addEventListener("mouseout", () => {
    popup[2].style.opacity = "0";
    popup[2].style.pointerEvents = "none";
});

idk4.addEventListener("mouseover", () => {
    popup[3].style.opacity = "1";
    popup[3].style.backgroundColor = "#727272";
    popup[3].style.borderRadius = "5px";
    popup[3].style.padding = "5px";
    popup[3].style.pointerEvents = "auto";
});

idk4.addEventListener("mouseout", () => {
    popup[3].style.opacity = "0";
    popup[3].style.pointerEvents = "none";
});

// Validate đăng ký

let user = [];
document
    .querySelector("#registerModal form")
    .addEventListener("submit", function (e) {
        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirm = document.getElementById("confirmPassword").value;
        const email = document.getElementById("email").value.trim();
        const modal = document.querySelector(".modal");
       
    

        if (!username || !password || !confirm || !email) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            e.preventDefault();
            return;
        }
        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            e.preventDefault();
            return;
        }
        if (password !== confirm) {
            alert("Mật khẩu xác nhận không khớp!");
            e.preventDefault();
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Email không hợp lệ!");
            e.preventDefault();
            return;
        }

        user.push({
            username: username,
            password: password,
            email: email
        });

        alert("Đăng ký thành công!");   
        document.getElementById("registerModal").style.display = "none";
         e.preventDefault();
       

        document.querySelector("#loginModal form").addEventListener("submit", function (e) {
            const loginUsername = document.getElementById("loginUsername").value.trim();
            const loginPassword = document.getElementById("loginPassword").value.trim();
            if (!loginUsername || !loginPassword) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                e.preventDefault();
                return;
                     }
          let found = false;
            for (let i = 0; i < user.length; i++) {
                if (user[i].username === loginUsername && user[i].password === loginPassword) {
                    found = true;
                    alert("Đăng nhập thành công!");
                    document.getElementById("loginModal").style.display = "none";
                    break;
                }
                else if (user[i].username === loginUsername || user[i].password !== loginPassword) {
                    found = false;
                    alert("mật khẩu không đúng!");
                    e.preventDefault();
                    return;
                }
            }
            if (!found) {
                alert("Tên đăng nhập hoặc mật khẩu không đúng!");
                return;
            }

            e.preventDefault();
        });
    });


// Tăng số liệu
const taretnum1 = 1023;

const taretnum2 = 741;

const taretnum3 = 84;

const counter1 = document.getElementById("counter1");
const counter2 = document.getElementById("counter2");
const counter3 = document.getElementById("counter3");

let cur1 = 0;
let cur2 = 0;
let cur3 = 0;

const speed = 0.00001;

const countUp = setInterval(() => {
    cur1++;
    counter1.textContent = cur1;
    if (cur1 == taretnum1) {
        clearInterval(countUp);
    }
}, speed / 100);

const countUp2 = setInterval(() => {
    cur2++;
    counter2.textContent = cur2;
    if (cur2 == taretnum2) {
        clearInterval(countUp2);
    }
}, speed / 100);

const countUp3 = setInterval(() => {
    cur3++;
    counter3.textContent = cur3;
    if (cur3 == taretnum3) {
        clearInterval(countUp3);
    }
}, speed + 0.1);



// Video
const video = document.getElementById("videoPlayer");

const vidSource = [
    "video/all.mp4",
    "video/Xiaomi.mp4",
    "video/vivo.mp4",
    "video/Oppo.mp4",
    "video/ss s25 new.mp4",
    "video/invin.mp4",
];

let currentIndex = 0;
video.src = vidSource[currentIndex];
video.play();
video.muted = false;
video.play();

video.addEventListener("ended", function () {
    currentIndex++;

    if (currentIndex >= vidSource.length) {
        currentIndex = 0;
    }
    video.src = vidSource[currentIndex];
    video.play();
});


