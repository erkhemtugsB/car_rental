const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to handle large images
app.use(cors());

const carsFilePath = './cars.json';
const upload = multer({ dest: path.join(__dirname, 'uploads/') }); // Ensure the path is correctly resolved

// Load cars data
function loadCars() {
    return JSON.parse(fs.readFileSync(carsFilePath, 'utf8'));
}

// Save cars data
function saveCars(cars) {
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
}

// Get all cars
app.get('/cars', (req, res) => {
    const cars = loadCars();
    res.json(cars);
});

// Update a car
app.put('/cars/:id', upload.single('image'), (req, res) => {
    const cars = loadCars();
    const carId = parseInt(req.params.id, 10);
    const carIndex = cars.findIndex(car => car.id === carId);

    if (carIndex !== -1) {
        const car = cars[carIndex];
        car.name = req.body.name;
        car.description = req.body.description;
        car.year = req.body.year;
        car.price = req.body.price;

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const newImagePath = path.join('uploads', `car-${carId}${ext}`);

            // Move the new image file to the uploads directory
            fs.renameSync(req.file.path, path.join(__dirname, newImagePath));
            car.image = `/backend/uploads/car-${carId}${ext}`; // Relative path for frontend
        }

        saveCars(cars);
        res.json(car);
    } else {
        res.status(404).send('Car not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});