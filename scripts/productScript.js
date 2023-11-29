const list = document.querySelector('.listItems')

const apiUrl = `https://dummyjson.com/products`

  // ↓↓ GETING DATA FROM THE API AND CREATING AN ITEM FOR EACH RESPONSE ↓↓

fetch(apiUrl)
.then((response) => {
  return response.json()
})
.then(data => {
  return data.products
})
.then(data => {
    data.forEach((e) => {
      if(e.isDeleted === false) return
      const item = document.createElement(`div`)
      item.setAttribute('id', `${e.id}`)
      item.classList.add(`item`)
      item.innerHTML = `<img src='${e.images[0]}'  class="productImage"></img>
      <div class="title">${e.title}</div>
      <div class="description">${e.description}</div>
      <div class="price">US$ ${e.price}</div>
      <div class="brand">${e.brand}</div>
      <div class="category">${e.category}</div>
      <button onclick={removeItem(${e.id})} class='removeItem'></button>
      `
      list.appendChild(item)
    })
    
})

const removeItem = (id) => {
  fetch(`https://dummyjson.com/products/${id}`,{
    method: "DELETE"
  }).then(res => res.json())
  .then(e =>{
      const diference = 30 - list.children.length
    list.removeChild(list.children[e.id -1 -diference ])
  })
}

// ↓↓ CREATING A ITEM WITH EACH  INPUT VALUES ↓↓

let imageURL = ''

    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');

    imageInput.addEventListener('change', function () {
        const file = imageInput.files[0];
        const imageSpan = document.querySelector("#imageSpan")
        imageSpan.innerHTML = ' '

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                previewImage.src = e.target.result;
                imageURL = e.target.result
                previewImage.style.display = 'block';
            };

            reader.readAsDataURL(file);
        }
    })

const createProduct = () => { 
  const titleInput = document.querySelector('#titleInput').value
  const descriptionInput = document.querySelector('#descriptionInput').value
  const priceInput = document.querySelector('#priceInput').value
  const brandInput = document.querySelector('#brandInput').value
  const categoryInput = document.querySelector('#categoryInput').value
 

  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      images: imageURL,
      title: titleInput,
      description: descriptionInput,
      price: priceInput,
      brand: brandInput,
      category: categoryInput,
  })
})
  .then(res => res.json())
  .then( product => {
    const newProduct = document.createElement(`div`)
    newProduct.classList.add('item')
    
    newProduct.innerHTML = `
      <img src='${product.images}' class="productImage" />
      <div class="title">${product.title}</div>
      <div class="description">${product.description}</div>
      <div class="price">US$ ${product.price}</div>
      <div class="brand">${product.brand}</div>
      <div class="category">${product.category}</div>
      <button class='removeItem'></button>
      `
      list.appendChild(newProduct)
  }
    
  );
}

const btn = document.querySelector('#inputButton')

btn.onclick = function() {
  createProduct()
}