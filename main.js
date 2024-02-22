//------------------[selectors]------------------
let title = document.getElementById("title");
let price = document.getElementById("price");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let inputs = document.getElementById("remove-on-print")
let printButton = document.querySelector(".print")
let searchInput = document.getElementById("search")
let btnSearch = document.querySelector(".btnSearch")
let tableContainer = document.querySelector(".table-container")
let uptateTh = document.getElementById("uptateTh")
let deleteTh = document.getElementById("deleteTh")
let crud = document.querySelector(".crud")
let mode = document.querySelector("button#mode")
let pragHead = document.querySelector(".head p")
let trinprint;
//-----------------------------------------------
let mood = "create";
let tmp;
// create product
let dataProducts;
if (localStorage.product != null) {
  dataProducts = JSON.parse(localStorage.product);
} else {
  dataProducts = [];
}

// add product data in localStorage;

submit.addEventListener("click", function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    count: count.value,
    category: category.value,
  };
  if(title.value != "" && category.value != ""){
    if(mood == "create"){
      if(newProduct.count > 1){
        // for(let i =0;i < newProduct.count; i++){
          dataProducts.push(newProduct);
        // }
      }else{
          dataProducts.push(newProduct);
          
        }
      }else{
      document.querySelector(".price input").style.flexBasis = "calc(98% / 2)"
      dataProducts[tmp]=newProduct
      submit.innerHTML = "تخزين"
      count.style.display = "block"
      mood = "create"
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(dataProducts));
  showData();
});

// clear inputs;

function clearInputs() {
  title.value = "";
  price.value = "";
  count.value = ""; 
  category.value = "";
}

// show data in table;

showData();
function showData() {
  let table = ``;
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
    <tr>
      <td class="td" id="td">${i + 1}</td>
      <td class="td" id ="td">${dataProducts[i].title}</td>
      <td class="td" id ="td">${dataProducts[i].price}</td>
      <td class="td" id ="td">${dataProducts[i].category}</td>
      <td class="td" id ="td">${dataProducts[i].count}</td>
      <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
      <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
    </tr>
      `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll")
  if(dataProducts.length > 0){
    btnDelete.innerHTML = `<button onclick="deleteAll()">حذف الكل [${dataProducts.length}]</button>`;
  }else{
    btnDelete.innerHTML = ``;
  }
  let tds = document.querySelectorAll("table tr td")
  tds.forEach((td)=>{
    if(td.innerHTML == ""){
      td.innerHTML = "غير معرف"
    }
  })
}

// delete ;
function deleteData(i) {
  dataProducts.splice(i, 1);
  localStorage.product = JSON.stringify(dataProducts);
  showData()
}

function deleteAll(){
  let AdminPassword;
  let confirm = window.confirm("احفظ المنتجات بصيغة pdf")
  if(confirm == true){
    printProducts()
    AdminPassword = window.prompt("ادخل الرقم السري :");
    if(AdminPassword == 111 ){
      localStorage.clear()
      dataProducts.splice(0)
      showData()
    }
  }
  location.reload()
}

function updateData(i){
  submit.innerHTML = "تحديث"
  title.value = dataProducts[i].title;
  price.value = dataProducts[ i ].price;
  count.value = dataProducts[i].count 
  count.style.display ="none";
  category.value = dataProducts[i].category;
  mood = "update"
  tmp = i;
  price.style.flexBasis= "100%";
}

// search 

let searchMod ="title";
function getSearchMode(id){
  if(id == "searchTitle"){
    searchMod = "title";
    searchInput.placeholder = "البحث عن طريق الاسم"
    searchInput.style.display = "block"
    searchInput.focus()

  }else{
    searchMod = "category";
    searchInput.placeholder = "البحث عن طريق النوع"
    searchInput.style.display = "block"
    searchInput.focus()
  }
  // searchInput.value="";.
}

function searchData(value){
  let table =  ``
  if(searchMod == "title"){
    for(let i = 0; i < dataProducts.length ; i++){
      if(dataProducts[i].title.includes(value)){
        table += `
                  <tr>
                    <td class="td" id="td">${i}</td>
                    <td class="td" id ="td">${dataProducts[i].title}</td>
                    <td class="td" id ="td">${dataProducts[i].price}</td>
                    <td class="td" id ="td">${dataProducts[i].category}</td>
                    <td class="td" id ="td">${dataProducts[i].count}</td>
                    <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
                  </tr>
                    `;
      }
    }
  }else{
        for(let i = 0; i < dataProducts.length ; i++){
      if(dataProducts[i].category.toLowerCase().includes(value.toLowerCase())){
        table += `
                  <tr>
                    <td class="td" id="td">${i + 1}</td>
                    <td class="td" id ="td">${dataProducts[i].title}</td>
                    <td class="td" id ="td">${dataProducts[i].price}</td>
                    <td class="td" id ="td">${dataProducts[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
                  </tr>
                    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
  searchInput.onblur = function(){
    searchInput.style.display = "none"
  }
}

// search

printButton.addEventListener("click",function(){
  printProducts()
  location.reload()
} )

function printProducts(){
  mode.style.display = "none"
  crud.style.width = "100%"
  inputs.style.display = "none";
  searchInput.style.display = "none"
  btnSearch.style.display = "none"
  tableContainer.style.overflow = "inherit"
  if(document.getElementById("deleteAll")){
    document.getElementById("deleteAll").style.display = "none"
  }
  if(document.querySelectorAll("#update")){
      let updataButons =  document.querySelectorAll("#update")
        updataButons.forEach((updateButton)=>{
          updateButton.style.display = "none";
        })
    }
    if(document.querySelectorAll("#delete")){
      let deleteButons =  document.querySelectorAll("#delete")
        deleteButons.forEach((deleteButton)=>{
          deleteButton.style.display = "none";
        })
    }
  
  uptateTh.style.display = "none";
  deleteTh.style.display = "none";
  printButton.style.display = "none";
  trinprint = document.querySelectorAll("#td");
  trinprint.forEach((tr)=>{
    tr.style.border= "1px solid white";
    tr.style.padding = "10px";
  })


// 
  window.print()
// 
  // inputs.style.display = "block";
  // searchInput.style.display = "block"
  // btnSearch.style.display = "block"
  // tableContainer.style.overflow = "auto";
  // document.getElementById("deleteAll").style.display = "block"
  // let updataButons =  document.querySelectorAll("#update")
  // updataButons.forEach((updateButton)=>{
  //   updateButton.style.display = "block";
  // })
  // let deleteButons =  document.querySelectorAll("#delete")
  // deleteButons.forEach((deleteButton)=>{
  //   deleteButton.style.display = "block";
  // })
  //   uptateTh.style.display = "inline-block";
  //   deleteTh.style.display = "inline-block";
  //   uptateTh.style.width = "10px"
  // location.reload()
}
// )


// clock 

const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')

const days = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعه", "السبت"];
const months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اوكتوبر", "نوفمبر", "ديسمبر"];


let ampm;
function setTime() {
    const time = new Date();
    const year = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    ampm = hours >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, <span class="circle">${date}</span> - ${months[month]} - ${year}`
}
setTime()

setInterval(setTime, 1000)

function toggleMode(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}
let element;
// toggle dark mode automatic
toggleModeAuto()
function toggleModeAuto(){
  element = document.body;
  if(ampm == "AM"){
    element.classList.add("dark-mode");
  }else{
    element.classList.remove("dark-mode")
  }
}
printButton.style.color = "white";
