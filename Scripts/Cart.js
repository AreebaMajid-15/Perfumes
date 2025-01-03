
import { baseURL } from "./Baseurl.js";


/// to display todo data
getTodo();
async function getTodo() {
  try {
    let res = await fetch(`${baseURL}/PerfumeCart`);
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
    parent.setAttribute("class", "Cart-perf-card");

    let Image = document.createElement("img");
    Image.src =  `${el.Image}`;
    parent.appendChild(Image)

    let Title = document.createElement("h4");
    Title.textContent = ` Title: ${el.Title}`;
    parent.appendChild(Title)


   let price = document.createElement("h5");
   price.textContent = `${el.Price}`;
   parent.appendChild(price)


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

    //to delete item from cart 
     let DeleteBtn = document.createElement("button");
     DeleteBtn.setAttribute("id" , "DeleteBtn")
    DeleteBtn.textContent = "Remove Product";

    DeleteBtn.addEventListener("click", function () {
     DeleteTodofun(el, i);
      });

    parent.append(Image, Title, price, DeleteBtn );
    cont.append(parent);
  });
}
window.onload = async () => {
  let arr = await getTodo();
  displayTodo(arr);
};

// to delete item
function DeleteTodofun(el, i) {
  let deleteID = el.id;
  fetch(`${baseURL}/PerfumeCart/${deleteID}`, {
    method: "DELETE",
  })
    .then(() => {
      alert("Product Removed From Cart");
      window.location.reload();
    })
    .catch((err) => {
      alert("Something went wrong in removing item");
      console.log(err);
    });
}
