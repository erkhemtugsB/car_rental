async function fetchCars() {
    const response = await fetch('https://car-rental-3teo.onrender.com/cars');
    const cars = await response.json();
    const carList = document.getElementById('featured-car-list');
    carList.innerHTML = ''; // Clear existing content
    cars.forEach(car => {
        const carItem = document.createElement('li');
        carItem.innerHTML = `
            <div class="featured-car-card">
                <figure class="card-banner">
                    <img src="${car.image}" alt="${car.make} ${car.name} ${car.year}" loading="lazy" width="440" height="300" class="w-100">
                </figure>
                <div class="card-content">
                    <div class="card-title-wrapper">
                        <h3 class="h3 card-title">
                            <a href="#">${car.make} ${car.name}</a>
                        </h3>
                        <data class="year" value="${car.year}">${car.year}</data>
                    </div>
                    <ul class="card-list">
                        <li class="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <span class="card-item-text">${car.capacity} Passengers</span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>
                            <span class="card-item-text">${car.fuel}</span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>
                            <span class="card-item-text">${car.consumption} MPG</span>
                        </li>
                        <li class="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>
                            <span class="card-item-text">${car.transmission}</span>
                        </li>
                    </ul>
                    <div class="card-price-wrapper">
                        <p class="card-price">
                            <strong>$${car.price}</strong> / month
                        </p>
                        <button class="btn fav-btn" aria-label="Add to favourite list">
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>
                        <button class="btn" data-car-id="${car.id}">Rent now</button>
                    </div>
                </div>
            </div>
        `;
        carList.appendChild(carItem);
    });

    // Add event listeners to "Rent now" buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const carId = this.getAttribute('data-car-id');
            window.location.href = `cars/car.html?id=${carId}`;
        });
    });
}

window.onload = fetchCars;
