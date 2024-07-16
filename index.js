const localData = [
    { id: 1, name: "Car 2000", price: 19.99, description: "A car that can fly" },
    { id: 2, name: "Car 2001", price: 29.99, description: "A car that can swim" },
    { id: 3, name: "Car 2002", price: 39.99, description: "A car that can fly and swim" },
    { id: 4, name: "Car 2003", price: 49.99, description: "A car that can fly, swim and drive" },
]

// Using for loop
function loadData() {
    let list = document.getElementById("list");
    for (i = 0; i < data.length; ++i) {
        let li = document.createElement('li');

        li.innerHTML = `
            <div id="${localData[i].id}">
                <h3>${localData[i].name}</h3>
                <p>${localData[i].description}</p>
                <p>${localData[i].price}</p>
            </div>
        `
        list.appendChild(li);
    }
}

// Using forEach
function loadDatav2() {
    updateList(localData);
    loadCart();
}

// Filter data using filter() method
function filterData() {
    var searchStr = document.getElementById("search_text");
    console.log("Input: " + searchStr.value)

    const filteredData = localData.filter((item) => {
        return item.name.includes(searchStr.value);
    });

    updateList(filteredData);
}

function processCupom() {
    var cupom = document.getElementById("cupom");
    console.log("Cupom: " + cupom.value)
    if (cupom.value === "BLACKFRIDAY") {
        addBlackFridayDiscount();
    } else {
        if (cupom.value === "") {
            alert("Por favor, insira um cupom");
        } else {
            alert("Cupom inválido");
        }
    }
}

// Map data using map() method to add discount
// spread operator to copy object
function addBlackFridayDiscount() {
    const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
    const updatedCartData = {
        last_update: Date.now(),
        items: cartData.items.map((item) => {
            return {
                ...item,
                price: item.price * 0.5
            }
        })
    }

    updateCartInfo(updatedCartData);

}

function updateList(data) {
    let list = document.getElementById("list");
    list.innerHTML = "";
    data.forEach((item) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div id="${item.id}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>${item.price}</p>

                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `
        list.appendChild(li);
    });
}

function loadCart() {
    let cartInfo = localStorage.getItem("cart");
    if (cartInfo !== null) {
        cartInfo = JSON.parse(cartInfo);
        updateCartInfo(cartInfo);
    } else {
        updateCartInfo({ items: [], last_update: Date.now() });
    }
}

// find() method
function addToCart(id) {
    const item = localData.find((item) => item.id === id);
    console.log("Add to cart: ", item);

    let cartInfo = localStorage.getItem("cart")
    if (cartInfo === null) {
        cartInfo = {
            items: [item],
            last_update: Date.now()
        }
        localStorage.setItem("cart", JSON.stringify(cartInfo));
    } else {
        cartInfo = JSON.parse(cartInfo);
        cartInfo.items.push(item);
        cartInfo.last_update = Date.now();
        localStorage.setItem("cart", JSON.stringify(cartInfo));
    }

    updateCartInfo(cartInfo);
}

function updateCartInfo(cartInfo) {
    console.log("Cart info: ", cartInfo);
    let cartInfoElement = document.getElementById("cart_info");

    const sum = cartInfo.items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0,
    ).toFixed(2);

    cartInfoElement.innerHTML = `Items in cart: ${cartInfo.items.length} - Total: ${sum} (Last update: ${new Date(cartInfo.last_update).toLocaleString()})`;
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCartInfo({ items: [], last_update: Date.now() });
}

function orderByPrice(desc) {
    let sortedData = localData.map(
        (item) => item
    );
    if (desc) {
        sortedData = sortedData.sort((a, b) => b.price - a.price);
    } else {
        sortedData = sortedData.sort((a, b) => a.price - b.price);
    }
    updateList(sortedData);
}