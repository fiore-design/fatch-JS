const getUser = (e) => {
    e.preventDefault();

    const gender = document.querySelector('[name="gender"]').value;
    const count = document.querySelector('[name="count"]').value;
    console.log(count);

    const url = `https://randomuser.me/api/?results=${count}&gender=${gender === "both" ? "male,female" : gender}`;

    fetch(url)
        .then(r => {
            if (r.status !== 200) {
                throw Error("Brak odpowiedzi 200");
            } else {
                return r.json();
            }
        })
        .then(json => showUsers(json.results))
        .catch(err => console.log(err))
}

const showUsers = (users) => {
    const resultArea = document.querySelector('.users-list');
    resultArea.textContent = '';

    users.forEach(user => {
        console.log(user);
        const item = document.createElement('div');
        item.className = 'user';
        item.innerHTML = `
        <div class="user__name">${user.name.title.toUpperCase()} ${user.name.first} ${user.name.last}</div>
        <div class="user__image"><img src="${user.picture.medium}"></div>`;

        resultArea.appendChild(item);
    });
}


document.querySelector('.generator').addEventListener('submit', getUser);