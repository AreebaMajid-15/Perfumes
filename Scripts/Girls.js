
import { baseURL } from "./Baseurl.js";


// tocheck iflogin

window.onload = function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
      alert("Please login to access this page.");
      window.location.href = "Login.html"; // Redirect to login page
  }
}


function AddtocartFun(Cartobj){
    console.log(Cartobj)
    console.log("worjk")
    fetch(`${baseURL}/PerfumeCart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body:JSON.stringify(Cartobj),
    })
      .then(() => {
        alert("Item Added in Cart");
      })
      .catch((err) => {
        alert("something went wrong in adding item to cart");
        console.log(err);
      });
  }
   


/// to display todo data
getTodo();
async function getTodo() {
  try {
    let res = await fetch(`${baseURL}/PerfumeGirl`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert("something went wrong in displaying Girl Perfume items");
  }
}

function displayTodo(arr) {
  let cont = document.getElementById("Perf");
  cont.innerHTML = "";

  arr.map((el, i) => {
    let parent = document.createElement("div");
    parent.id = "parent"
    parent.setAttribute("class", "Girl-perf-card");

    let Image = document.createElement("img");
    Image.src =  `${el.Image}`;
    parent.appendChild(Image)

    let Title = document.createElement("h4");
    Title.textContent = ` Title: ${el.Title}`;
    parent.appendChild(Title)


   let price = document.createElement("h5");
   price.textContent = `${el.Price}`;
   parent.appendChild(price)

   let AddCart = document.createElement("button");
   AddCart.textContent = "Add To Cart";
   AddCart.setAttribute("id", "AddCartBtn")
   AddCart.addEventListener("click", function(){
      // to add item into cart
      AddtocartFun(el)

  })

   // let Deadline = document.createElement("h5");
   // Deadline.textContent = `Deadline: ${el.Deadline}`;

  //  let Priority = document.createElement("h5");
  //  Priority.textContent = `Priority: ${el.Priority}`;

  //  let status = document.createElement("h4");
  //  status.textContent =
   //   el.status == true ? "Status - Completed" : "Status - Pending";
   // console.log(el.status);

  //  let UpdateStatusBtn = document.createElement("button");
  //  UpdateStatusBtn.textContent = "Togle Satus";

   // UpdateStatusBtn.addEventListener("click", function () {
   //   updateStatusfun(el, i);
   // });

    //to delete todo
   // let DeleteBtn = document.createElement("button");
   // DeleteBtn.textContent = "Delete Todo";

   // DeleteBtn.addEventListener("click", function () {
   //   DeleteTodofun(el, i);
   // });

    parent.append(Image, Title, price, AddCart);
    cont.append(parent);
  });
}
window.onload = async () => {
  let arr = await getTodo();
  displayTodo(arr);
};


let  Viewcart = document.getElementById("ViewCart")
Viewcart.addEventListener("click", function(){
    window.location.href = "Cart.html"
})

