function toggleIcon(btn) {
    btn.classList.toggle("active");

    if (btn.classList.contains("heart")) {
        alert("Bạn đã " + (btn.classList.contains("active") ? "tym" : "bỏ tym"));
    }
    else if (btn.classList.contains("cart")) {
        alert("Bạn đã " + 
            (btn.classList.contains("active") 
                ? "thêm vào giỏ hàng" 
                : "xóa khỏi giỏ hàng"));
    } 
    else if (btn.classList.contains("like")) {
        alert("Bạn đã " + (btn.classList.contains("active") ? "like" : "bỏ like"));
    }
    else if (btn.classList.contains("open")) {
        alert("Bạn đã " + (btn.classList.contains("active") ? "tương tác:3" : "bỏ tương tác :<"));
    }
  

    const icon = btn.querySelector("i");
    if (btn.classList.contains("heart")) {
        if (btn.classList.contains("active")) {
            icon.classList.replace("fa-heart", "fa-heart-crack");
        } else {
            icon.classList.replace("fa-heart-crack", "fa-heart");
        }
    }
    
}


const productCardss = document.querySelectorAll(".productCard");

productCardss.forEach((card, index) => {
    const popup = card.querySelector(".productPopup");
    const iconContainer = card.querySelector(".iconContainer");
    
    card.addEventListener("mouseenter", () => {
        iconContainer.style.opacity = "1";
        iconContainer.style.pointerEvents = "auto";
    });
    
    card.addEventListener("mouseleave", () => {
        iconContainer.style.opacity = "0";
        iconContainer.style.pointerEvents = "none";
    });
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
      email: email,
    });

    alert("Đăng ký thành công!");
    document.getElementById("registerModal").style.display = "none";
    e.preventDefault();

    document
      .querySelector("#loginModal form")
      .addEventListener("submit", function (e) {
        const loginUsername = document
          .getElementById("loginUsername")
          .value.trim();
        const loginPassword = document
          .getElementById("loginPassword")
          .value.trim();
        if (!loginUsername || !loginPassword) {
          alert("Vui lòng nhập đầy đủ thông tin!");
          e.preventDefault();
          return;
        }
        let found = false;
        for (let i = 0; i < users.length; i++) {
          if (
            users[i].username === loginUsername &&
            users[i].password === loginPassword
          ) {
            found = true;
            alert("Đăng nhập thành công!");
            document.getElementById("loginModal").style.display = "none";
            break;
          } else if (
            users[i].username === loginUsername ||
            users[i].password !== loginPassword
          ) {
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
]

var currentVideoIndex = 0;
videoPlayer.muted = true;
videoPlayer.play();
videoPlayer.muted = false;
videoPlayer.play();
videoPlayer.muted = false;
videoPlayer.play();

function changeVideo(newIndex) {
  currentVideoIndex = newIndex;
  videoPlayer.src = videoSources[currentVideoIndex];
  videoPlayer.play();

  videoPlayer.onended = function () {
    changeVideo((currentVideoIndex + 1) % videoSources.length);
  };
}

changeVideo(0);

document
  .getElementById("firstVideo")
  .addEventListener("click", () => changeVideo(0));
document
  .getElementById("prevVideo")
  .addEventListener("click", () =>
    changeVideo(
      (currentVideoIndex - 1 + videoSources.length) % videoSources.length
    )
  );
document
  .getElementById("nextVideo")
  .addEventListener("click", () =>
    changeVideo((currentVideoIndex + 1) % videoSources.length)
  );
document
  .getElementById("lastVideo")
  .addEventListener("click", () => changeVideo(videoSources.length - 1));

const productCards = document.querySelectorAll(".productCard");

var productItems = [];

productCards.forEach((card, index) => {
  const productName = card.querySelector("h3").textContent;
  const productPrice = card.querySelector(".price").textContent;
  const productImg = card.querySelector("img");
  productItems.push({
    name: productName,
    price: productPrice,
    img: productImg.src,
  });
});
console.log(productItems);

const login = document.getElementById("loginA");
const register = document.getElementById("registerA");

login.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
});
register.addEventListener("click", () => {
  document.getElementById("registerModal").style.display = "none";
});


document.querySelectorAll('.buyNow').forEach(button => {
    button.addEventListener('click', function(element) {
        element.preventDefault();

        const productName = this.getAttribute('name');
        const productPrice = this.getAttribute('price');
        const productImg = this.getAttribute('img');
        console.log(productName)
         console.log(productPrice)
          console.log(productImg)
        

        const prodcut = {
            name : productName,
            price : productPrice,
            img : productImg,
            amount : 1
        }

        localStorage.setItem('prodcutIn4', JSON.stringify(prodcut))

        window.location.href = 'GioHang.html'

    })
})