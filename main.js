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

const productPopup1 = document.getElementById("productPopup1");
const productPopup2 = document.getElementById("productPopup2");
const productPopup3 = document.getElementById("productPopup3");
const productPopup4 = document.getElementById("productPopup4");
const productPopup5 = document.getElementById("productPopup5");
const productPopup6 = document.getElementById("productPopup6");

const iconContainer = document.getElementsByClassName("iconContainer");

productPopup1.addEventListener("mouseover", () => {
    iconContainer[0].style.opacity = "1";
    iconContainer[0].style.backgroundColor = "#72727240";
    iconContainer[0].style.borderRadius = "5px";
    iconContainer[0].style.padding = "5px";
    iconContainer[0].style.pointerEvents = "auto";
});

productPopup1.addEventListener("mouseout", () => {
    iconContainer[0].style.opacity = "0";
    iconContainer[0].style.pointerEvents = "none";
});

productPopup2.addEventListener("mouseover", () => {
    iconContainer[1].style.opacity = "1";
    iconContainer[1].style.backgroundColor = "#72727240";
    iconContainer[1].style.borderRadius = "5px";
    iconContainer[1].style.padding = "5px";
    iconContainer[1].style.pointerEvents = "auto";
});

productPopup2.addEventListener("mouseout", () => {
    iconContainer[1].style.opacity = "0";
    iconContainer[1].style.pointerEvents = "none";
});

productPopup3.addEventListener("mouseover", () => {
    iconContainer[2].style.opacity = "1";
    iconContainer[2].style.backgroundColor = "#72727240";
    iconContainer[2].style.borderRadius = "5px";
    iconContainer[2].style.padding = "5px";
    iconContainer[2].style.pointerEvents = "auto";
});

productPopup3.addEventListener("mouseout", () => {
    iconContainer[2].style.opacity = "0";
    iconContainer[2].style.pointerEvents = "none";
});

productPopup4.addEventListener("mouseover", () => {
    iconContainer[3].style.opacity = "1";
    iconContainer[3].style.backgroundColor = "#72727240";
    iconContainer[3].style.borderRadius = "5px";
    iconContainer[3].style.padding = "5px";
    iconContainer[3].style.pointerEvents = "auto";
});

productPopup4.addEventListener("mouseout", () => {
    iconContainer[3].style.opacity = "0";
    iconContainer[3].style.pointerEvents = "none";
});

productPopup5.addEventListener("mouseover", () => {
    iconContainer[4].style.opacity = "1";
    iconContainer[4].style.backgroundColor = "#72727240";
    iconContainer[4].style.borderRadius = "5px";
    iconContainer[4].style.padding = "5px";
    iconContainer[4].style.pointerEvents = "auto";
});

productPopup5.addEventListener("mouseout", () => {
    iconContainer[4].style.opacity = "0";
    iconContainer[4].style.pointerEvents = "none";
});

productPopup6.addEventListener("mouseover", () => {
    iconContainer[5].style.opacity = "1";
    iconContainer[5].style.backgroundColor = "#72727240";
    iconContainer[5].style.borderRadius = "5px";
    iconContainer[5].style.padding = "5px";
    iconContainer[5].style.pointerEvents = "auto";
});

productPopup6.addEventListener("mouseout", () => {
    iconContainer[5].style.opacity = "0";
    iconContainer[5].style.pointerEvents = "none";
});

let users = [];
document
    .querySelector("#registerModal form")
    .addEventListener("submit", function (e) {
        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const email = document.getElementById("email").value.trim();
        const modal = document.querySelector(".modal");

        if (!username || !password || !confirmPassword || !email) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            e.preventDefault();
            return;
        }
        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            e.preventDefault();
            return;
        }
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            e.preventDefault();
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Email không hợp lệ!");
            e.preventDefault();
            return;
        }

        users.push({
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
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === loginUsername && users[i].password === loginPassword) {
                    found = true;
                    alert("Đăng nhập thành công!");
                    document.getElementById("loginModal").style.display = "none";
                    break;
                } else if (users[i].username === loginUsername || users[i].password !== loginPassword) {
                    found = false;
                    alert("Mật khẩu không đúng!");
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

const TARGET_NUM_CUSTOMERS = 1023;
const TARGET_NUM_ORDERS = 741;
const TARGET_NUM_ONLINE = 84;

const counterCustomers = document.getElementById("counterCustomers");
const counterOrders = document.getElementById("counterOrders");
const counterOnline = document.getElementById("counterOnline");

let currentCustomers = 0;
let currentOrders = 0;
let currentOnline = 0;

const SPEED = 0.00001;

const countUpCustomers = setInterval(() => {
    currentCustomers++;
    counterCustomers.textContent = currentCustomers;
    if (currentCustomers == TARGET_NUM_CUSTOMERS) {
        clearInterval(countUpCustomers);
    }
}, SPEED / 100);

const countUpOrders = setInterval(() => {
    currentOrders++;
    counterOrders.textContent = currentOrders;
    if (currentOrders == TARGET_NUM_ORDERS) {
        clearInterval(countUpOrders);
    }
}, SPEED / 100);

const countUpOnline = setInterval(() => {
    currentOnline++;
    counterOnline.textContent = currentOnline;
    if (currentOnline == TARGET_NUM_ONLINE) {
        clearInterval(countUpOnline);
    }
}, SPEED + 0.1);

const videoPlayer = document.getElementById("videoPlayer");

const videoSources = [
    "video/all.mp4",
    "video/vivo.mp4",
    "video/Xiaomi.mp4",
    "video/Oppo.mp4",
    "video/ss s25 new.mp4",
    "video/invin.mp4",
];

videoPlayer.play();
let currentVideoIndex = 0;
videoPlayer.src = videoSources[currentVideoIndex];
videoPlayer.play();
videoPlayer.muted = false;
videoPlayer.play();

videoPlayer.addEventListener("ended", function () {
    currentVideoIndex++;
    if (currentVideoIndex >= videoSources.length) {
        currentVideoIndex = 0;
    }
    videoPlayer.src = videoSources[currentVideoIndex];
    videoPlayer.play();
});

const productCards = document.querySelectorAll(".productCard");

var productItems = [];

productCards.forEach((card, index) => {
    const productName = card.querySelector("h3").textContent;
    const productPrice = card.querySelector(".price").textContent;
    const productImg = card.querySelector("img");
    productItems.push({
        name: productName,
        price: productPrice,
        img: productImg.src
    });
});
console.log(productItems);