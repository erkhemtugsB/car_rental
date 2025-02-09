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
                  
                <!-- Car carousel -->

                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    ${car.image.map((img, index) => `
                      <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src=".${img}" alt="${car.make} ${car.name} ${car.year}" loading="lazy" width="440" height="300" class="w-100">
                      </div>
                    `).join('')}
                  </div>
                  ${car.image.length > 1 ? `
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                  ` : ''}
                </div>
                <div>
                  <div class="image-preview-row">
                    ${car.image.map(img => `
                      <img src=".${img}" alt="${car.make} ${car.name} ${car.year}" loading="lazy" width="100" height="75" class="preview-img">
                    `).join('')}
                  </div>
                </div>


                <div class="border-t border-gray-100 p-10">
                  <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">Car Model</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.make} ${car.name}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">Year</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.year}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">Capacity</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.capacity}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">Fuel Type</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.fuel}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">Consumption</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.consumption}</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-lg font-medium text-gray-900">transmissoin</dt>
                      <dd class="mt-1 text-lg text-gray-700 sm:col-span-2 sm:mt-0">${car.transmission}</dd>
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