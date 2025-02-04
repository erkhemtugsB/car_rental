async function fetchCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    const response = await fetch(`https://car-rental-3teo.onrender.com/cars`);
    const cars = await response.json();
    const car = cars.find(car => car.id == carId);
    const carDetailsContainer = document.getElementById('car-details-container');
    carDetailsContainer.innerHTML = ''; // Clear existing content

    if (car) {
        const carDetail = document.createElement('div');
        carDetail.innerHTML = `
            <div class="car-detail-card">
                    <div class="card-title-wrapper">
                        <h2 class="h3 card-title">${car.make} ${car.name}</h2>
                        <data class="year" value="${car.year}">${car.year}</data>
                    </div>
                <figure class="card-banner">
                    <img src=".${car.image}" alt="${car.make} ${car.name} ${car.year}" loading="lazy" width="440" height="300" class="w-100">
                </figure>
                <div class="card-content">
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
                            <strong>$${car.price}</strong>
                        </p>
                    </div>
                </div>
            </div>
        `;
        carDetailsContainer.appendChild(carDetail);
    } else {
        carDetailsContainer.innerHTML = '<p>Car not found</p>';
    }
}

window.onload = fetchCarDetails;