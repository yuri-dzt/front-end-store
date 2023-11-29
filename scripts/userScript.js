const list = document.querySelector('.listUsers')

const apiUrl = `https://dummyjson.com/users`

fetch(apiUrl).then((response) => {
    return response.json()
}).then(data => 
    {return data.users}).then(users => {
    users.forEach(user => {
        const item = document.createElement(`div`)
        item.classList.add(`user`)
        item.innerHTML = `<img src='${user.image}'  class="productImage"></img>
        <span class="text">${`${user.firstName} ${user.lastName}`}</span>
        <span class="text">${user.email}</span>
        <span class="text"> ${user.age} anos</span>
        <button onclick={removeUser(${user.id})} class='removeItem deleteButton'>X</button>
        `
        list.appendChild(item)
    });
})

const removeUser = (id) => {

    fetch(`https://dummyjson.com/users/${id}`,{
      method: "DELETE"
    }).then(res => res.json())
    .then(e =>{
        const diference = 30 - list.children.length
      list.removeChild(list.children[e.id -1 -diference ])
    })
  }

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


const createUser = () => {

    const name = document.querySelector('#nameInput').value
    const lastname = document.querySelector('#lastNameInput').value
    const age = document.querySelector('#ageInput').value
    const phone = document.querySelector('#phoneInput').value
    const email = document.querySelector('#emailInput').value
    const password = document.querySelector('#passwordInput').value
    const sex = document.querySelector('#sexSelect').value

fetch('https://dummyjson.com/users/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: name,
    lastName: lastname,
    age: age,
    email: email,
    password: password,
    image: imageURL,
    phone: phone,
    gender: sex
  })
})
.then(res => res.json())
.then(newUser => {
    const newItem = document.createElement(`div`)
        newItem.classList.add(`user`)
        newItem.innerHTML = `<img src='${newUser.image}'  class="productImage"></img>
        <span class="text">${`${newUser.firstName} ${newUser.lastName}`}</span>
        <span class="text">${newUser.email}</span>
        <span class="text"> ${newUser.age} anos</span>
        `
        list.appendChild(newItem)
});

}
const btn = document.querySelector('#inputButton')
btn.onclick = () =>  { 
     createUser()
}