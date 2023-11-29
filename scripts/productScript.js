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

const postItem = () => { 
  const imgInput = document.querySelector('#imgInput').value
  const titleInput = document.querySelector('#titleInput').value
  const descriptionInput = document.querySelector('#descriptionInput').value
  const priceInput = document.querySelector('#priceInput').value
  const brandInput = document.querySelector('#brandInput').value
  const categoryInput = document.querySelector('#categoryInput').value
  const item = document.createElement(`div`)
  item.classList.add(`item`)
  item.classList.add(`item`)

  fetch(`https://dummyjson.com/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      images: imgInput,
      title: titleInput,
      description:descriptionInput,
      price: priceInput,
      brand: brandInput,
      category: categoryInput,
  })
})
  .then(res => res.json())
  .then( e => {
    
    item.innerHTML = `
      <img src='${e.images}' class="productImage" />
      <div class="title">${e.title}</div>
      <div class="description">${e.description}</div>
      <div class="price">US$ ${e.price}</div>
      <div class="brand">${e.brand}</div>
      <div class="category">${e.category}</div>
      <button class='removeItem'></button>`
      list.appendChild(item)
  }
    
  );
}

const btn = document.querySelector('#inputButton')

btn.onclick = function() {
 postItem()
}
