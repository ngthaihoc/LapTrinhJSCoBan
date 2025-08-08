document.addEventListener('DOMContentLoaded', function() {

    const selectProdcut = localStorage.getItem('prodcutIn4')

    if (selectProdcut){
        const product = JSON.parse(selectProdcut)
        const table = document.getElementById('cart-table').getElementsByTagName('tbody')[0]
        const newRow = table.insertRow();
        newRow.className= 'cart-item'
        newRow.innerHTML = `
        <td><img src="${product.img}"
        class="product-image"/></td>
        <td class="product-name">${product.name}</td>
        <td class="product-quantity">${product.amount}</td>
        <td class="product-price">${product.price}</td>
        <td class="product-discount">-20% (6.400.000 VND)</td>
        <td class="product-total">${product.price}</td>`
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    const shippingForm = document.getElementById('shipping-info-form');
    const addressGroup = document.getElementById('address-group');
    const homeDeliveryRadio = document.getElementById('home-delivery');
    const storePickupRadio = document.getElementById('store-pickup');
    const homeDeliveryTotal = document.getElementById('home-delivery-total');
    const storePickupTotal = document.getElementById('store-pickup-total');

    homeDeliveryRadio.addEventListener('change', updateShippingMethod);
    storePickupRadio.addEventListener('change', updateShippingMethod);
    

    checkoutBtn.addEventListener('click', validate);
    

    function updateShippingMethod() {
        if (homeDeliveryRadio.checked) {
            addressGroup.style.display = 'block';
            homeDeliveryTotal.style.display = 'block';
            storePickupTotal.style.display = 'none';
        } else {
            addressGroup.style.display = 'none';
            homeDeliveryTotal.style.display = 'none';
            storePickupTotal.style.display = 'block';
        } 
    }
    

    function validate(event) {
        event.preventDefault();
        
        const name = document.getElementById('full-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const notes = document.getElementById('notes').value.trim();
        const isHomeDelivery = homeDeliveryRadio.checked;
        
  
        if (!name) {
            alert('Vui lòng nhập họ và tên');
            return;
        }
        
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
            alert('Tên không hợp lệ. Vui lòng nhập lại.');
            return;
        }
        
        if (!phone) {
            alert('Vui lòng nhập số điện thoại');
            return;
        }
        
        if (!/^(0[0-9]{9,10})$/.test(phone)) {
            alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
            return;
        }
        

        if (isHomeDelivery) {
            if (!address) {
                alert('Vui lòng nhập địa chỉ giao hàng');
                return;
            }
            
            if (address.length < 10 || address.length > 100) {
                alert('Địa chỉ phải từ 10 đến 100 ký tự');
                return;
            }
        } else {
            if (address) {
                alert('Địa chỉ không cần nhập nếu bạn nhận tại cửa hàng');
                return;
            }
        }
        
        if (notes.length > 200) {
            alert('Ghi chú không được quá 200 ký tự');
            return;
        }
        

        alert('Cảm ơn bạn đã đặt hàng.');
        shippingForm.reset();
        window.location.href = 'Checkout.html';
    }
    
 
    updateShippingMethod();
});



