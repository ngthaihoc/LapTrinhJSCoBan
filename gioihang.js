// ==================== CART FUNCTIONALITY ====================
document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let toalPrice = 0;
    let proPrice = 0;


   function displayCart() {
    const table = document.getElementById("cart-table").getElementsByTagName("tbody")[0];
    const checkoutBtn = document.getElementById("checkout-btn");
    table.innerHTML = "";
    toalPrice = 0;
    proPrice = 0;


    if (cartItems.length === 0) {
        const emptyRow = table.insertRow();
        emptyRow.className = "empty-cart";
        emptyRow.innerHTML = `<td colspan="7">Giỏ hàng của bạn đang trống</td>`;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = "0.6";
        checkoutBtn.style.cursor = "not-allowed";
    } else {

        cartItems.forEach((product, index) => {
            const newRow = table.insertRow();
            newRow.className = "cart-item";
            const discount = Number(product.price) * 0.2;
            const itemTotal = (Number(product.price) - discount) * product.amount;
            toalPrice += itemTotal;
            proPrice += Number(product.price) * product.amount;

            newRow.innerHTML = `
                <td><img src="${product.img}" class="product-image"/></td>
                <td class="product-name">${product.name}</td>
                <td class="product-quantity">
                    <div class="quantity-controls">
                        <button class="add-btn minus" data-index="${index}">-</button>
                        <input type="text" class="quantity-input" value="${product.amount}" readonly>
                        <button class="add-btn plus" data-index="${index}">+</button>
                    </div>
                </td>
                <td class="product-price">${product.price} VND</td>
                <td class="product-discount">${discount} VND</td>
                <td class="product-total">${itemTotal} VND</td>
                <td><button class="delete-btn" data-index="${index}">Xoá</button></td>`;
        });

        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.cursor = "pointer";
    }

    updateTotals();
}

    const selectProduct = localStorage.getItem("prodcutIn4");
    if (selectProduct) {
        const product = JSON.parse(selectProduct);
        const existingItemIndex = cartItems.findIndex(item => item.name === product.name);
        
        if (existingItemIndex >= 0) {
            cartItems[existingItemIndex].amount += product.amount;
        } else {
            cartItems.push(product);
        }
        
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.removeItem("prodcutIn4");
    }

    
    document.getElementById("cart-table").addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            displayCart();
        }
        
        if (e.target.classList.contains("plus")) {
            const index = e.target.getAttribute("data-index");
            cartItems[index].amount++;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            displayCart();
        }
        
        if (e.target.classList.contains("minus")) {
            const index = e.target.getAttribute("data-index");
            if (cartItems[index].amount > 1) {
                cartItems[index].amount--;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                displayCart();
            }
        }
    });


    function updateTotals() {
        const home = document.getElementById("home-delivery");
        const store = document.getElementById("store-pickup");
        const shipHome = document.getElementById("shipping-feeHome").innerText;
        const shipStore = document.getElementById("shipping-feeStore").innerText;
        const subTotal = document.querySelector(".subtotal");
        const grandTotal = document.querySelector(".grand-total");
        const subTotalS = document.querySelector(".subtotalStore");
        const grandTotalS = document.querySelector(".grand-totals");

        var ship = 0;
        var toal = 0;
        
        if (homeDeliveryRadio.checked) {
            toal = toalPrice + Number(shipHome);
            subTotal.textContent = proPrice;
            grandTotal.textContent = toal;
            ship = 20000;
        } 
        else if (storePickupRadio.checked) {
            subTotalS.textContent = proPrice;
            grandTotalS.textContent = toalPrice;
            ship = 0;
        }
    }

    // ==================== SHIPPING METHOD ====================
    const checkoutBtn = document.getElementById("checkout-btn");
    const shippingForm = document.getElementById("shipping-info-form");
    const addressGroup = document.getElementById("address-group");
    const homeDeliveryRadio = document.getElementById("home-delivery");
    const storePickupRadio = document.getElementById("store-pickup");
    const homeDeliveryTotal = document.getElementById("home-delivery-total");
    const storePickupTotal = document.getElementById("store-pickup-total");

    homeDeliveryRadio.addEventListener("change", updateShippingMethod);
    storePickupRadio.addEventListener("change", updateShippingMethod);

    checkoutBtn.addEventListener("click", validate);

    function updateShippingMethod() {
        if (homeDeliveryRadio.checked) {
            addressGroup.style.display = "block";
            homeDeliveryTotal.style.display = "block";
            storePickupTotal.style.display = "none";
        } 
        else if (storePickupRadio.checked) {
            addressGroup.style.display = "none";
            homeDeliveryTotal.style.display = "none";
            storePickupTotal.style.display = "block";
        }
        updateTotals();
    }

    // ==================== FORM VALIDATION ====================
    function validate(event) {
        event.preventDefault();

        const name = document.getElementById("full-name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const notes = document.getElementById("notes").value.trim();
        const isHomeDelivery = homeDeliveryRadio.checked;

        if (!name) {
            alert("Vui lòng nhập họ và tên");
            return;
        }
        
        if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
            alert("Tên không hợp lệ. Vui lòng nhập lại.");
            return;
        }

        if (!phone) {
            alert("Vui lòng nhập số điện thoại");
            return;
        }

        if (!/^(0[0-9]{9,10})$/.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
            return;
        }

        if (isHomeDelivery) {
            if (!address) {
                alert("Vui lòng nhập địa chỉ giao hàng");
                return;
            }

            if (address.length < 10 || address.length > 100) {
                alert("Địa chỉ phải từ 10 đến 100 ký tự");
                return;
            }
        } else {
            if (address) {
                alert("Địa chỉ không cần nhập nếu bạn nhận tại cửa hàng");
                return;
            }
        }

        if (notes.length > 200) {
            alert("Ghi chú không được quá 200 ký tự");
            return;
        }
        

        const orderInfo = {
            items: cartItems,
            shipping: homeDeliveryRadio.checked ? "Giao tận nhà" : "Nhận tại cửa hàng",
            total: homeDeliveryRadio.checked ? toalPrice + 20000 : toalPrice,
            customerInfo: { name, phone, address, notes }
        };
        localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
        
        alert("Cảm ơn bạn đã đặt hàng.");
        window.location.href = "Checkout.html";
    }

    // ==================== LOCATION SERVICES ====================
    const getLocation = document.getElementById("getLocation");
    const addressInput = document.getElementById("address");
    var x = null;

    getLocation.addEventListener('click', getCurLocation);

    function getCurLocation() {
        getLocation.disabled = true;
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        addressInput.value = x;
    }
    
    function showPosition(position) {
        x = "Vĩ độ: " + position.coords.latitude + " Kinh độ: " + position.coords.longitude;
        addressInput.value = x;
        getLocation.disabled = false;
    }
    
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
        getLocation.disabled = false;
    }


    displayCart();
    updateShippingMethod();


    window.addEventListener('unload', function() {
        // localStorage.clear(); // Bỏ comment nếu muốn xóa giỏ hàng khi đóng trang
    });
});