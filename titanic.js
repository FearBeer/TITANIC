let lastPassengerIndex = 0;
let tableBody = document.querySelector('.table-body');
let searchButton = document.querySelector('.search__button');
let passengersDiv = document.querySelector('.passengers');
let search = document.querySelector('.search');
let passengerName = document.querySelector('.passenger-name');
let age = document.querySelector('.passenger-age');
let gender = document.querySelector('.passenger-gender');
let survive = document.querySelector('.passenger-survive');

fetch('https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json')
    .then(response => {
        return response.json()
    })
    .then(passengersOfTitanic => {        

        renderTitanicPassengers(passengersOfTitanic);

        searchButton.addEventListener('click', () => {            
            searchingPassengers(passengersOfTitanic);            
        });

        window.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                searchingPassengers(passengersOfTitanic);
            }
        });

        window.addEventListener('keydown', event => {
            if (event.key === 'Control') {
                tableBody.innerHTML = '';
                for(let i = 0; i < passengersOfTitanic.length; i++) {
                    addToTitanic(passengersOfTitanic[i]);
                }                
                sortByAge(passengersOfTitanic);
                lastPassengerIndex = passengersOfTitanic.length;
            }
        });       
    });

function sortByAge(passengersOfTitanic) {
    let count = 0;
    age.addEventListener('click', () => {
        count++;                                               
        tableBody.innerHTML = '';
        let sortedPassenger;
        if (count%2 === 0) {
            sortedPassenger  = passengersOfTitanic.sort(ascending);
            for(let i = 0; i < sortedPassenger.length; i++) {
                addToTitanic(sortedPassenger[i]);
            }                   
        } else {
            sortedPassenger  = passengersOfTitanic.sort(descending);
            for(let i = 0; i < sortedPassenger.length; i++) {
                addToTitanic(sortedPassenger[i]);
            }
        }
    })
}

function renderTitanicPassengers(passengersOfTitanic) {
    while (passengersDiv.clientHeight + search.clientHeight <= document.body.offsetHeight) {
        addToTitanic(passengersOfTitanic[lastPassengerIndex]);
        lastPassengerIndex++;                
    }
    sortByAge(passengersOfTitanic);
    // let somePassengersOfTitanic = [...passengersOfTitanic];
    // somePassengersOfTitanic.length = lastPassengerIndex;
    // sortByAge(somePassengersOfTitanic);
    
    

    document.addEventListener('scroll', () => {
        if (window.innerHeight + scrollY >= document.body.offsetHeight - 30) {
            if (lastPassengerIndex < passengersOfTitanic.length) {
                addToTitanic(passengersOfTitanic[lastPassengerIndex]);
                lastPassengerIndex++;
            }          
        }
    })

}

function addToTitanic(passenger) {
    let tr = document.createElement('tr');
    tableBody.append(tr);
    let tdName = document.createElement('td');
    let tdGender = document.createElement('td');
    let tdAge = document.createElement('td');
    let tdSurvived = document.createElement('td');
    tdName.textContent = passenger.id + ' : ' + printDataIsCorrupted(passenger.name);
    tdGender.textContent = printDataIsCorrupted(passenger.gender);
    tdAge.textContent = Math.ceil(printDataIsCorrupted(passenger.age));
    tdSurvived.textContent = printDataIsCorrupted(passenger.survived); 
    tr.append(tdName);
    tr.append(tdGender);
    tr.append(tdAge);
    tr.append(tdSurvived);
}

function searchingPassengers(passengersOfTitanic) {
    let searchInput = document.querySelector('.search__input');
    if (searchInput.value === '') {
        search.classList.add('search__error');
        searchInput.placeholder = 'Enter the name that you want to find...';
    } else {
        search.classList.remove('search__error');
        tableBody.innerHTML = '';
        let filteredPassangers = passengersOfTitanic.filter(passenger => passenger.name.toLowerCase().includes(searchInput.value.toLowerCase()))
        if (filteredPassangers.length === 0) {
            searchInput.value = '';
            searchInput.placeholder = 'Passangers with this name - not found! Enter another name...';
        }
        else {
            lastPassengerIndex = passengersOfTitanic.length;
            for (let i = 0; i < filteredPassangers.length; i++) {
                addToTitanic(filteredPassangers[i]);
                sortByAge(filteredPassangers);
            }
        }
    }
    
}

function printDataIsCorrupted(prop) {
    if (prop === '' || prop === 'null' || prop === null) {
        return prop = 'Sorry, but this data is corrupted...'
    } else if (prop === true) {
        return prop = 'Survived'
    } else if (prop === false) {
        return prop = 'Died'
    } else {
        return prop = prop;
    }
}

function ascending(a, b) {
    if (a.age > b.age) {
        return 1;
    } else if (a.age < b.age) {
        return -1;
    } else 0;
}

function descending(a, b) {
    if (a.age < b.age) {
        return 1;
    } else if (a.age > b.age) {
        return -1;
    } else 0;
}
