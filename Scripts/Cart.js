import { baseURL } from "./Baseurl.js";

// Fetch cart items
async function getTodo() {
    try {
        let res = await fetch(`${baseURL}/PerfumeCart`);
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        alert("Something went wrong in displaying Girl Perfume items");
    }
}

// Display perfumes in the cart
function displayTodo(arr) {
    let cont = document.getElementById("Perf");
    cont.innerHTML = "";

    arr.map((el, i) => {
        let parent = document.createElement("div");
        parent.id = "parent";
        parent.setAttribute("class", "Cart-perf-card");

        let Image = document.createElement("img");
        Image.src = `${el.Image}`;
        parent.appendChild(Image);

        let Title = document.createElement("h4");
        Title.textContent = `Title: ${el.Title}`;
        parent.appendChild(Title);

        let price = document.createElement("h5");
        price.textContent = `${el.Price}`;
        parent.appendChild(price);

        // Delete button
        let DeleteBtn = document.createElement("button");
        DeleteBtn.setAttribute("id", "DeleteBtn");
        DeleteBtn.textContent = "Remove Product";

        DeleteBtn.addEventListener("click", async function () {
            await deleteItem(el.id);
            await refreshCart(); // Refresh cart after deleting
        });

        parent.appendChild(DeleteBtn);
        cont.appendChild(parent);
    });
}

// Delete item from cart
async function deleteItem(itemId) {
    try {
        await fetch(`${baseURL}/PerfumeCart/${itemId}`, { method: "DELETE" });
        alert("Product Removed From Cart");
    } catch (err) {
        alert("Something went wrong in removing item");
        console.error(err);
    }
}

// Update the order button based on cart content
function updateOrderButton(cartItems) {
    let orderButton = document.getElementById("orderButton");

    if (cartItems.length === 0) {
        orderButton.textContent = "Add items to cart";
        orderButton.onclick = null;  // No action if cart is empty
    } else {
        orderButton.textContent = "Place Order";
        orderButton.onclick = placeOrder;  // Attach place order event
    }
}

// Place order function (clears cart + popup)
async function placeOrder() {
    document.getElementById('popup').style.display = 'flex';

    // Clear all items from cart
    await clearCart();

    // Refresh cart display after placing order
    await refreshCart();
}

// Clear the whole cart
async function clearCart() {
    try {
        let cartItems = await getTodo();
        for (let item of cartItems) {
            await fetch(`${baseURL}/PerfumeCart/${item.id}`, { method: "DELETE" });
        }
        console.log("Cart cleared.");
    } catch (err) {
        console.error("Error clearing cart:", err);
        alert("Something went wrong while clearing the cart.");
    }
}

// Refresh the whole cart (get items, display items, update button)
async function refreshCart() {
    let cartItems = await getTodo();
    displayTodo(cartItems);
    updateOrderButton(cartItems);
}

// Close popup handler
document.getElementById('closeButton').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// On page load
window.onload = refreshCart;
