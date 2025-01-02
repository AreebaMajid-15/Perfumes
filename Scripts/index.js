import { baseURL } from "./Baseurl.js";



// to display todo data
getTodo();
async function getTodo() {
  try {
    let res = await fetch(`${baseURL}/PerfumeBestSel`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert("something went wrong in displaying todo");
  }
}

function displayTodo(arr) {
  let cont = document.getElementById("BestSeller");
  cont.innerHTML = "";

  arr.map((el, i) => {
    let parent = document.createElement("div");
    parent.id = "parent"
    parent.setAttribute("class", "todo-card");

    let Image = document.createElement("img");
    Image.textContent =  `${el.Image}`;
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

    //to delete todo
   // let DeleteBtn = document.createElement("button");
   // DeleteBtn.textContent = "Delete Todo";

   // DeleteBtn.addEventListener("click", function () {
   //   DeleteTodofun(el, i);
   // });

    parent.append(Title, Image, price);
    cont.append(parent);
  });
}
window.onload = async () => {
  let arr = await getTodo();
  displayTodo(arr);
};



 let viewallbtn = document.getElementById("ViewAll")
 viewallbtn.addEventListener("click", function(){
    window.location.href = "Luxury.html"
 })


 // for her and him btn 

 let HerBtn = document.getElementById("HerBtn")
 HerBtn.addEventListener("click", function(){
    window.location.href = "Girls.html"
 })

 let HimBtn = document.getElementById("HimBtn")
 HimBtn.addEventListener("click", function(){
    window.location.href = "Boys.html"
 })