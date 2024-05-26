
const table = document.getElementById('table');
const Products = [
  { id: 1, name: 'Orange', price: 100 },
  { id: 2, name: 'Apple', price: 200 },
  { id: 3, name: 'Mango', price: 300 },
 
 
];

const cart = {};

Products.forEach(function (ele) {
  const tr = document.createElement('tr');
  const td_1 = document.createElement('td');
  const td_2 = document.createElement('td');
  const td_3 = document.createElement('td');

  td_1.innerText = ele.name;
  td_2.innerText = ele.price;
  td_3.innerHTML = `<button class='minus' data-id='${ele.id}'>-</button><span class='span-${ele.id}'>0</span><button class='plus' data-id='${ele.id}'>+</button>`;

  tr.appendChild(td_1);
  tr.appendChild(td_2);
  tr.appendChild(td_3);
  table.appendChild(tr);

  cart[ele.id] = 0;
});

table.addEventListener('click', function (e) {
  if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const span = document.querySelector(`.span-${id}`);

    if (e.target.classList.contains('plus')) {
      cart[id]++;
    } else if (e.target.classList.contains('minus')) {
      if (cart[id] > 0) {
        cart[id]--;
      }
    }
    span.innerText = cart[id];
    updateCart();
  }
});

// Initial setup
document.addEventListener('DOMContentLoaded', function () {
    updateCart();
  });
  
  function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalDiv = document.getElementById('total');
    const noProductDiv = document.createElement('div');
    

    cartItems.innerHTML = '';
    
    let total = 0;
    let hasProducts = false; 
    
    for (const id in cart) {
      if (cart[id] > 0) {
        hasProducts = true; 
        
        const product = Products.find(p => p.id == id);
        
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerText = `${product.name} = ${cart[id]} * ${product.price} = ${cart[id] * product.price}`;
        cartItems.appendChild(div);
        
        total += cart[id] * product.price;
      }
    }

    if (!hasProducts) {
      noProductDiv.innerText = 'No Product added to the cart';
      cartItems.appendChild(noProductDiv);
    }
    
    totalDiv.innerText = `Total: ${total}`;
  }
  