let lastPassengerIndex = 40;
let tableBody = document.querySelector('.table-body');
let searchButton = document.querySelector('.search__button');
fetch('https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json')
.then(response => {
    return response.json()
})
.then(passengersOfTitanic => {       
     
    for (let i = 0; i < 40; i++) {
        addToTitanic(passengersOfTitanic[i]);
    }

    document.addEventListener('scroll', () => {
        if (window.innerHeight + pageYOffset >= document.body.offsetHeight - 30) {
            if (lastPassengerIndex < passengersOfTitanic.length) {
                addToTitanic(passengersOfTitanic[lastPassengerIndex]);
                lastPassengerIndex++;
            }
        }
    })

    searchButton.addEventListener('click', () => {
        tableBody.innerHTML = '';
        let searchInput = document.querySelector('.search__input');
        let filteredPassangers = passengersOfTitanic.filter(passenger => passenger.name.toLowerCase().includes(searchInput.value.toLowerCase()))
        for (let i = 0; i < filteredPassangers.length; i++) {
            addToTitanic(filteredPassangers[i]);
        }
        
    })   
    
})

function addToTitanic(passenger) {
    let tr = document.createElement('tr');
    tableBody.append(tr);
    let tdName = document.createElement('td');
    let tdGender = document.createElement('td');
    let tdAge = document.createElement('td');
    let tdSurvived = document.createElement('td');
    tdName.textContent = passenger.name;
    tdGender.textContent = passenger.gender;
    tdAge.textContent = passenger.age;
    tdSurvived.textContent = passenger.survived;
    tr.append(tdName);
    tr.append(tdGender);
    tr.append(tdAge);
    tr.append(tdSurvived);   
}