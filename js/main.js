let productNameInp = document.getElementById("productNameInp");
let productPriceInp = document.getElementById("productPriceInp");
let produceCategoryInp = document.getElementById("produceCategoryInp");
let produceDescInp = document.getElementById("produceDescInp");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");
let btnDeleteAll = document.getElementById("btnDeleteAll");
let disData  =document.getElementById("disData")
let showDel = document.querySelector(".showDel");

let allProduct;
let updateIndex = -1; 


// save localStorage 
if (localStorage.getItem("products") != null) {
    allProduct= JSON.parse(localStorage.getItem("products"));
    displayProduct(allProduct);
}else{
    allProduct = []
}

// Add Products
function addProduct() {

  if (validateProductName() == true && validateProductPrice() == true)  {
    let product = {
      name: productNameInp.value,
      price: productPriceInp.value,
      category: produceCategoryInp.value,
      description: produceDescInp.value,
    };
    
    allProduct.push(product);
    localStorage.setItem("products", JSON.stringify(allProduct))
    clearProducts();
    displayProduct(allProduct);

  }else{
    alert("Product inValid")
  }

}

// clear Products 
function clearProducts() {
  productNameInp.value = "";
  productPriceInp.value = "";
  produceCategoryInp.value = "";
  produceDescInp.value = "";
}

// display Products 
function displayProduct(list) {
  let box = ``;
  for (let i = 0; i < list.length; i++) {
    box += `
        <tr>
                <td>${i+1}</td>
                <td>${list[i].name}</td>
                <td>${list[i].price}</td>
                <td>${list[i].category}</td>
                <td>${list[i].description}</td>
                <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
        `;
        
        
        
  }
  disData.innerHTML = box;

  if (list.length > 0 ){
    btnDeleteAll.classList.add("d-block") ;
    showDel.innerHTML = `( ${allProduct.length} )`;
  }else{
    btnDeleteAll.classList.replace("d-block","d-none");
  }
  
}

// Search product
function searchProduct(searchItem){

  let searchTerms=[]
  for (let i=0; i< allProduct.length;i++){
    if(allProduct[i].name.toLowerCase().includes(searchItem.toLowerCase())){
      searchTerms.push(allProduct[i])
    }
  }
  displayProduct(searchTerms)
  
}

// Delete Product
function deleteProduct(i){
  allProduct.splice(i,1);
  localStorage.setItem("products", JSON.stringify(allProduct));
  displayProduct(allProduct);
}

// Update product
function updateProduct(i){
  updateIndex = i;
  productNameInp.value = allProduct[i].name;
  productPriceInp.value = allProduct[i].price;
  produceCategoryInp.value = allProduct[i].category;
  produceDescInp.value = allProduct[i].description;

  btnUpdate.classList.replace("d-none","d-inline-block");
  btnAdd.classList.add("d-none");
}

function saveUpdateProduct(){
  let product = {
    name: productNameInp.value,
    price: productPriceInp.value,
    category: produceCategoryInp.value,
    description: produceDescInp.value,
  };
  
  allProduct[updateIndex] = product;
  localStorage.setItem("products", JSON.stringify(allProduct));
  btnUpdate.classList.add("d-none");
  btnAdd.classList.remove("d-none");
  clearProducts();
  displayProduct(allProduct);
}


// Delete All Products
  function deleteAllProducts(){
    localStorage.clear();
    allProduct.splice(0);
    displayProduct(allProduct);
  }


// validate
function validateProductName(){
  let regex = /^[A-Z][a-z]{0,}$/;

  if (regex.test(productNameInp.value)== true){
    productNameInp.classList.replace("is-invalid","is-valid")
    return true;
}else{
  productNameInp.classList.add("is-invalid")
  return false;
}
}

function validateProductPrice(){
  let regex = /[^0][^A-Z][^a-z]{0,}$/;
  if (regex.test(productPriceInp.value)== true){
    productPriceInp.classList.replace("is-invalid","is-valid")
    return true;
}else{
  productPriceInp.classList.add("is-invalid")
  return false;
}
}


