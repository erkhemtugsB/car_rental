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
  
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Car Model</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.make} ${car.name}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Year</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.year}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Capacity</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.capacity}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Fuel Type</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.fuel}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">Consumption</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.consumption}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">transmissoin</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${car.transmission}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-lg font-medium text-gray-900">Price</dt>
        <dd class="mt-1 text-xl text-gray-700 sm:col-span-2 sm:mt-0">${car.price}$</dd>
      </div>
    </dl>
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