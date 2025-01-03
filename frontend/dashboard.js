// Check for auth token
if (!localStorage.getItem('authToken')) {
    window.location.href = 'index.html'; // Redirect to login page if token is not present
}

async function fetchCars() {
    const response = await fetch('http://localhost:3000/cars');
    const cars = await response.json();
    const carTilesContainer = document.querySelector('.car-tiles');
    cars.forEach(car => {
        const carTile = document.createElement('div');
        carTile.classList.add('car-tile');
        carTile.innerHTML = `
            <div class="featured-car-card">
                <figure class="card-banner">
                    <img src="${car.image}" alt="${car.name} ${car.year}" loading="lazy" width="440" height="300" class="w-100">
                </figure>
                <div class="card-content">
                    <div class="card-title-wrapper">
                        <h3 class="h3 card-title">
                            <label>Name:</label>
                            <input type="text" class="name" value="${car.name}" readonly>
                        </h3>
                        <data class="year" value="${car.year}">
                            <label>Year:</label>
                            <input type="number" class="year" value="${car.year}" readonly>
                        </data>
                    </div>
                    <ul class="card-list">
                        <li class="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <label>Passengers:</label>
                            <span class="card-item-text"><input type="number" class="passengers" value="${car.passengers}" readonly></span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>
                            <label>Gas Type:</label>
                            <span class="card-item-text"><input type="text" class="gas-type" value="${car.gasType}" readonly></span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>
                            <label>Fuel Consumption:</label>
                            <span class="card-item-text"><input type="text" class="fuel-consumption" value="${car.fuelConsumption}" readonly></span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>
                            <label>Transmission:</label>
                            <span class="card-item-text"><input type="text" class="transmission" value="${car.transmission}" readonly></span>
                        </li>
                    </ul>
                    <div class="card-price-wrapper">
                        <p class="card-price">
                            <label>Price:</label>
                            <strong><input type="text" class="price" value="${car.price}" readonly></strong> / month
                        </p>
                        <button class="btn edit-button">Edit</button>
                        <button class="btn save-button" style="display:none;">Save</button>
                    </div>
                </div>
            </div>
        `;
        carTilesContainer.appendChild(carTile);

        const editButton = carTile.querySelector('.edit-button');
        const saveButton = carTile.querySelector('.save-button');
        const inputs = carTile.querySelectorAll('input');

        editButton.addEventListener('click', () => {
            inputs.forEach(input => input.removeAttribute('readonly'));
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        });

        saveButton.addEventListener('click', async () => {
            const updatedCar = {
                name: inputs[0].value,
                year: inputs[1].value,
                passengers: inputs[2].value,
                gasType: inputs[3].value,
                fuelConsumption: inputs[4].value,
                transmission: inputs[5].value,
                price: inputs[6].value
            };

            const formData = new FormData();
            formData.append('name', updatedCar.name);
            formData.append('year', updatedCar.year);
            formData.append('passengers', updatedCar.passengers);
            formData.append('gasType', updatedCar.gasType);
            formData.append('fuelConsumption', updatedCar.fuelConsumption);
            formData.append('transmission', updatedCar.transmission);
            formData.append('price', updatedCar.price);

            const response = await fetch(`http://localhost:3000/cars/${car.id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                inputs.forEach(input => input.setAttribute('readonly', 'readonly'));
                carTile.classList.remove('expanded');
                editButton.style.display = 'inline-block';
                saveButton.style.display = 'none';
            } else {
                alert('Failed to save changes');
            }
        });
    });

    // Add event listener to the "Add a new Car" button
    document.getElementById('addCarButton').addEventListener('click', () => {
        document.querySelector('.add-car-form-container').style.display = 'block';
    });

    // Handle the form submission for adding a new car
    document.getElementById('addCarForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const inputs = document.querySelectorAll('.add-car-form input');
        const newCar = {
            name: inputs[0].value,
            description: inputs[1].value,
            year: inputs[2].value,
            price: inputs[3].value,
            passengers: inputs[4].value,
            gasType: inputs[5].value,
            fuelConsumption: inputs[6].value,
            transmission: inputs[7].value
        };

        const formData = new FormData();
        formData.append('name', newCar.name);
        formData.append('description', newCar.description);
        formData.append('year', newCar.year);
        formData.append('price', newCar.price);
        formData.append('passengers', newCar.passengers);
        formData.append('gasType', newCar.gasType);
        formData.append('fuelConsumption', newCar.fuelConsumption);
        formData.append('transmission', newCar.transmission);
        if (inputs[8].files[0]) {
            formData.append('image', inputs[8].files[0]);
        }

        const response = await fetch('http://localhost:3000/cars', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            window.location.reload(); // Reload the page to show the new car
        } else {
            alert('Failed to add new car');
        }
    });
}

fetchCars();