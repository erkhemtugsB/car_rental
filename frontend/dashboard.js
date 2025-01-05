// Check for auth token
if (!localStorage.getItem('authToken')) {
    window.location.href = 'index.html'; // Redirect to login page if token is not present
}

async function fetchCars() {
    const response = await fetch('http://localhost:3000/cars');
    const cars = await response.json();
    const carTilesContainer = document.querySelector('.car-tiles');
    carTilesContainer.innerHTML = ''; // Clear existing content
    cars.forEach(car => {
        const carTile = document.createElement('div');
        carTile.classList.add('car-tile');
        carTile.innerHTML = `
            <div class="featured-car-card">
                <figure class="card-banner">
                    <img src="${car.image}" alt="${car.make} ${car.name} ${car.year}" loading="lazy" width="150" height="100" class="w-100">
                </figure>
                <div class="card-content">
                    <div class="card-title-wrapper">
                        <h3 class="h3 card-title">${car.make} ${car.name}</h3>
                        <data class="year" value="${car.year}">${car.year}</data>
                    </div>
                    <div class="card-details">
                        <div class="card-detail-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <span class="card-item-text">${car.capacity} Passengers</span>
                        </div>
                        <div class="card-detail-item">
                            <ion-icon name="flash-outline"></ion-icon>
                            <span class="card-item-text">${car.fuel}</span>
                        </div>
                        <div class="card-detail-item">
                            <ion-icon name="speedometer-outline"></ion-icon>
                            <span class="card-item-text">${car.consumption} MPG</span>
                        </div>
                        <div class="card-detail-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>
                            <span class="card-item-text">${car.transmission}</span>
                        </div>
                    </div>
                    <div class="card-price-wrapper">
                        <p class="card-price">
                            <strong>$${car.price}</strong> / month
                        </p>
                        <div>
                            <button class="btn edit-button"><i class="fas fa-edit"></i></button>
                            <button class="btn delete-button" data-id="${car.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-form-container" style="display: none;">
                <form class="edit-car-form">
                    <label for="make">Make</label>
                    <input type="text" class="make" value="${car.make}" required>
                    
                    <label for="name">Name</label>
                    <input type="text" class="name" value="${car.name}" required>
                    
                    <label for="year">Year</label>
                    <input type="number" class="year" value="${car.year}" required>
                    
                    <label for="capacity">Number of Passengers</label>
                    <input type="number" class="capacity" value="${car.capacity}" required>
                    
                    <label for="fuel">Fuel Type</label>
                    <input type="text" class="fuel" value="${car.fuel}" required>
                    
                    <label for="consumption">Fuel Consumption</label>
                    <input type="text" class="consumption" value="${car.consumption}" required>
                    
                    <label for="transmission">Transmission (Automatic/Manual)</label>
                    <input type="text" class="transmission" value="${car.transmission}" required>
                    
                    <label for="price">Price</label>
                    <input type="text" class="price" value="${car.price}" required>
                    
                    <label for="image">Image</label>
                    <input type="file" class="image-input">
                    
                    <button type="submit" class="btn save-button">Save</button>
                </form>
            </div>
        `;
        carTilesContainer.appendChild(carTile);

        const editButton = carTile.querySelector('.edit-button');
        const editFormContainer = carTile.querySelector('.edit-form-container');
        const editForm = carTile.querySelector('.edit-car-form');

        editButton.addEventListener('click', () => {
            if (editFormContainer.style.display === 'none') {
                editFormContainer.style.display = 'block';
                carTile.classList.add('expanded');
            } else {
                editFormContainer.style.display = 'none';
                carTile.classList.remove('expanded');
            }
        });

        editForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const inputs = editForm.querySelectorAll('input');
            const updatedCar = {
                make: inputs[0].value,
                name: inputs[1].value,
                year: inputs[2].value,
                capacity: inputs[3].value,
                fuel: inputs[4].value,
                consumption: inputs[5].value,
                transmission: inputs[6].value,
                price: inputs[7].value
            };

            const formData = new FormData();
            formData.append('make', updatedCar.make);
            formData.append('name', updatedCar.name);
            formData.append('year', updatedCar.year);
            formData.append('capacity', updatedCar.capacity);
            formData.append('fuel', updatedCar.fuel);
            formData.append('consumption', updatedCar.consumption);
            formData.append('transmission', updatedCar.transmission);
            formData.append('price', updatedCar.price);
            if (inputs[8].files[0]) {
                formData.append('image', inputs[8].files[0]);
            }

            const response = await fetch(`http://localhost:3000/cars/${car.id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                window.location.reload(); // Reload the page to show the updated car
            } else {
                alert('Failed to save changes');
            }
        });
    });

    // Add event listener to the "Add a new Car" button
    document.getElementById('addCarButton').addEventListener('click', () => {
        const addCarFormContainer = document.querySelector('.add-car-form-container');
        if (addCarFormContainer.style.display === 'block') {
            addCarFormContainer.style.display = 'none';
        } else {
            addCarFormContainer.style.display = 'block';
        }
    });
    // Add event listener to the "close-add-popup-button"
    document.getElementById('close-add-car').addEventListener('click', () => {
        const addCarFormContainer = document.querySelector('.add-car-form-container');
        addCarFormContainer.style.display = 'none';
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const carId = event.target.closest('button').getAttribute('data-id');
            try {
                const response = await fetch(`http://localhost:3000/cars/${carId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Car deleted successfully'
                    });                  
                    fetchCars(); // Refresh the car list
                } else {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    alert('Failed to delete car: ' + errorText);
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete car',
                    text: result.message
                });
            }
        });
    });

    // Handle the form submission for adding a new car
    document.getElementById('addCarForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const inputs = document.querySelectorAll('.add-car-form input');
        const newCar = {
            make: inputs[0].value,
            name: inputs[1].value,
            year: inputs[2].value,
            capacity: inputs[3].value,
            fuel: inputs[4].value,
            consumption: inputs[5].value,
            transmission: inputs[6].value,
            price: inputs[7].value
        };

        const formData = new FormData();
        formData.append('make', newCar.make);
        formData.append('name', newCar.name);
        formData.append('year', newCar.year);
        formData.append('capacity', newCar.capacity);
        formData.append('fuel', newCar.fuel);
        formData.append('consumption', newCar.consumption);
        formData.append('transmission', newCar.transmission);
        formData.append('price', newCar.price);
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