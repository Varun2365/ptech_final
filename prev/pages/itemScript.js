// localStorage.setItem("items","{}")
function addItemToCart(item){
    var select = document.getElementById("value");
    select = select.value;
    var qty = document.querySelector(".value");
    qty = qty.innerText;
    var btn = document.querySelector(".cta-buy");
    btn.style.backgroundColor = "#1f21a3";
    btn.innerText = "Added For Quotation";
    var itemJson = {
        q:qty,
        model:select,
        // price:ppi,
    }
    localStorage.setItem(item,JSON.stringify(itemJson));
    addItemToMain(item)
    console.log(localStorage)
};
function addItemToMain(item){
    var totalItems = localStorage.getItem("items");
    var everything = totalItems;
    totalItems = JSON.parse(totalItems);
    totalItems[item]="yes";
    localStorage.setItem("items",JSON.stringify(totalItems))
}

function updatePrice(v){
   p = document.querySelector('.v');
   p.innerText = v; 
}


value = document.querySelector(".value");
function minus(){
    if(value.innerText == 1){
        
    }
    else{

        value.innerText--;
    }
}
function plus(){
        value.innerText++;

}
let area = document.getElementById("renderArea");
function renderItem(renderObject){
    var ap = localStorage.getItem(renderObject);
    ap = JSON.parse(ap)
    var head = ap.model;
    var qty = ap.q;
    var totalPrice = qty*(ap.price)
    area.innerHTML += `
    <div class="product-card" id="${renderObject}">
        <div class="product-card-top ${renderObject}"></div>
        <div class="product-card-bottom">
            <h1 class="mainHeading">${head}</h1>
            <h2 class = "quantity">Quantity: ${qty}</h2>
            <button class="deleteItem" onclick=removeItemFromCart("${renderObject}")>Remove From Cart</button>
        </div>
    `
}
function removeItemFromCart(x) {
    // Retrieve the object from local storage
    var items = JSON.parse(localStorage.getItem("items"));

    // Check if the item with key 'x' exists in the object
    if (items && items.hasOwnProperty(x)) {
        // Remove the key from the object
        delete items[x];

        // Update the local storage with the modified object
        localStorage.setItem("items", JSON.stringify(items));

        // Remove the corresponding element from the DOM
        var item = document.getElementById(x);
        if (item) {
            item.remove();
        } else {
            console.log("Element with id " + x + " not found in the DOM.");
        }

        // Refresh the page
        location.reload();
    } else {
        console.log("Item with key " + x + " not found in the local storage.");
    }
}

