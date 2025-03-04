const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to handle large images
app.use(cors());


// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

const carsFilePath = './cars.json';
const upload = multer({ dest: 'uploads/' }); // Ensure the path is correctly resolved

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from the frontend assets/images directory
app.use('/assets/images', express.static(path.join(__dirname, '../frontend/assets/images')));

// Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

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

// Add a new car
app.post('/cars', upload.array('images', 10), (req, res) => {
    const cars = loadCars();
    const newCar = {
        id: cars.length ? cars[cars.length - 1].id + 1 : 1,
        make: req.body.make,
        name: req.body.name,
        year: req.body.year,
        capacity: req.body.capacity,
        fuel: req.body.fuel,
        consumption: req.body.consumption,
        transmission: req.body.transmission,
        price: req.body.price,
        image: []
    };

    if (req.files) {
        req.files.forEach(file => {
            const ext = path.extname(file.originalname);
            const newImagePath = path.join('../frontend/assets/images', `car-${newCar.id}-${file.filename}${ext}`);
            fs.renameSync(file.path, path.join(__dirname, newImagePath));
            newCar.image.push(`./assets/images/car-${newCar.id}-${file.filename}${ext}`);
        });
    }

    cars.push(newCar);
    saveCars(cars);
    res.status(201).json(newCar);
});

// Update a car
app.put('/cars/:id', upload.array('images', 10), (req, res) => {
    const cars = loadCars();
    const carId = parseInt(req.params.id, 10);
    const carIndex = cars.findIndex(car => car.id === carId);

    if (carIndex !== -1) {
        const car = cars[carIndex];
        car.make = req.body.make;
        car.name = req.body.name;
        car.year = req.body.year;
        car.capacity = req.body.capacity;
        car.fuel = req.body.fuel;
        car.consumption = req.body.consumption;
        car.transmission = req.body.transmission;
        car.price = req.body.price;

        // Clear the existing image array
        car.image = [];

        if (req.files) {
            req.files.forEach(file => {
                const ext = path.extname(file.originalname);
                const newImagePath = path.join('../frontend/assets/images', `car-${carId}-${file.filename}${ext}`);
                const newImageFullPath = path.join(__dirname, newImagePath);
                fs.rename(file.path, newImageFullPath, (err) => {
                    if (err) {
                        console.error('Error moving file:', err);
                        return res.status(500).send('Failed to save changes');
                    }
                    car.image.push(`./assets/images/car-${carId}-${file.filename}${ext}`);
                });
            });
        }

        saveCars(cars);
        res.json(car);
    } else {
        res.status(404).send('Car not found');
    }
});

// Endpoint to handle car deletion
app.delete('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id, 10);

    fs.readFile('cars.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading cars.json:', err);
            return res.status(500).send('Server Error');
        }

        let cars = JSON.parse(data);
        cars = cars.filter(car => car.id !== carId);

        fs.writeFile('cars.json', JSON.stringify(cars, null, 2), (err) => {
            if (err) {
                console.error('Error writing to cars.json:', err);
                return res.status(500).send('Server Error');
            }

            res.status(200).send('Car deleted successfully');
        });
    });
});

// Serve index.html by default
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});