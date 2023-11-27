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
        `
        list.appendChild(item)
    });
})

const createUser = () => {

    const name = document.querySelector('#nameInput').value
    const lastname = document.querySelector('#lastNameInput').value
    const age = document.querySelector('#ageInput').value
    const phone = document.querySelector('#phoneInput').value
    const email = document.querySelector('#emailInput').value
    const password = document.querySelector('#passwordInput').value
    const sex = document.querySelector('#sexSelect').value
    const image = document.querySelector('#imageInput').value

    fetch('https://dummyjson.com/users/add', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body:{
            firstName: name,
            lastName: lastname,
            age: age,
            email: email,
            password: password,
            image: image,
            phone: phone,
            gender: sex
        }
    }).then(response => response.json())
    .then(newUser => {
        const item = document.createElement(`div`)
        item.classList.add(`user`)
        item.innerHTML = `<img src='${newUser.image}'  class="productImage"></img>
        <span class="text">${`${newUser.firstName} ${newUser.lastName}`}</span>
        <span class="text">${newUser.email}</span>
        <span class="text"> ${newUser.age} anos</span>
        `
        list.appendChild(item)
    })


}
const btn = document.querySelector('#inputButton')

btn.onclick = () =>  {
     createUser()
}