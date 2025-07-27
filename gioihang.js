function validate(event) {
  event.preventDefault();

  const name = document.getElementById("full-name").value.trim();
  const phone = document.getElementById("phone");
  const address = document.getElementById("address").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const isHomeDelivery = document.getElementById("home-delivery").checked;
  const notHomeDelivery = document.getElementById("store-pickup").checked;

  if (isHomeDelivery) {
    if (name == "" || phone == "" || address == "") {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    const nameregx = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameregx.test(name)) {
      alert("Tên không hợp lệ. Vui lòng nhập lại.");
      name = "";
      return false;
    }
    const phoneregx = /^(0[0-9]{9,10})$/;
    if (!phoneregx.test(phone.value.trim())) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
      phone.value = "";
      return false;
    }
    if (address.length < 10 || address.length > 100) {
      alert("Địa chỉ không hợp lệ. Vui lòng nhập lại.");
      address = "";
      return false;
    }
    if (notes.length > 200) {
      alert("Ghi chú không được quá 200 ký tự.");
      notes.value = "";
      return false;
    }
  }
  if (notHomeDelivery) {
    if (name == "" || phone == "") {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    const nameregx = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameregx.test(name)) {
      alert("Tên không hợp lệ. Vui lòng nhập lại.");
      name = "";
      return false;
    }
    const phoneregx = /^(0[0-9]{9,10})$/;
    if (!phoneregx.test(phone.value.trim())) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
      phone.value = "";
      return false;
    }
    if (address.length != 0) {
      alert("Địa chỉ không cần nhập nếu bạn nhận tại cửa hàng.");
      address.value = "";
      return false;
    }
    if (notes.length > 200) {
      alert("Ghi chú không được quá 200 ký tự.");
      notes.value = "";
      return false;
    }
  }

  alert("Cảm ơn bạn đã đặt hàng.");
  document.getElementById("full-name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("notes").value = "";
  window.location.href = "Checkout.html";
  return true;
}
