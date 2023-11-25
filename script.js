const list = document.querySelector('.listItems')

const apiUrl = `https://dummyjson.com/products`

fetch(apiUrl)
.then((response) => {
    return response.json()
})
.then(data => {
    return data.products
})
.then(data => {
    console.log(data)
    data.forEach((e) => {
      const item = document.createElement(`div`)
      item.classList.add(`item`)
      item.innerHTML = `<img src='${e.images[0]}'  class="circle"></img>
      <div class="title">${e.title}</div>
      <div class="description">${e.description}</div>
      <div class="price">US$ ${e.price}</div>
      <div class="brand">${e.brand}</div>
      <div class="category">${e.category}</div>`
      list.appendChild(item)
    })
    
})
