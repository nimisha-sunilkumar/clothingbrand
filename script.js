// --- Cart Data ---
let cartItems = [];

// --- Add to Cart ---
function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  updateCartUI();
}

// --- Remove from Cart ---
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

// --- Update Cart UI ---
function updateCartUI() {
  const cartList = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalElement = document.getElementById("cart-total");
  cartList.innerHTML = "";

  let total = 0;
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.background = "#ff5c5c";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.cursor = "pointer";
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);

    cartList.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cartItems.length;
  totalElement.textContent = "Total: ₹" + total;

  document.getElementById("payment-section").style.display = cartItems.length > 0 ? "block" : "none";
}

// --- Place Order ---
function placeOrder() {
  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;
  const address = document.getElementById("customer-address").value;

  if (!name || !phone || !address) {
    alert("Please fill all your details!");
    return;
  }

  const paymentOptions = document.getElementsByName("payment");
  let selectedOption = "";
  for (const option of paymentOptions) {
    if (option.checked) {
      selectedOption = option.value;
      break;
    }
  }

  if (!selectedOption) {
    alert("Please select a payment option!");
    return;
  }

  if (selectedOption === "Razorpay") {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const options = {
      key: "rzp_test_1234567890abcdef", // Replace with real key
      amount: total * 100,
      currency: "INR",
      name: "Style Aura",
      description: "Clothing Order",
      handler: function (response) {
        alert("Payment Successful! Razorpay ID: " + response.razorpay_payment_id);
        confirmOrder();
      },
      prefill: {
        name: name,
        contact: phone
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } else {
    confirmOrder();
  }
}

// --- Confirm Order ---
function confirmOrder() {
  const confirmationBox = document.getElementById("order-confirmation");
  confirmationBox.style.display = "block";
  confirmationBox.textContent = "🎉 Order placed successfully! Thank you for shopping with Style Aura.";

  document.getElementById("payment-section").style.display = "none";
  document.getElementById("cart-items").innerHTML = "";
  document.getElementById("cart-count").textContent = "0";
  document.getElementById("cart-total").textContent = "Total: ₹0";
  cartItems = [];
}

// --- Toggle Sections ---
document.addEventListener("DOMContentLoaded", () => {
  const mensCategory = document.getElementById("mens-category");
  const mensSubcategories = document.getElementById("mens-subcategories");

  if (mensCategory && mensSubcategories) {
    mensCategory.addEventListener("click", () => {
      mensSubcategories.style.display =
        mensSubcategories.style.display === "none" || mensSubcategories.style.display === ""
          ? "flex"
          : "none";
    });
  }

  const womensCategory = document.getElementById("womens-category");
  const womensSubcategories = document.getElementById("womens-subcategories");

  if (womensCategory && womensSubcategories) {
    womensCategory.addEventListener("click", () => {
      womensSubcategories.style.display =
        womensSubcategories.style.display === "none" || womensSubcategories.style.display === ""
          ? "flex"
          : "none";
    });
  }

  const kidsCategory = document.getElementById("kids-category");
  const kidsSubcategories = document.getElementById("kids-subcategories");

  if (kidsCategory && kidsSubcategories) {
    kidsCategory.addEventListener("click", () => {
      kidsSubcategories.style.display =
        kidsSubcategories.style.display === "none" || kidsSubcategories.style.display === ""
          ? "flex"
          : "none";
    });
  }
});