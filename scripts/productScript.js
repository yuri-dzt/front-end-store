const list = document.querySelector('.listItems')

const apiUrl = `https://dummyjson.com/products`


const deleteProduct = (id) => {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(e => {
    const diference = 30 - list.children.length
    list.removeChild(list.children[e.id -1 -diference])
  })
}

  // ↓↓ GETING DATA FROM THE API AND CREATING AN ITEM FOR EACH RESPONSE ↓↓

fetch(apiUrl)
.then((response) => {
  return response.json()
})
.then(data => {
  return data.products
})
.then(products => {
    products.forEach(product => {
      const item = document.createElement(`div`)
      item.classList.add(`item`)
      item.innerHTML = `<img src='${product.images[0]}'  class="productImage"></img>
      <div class="title">${product.title}</div>
      <div class="description">${product.description}</div>
      <div class="price">US$ ${product.price}</div>
      <div class="brand">${product.brand}</div>
      <div class="category">${product.category}</div>
      <button class='removeItem'></button>
      `
    
      list.appendChild(item)
    })
    
})

// ↓↓ CREATING A ITEM WITH EACH  INPUT VALUES ↓↓

const createProduct = () => { 
  const imgInput = document.querySelector('#imgInput').value
  const titleInput = document.querySelector('#titleInput').value
  const descriptionInput = document.querySelector('#descriptionInput').value
  const priceInput = document.querySelector('#priceInput').value
  const brandInput = document.querySelector('#brandInput').value
  const categoryInput = document.querySelector('#categoryInput').value
 

  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      images: imgInput,
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

btn.onclick = () => {
    createProduct()
}

