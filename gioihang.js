document.addEventListener("DOMContentLoaded", function () {
  const selectProdcut = localStorage.getItem("prodcutIn4");

  if (selectProdcut) {
    const product = JSON.parse(selectProdcut);
    const table = document
      .getElementById("cart-table")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    newRow.className = "cart-item";
    var toalPrice = 0;
    var discount = Number(product.price) * 0.2;
    toalPrice = Number(toalPrice) + (Number(product.price) - discount);
    var proPrice = Number(toalPrice);
   
    newRow.innerHTML = `
        <td><img src="${product.img}"
        class="product-image"/></td>
        <td class="product-name">${product.name}</td>
        <td class="product-quantity">${product.amount}</td>
        <td class="product-price">${product.price} VND</td>
        <td class="product-discount">${discount} VND</td>
        <td class="product-total">${toalPrice} VND</td>`;
  }

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
    const home = document.getElementById("home-delivery");
    const store = document.getElementById("store-pickup");
    const shipHome = document.getElementById("shipping-feeHome").innerText;
    const shipStore = document.getElementById("shipping-feeStore").innerText;
    const subTotal = document.querySelector(".subtotal");
    const grandTotal = document.querySelector(".grand-total");
    const subTotalS = document.querySelector(".subtotalStore");
    const grandTotalS = document.querySelector(".grand-totals");

    const priceProduct = document.getElementById("priceProduct")
    const shipPrice = document.getElementById("shipPrice")
    const toalSum = document.getElementById("toalSum")
    var ship = 0
      
    var toal = 0 ;
    
 
    
    if (homeDeliveryRadio.checked) {
      addressGroup.style.display = "block";
      homeDeliveryTotal.style.display = "block";
      storePickupTotal.style.display = "none";
      toal = toalPrice + Number(shipHome);
      subTotal.textContent = proPrice ;
      grandTotal.textContent = toal;
      ship = 20000
    } 
    else if (storePickupRadio.checked) {
      addressGroup.style.display = "none";
      homeDeliveryTotal.style.display = "none";
      storePickupTotal.style.display = "block";
      subTotalS.textContent = proPrice;
      grandTotalS.textContent = toalPrice;
      ship = 0
    }
 
    toalSum.innerText = toalPrice;
    shipPrice.innerText = ship
    priceProduct.innerText = proPrice

  }

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
    alert("Cảm ơn bạn đã đặt hàng.");
    window.location.href = "Checkout.html";
    shippingForm.reset();
    
  }



  const getLocation = document.getElementById("getLocation")
  const address =  document.getElementById("address")
  var x = null

  getLocation.addEventListener('click' ,getCurLocation)

  function getCurLocation() {

    getLocation.disabled = true

    navigator.geolocation.getCurrentPosition(showPosition,showError)

    address.value = x
    
  }
  function showPosition(position) {
             x = "Vĩ độ: " + position.coords.latitude + "Kinh độ: " + position.coords.longitude;
             getLocation.disabled = false
        }
        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.")
                    break;
                case error.TIMEOUT:
                      alert("The request to get user location timed out.")
                    break;
                case error.UNKNOWN_ERROR:
                     alert("An unknown error occurred.")
                    break;
            }
        }
  updateShippingMethod();

  window.addEventListener('unload', function() {
    localStorage.clear();
});
});
