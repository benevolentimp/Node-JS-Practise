const express = require('express');
const Car = require('./models/car');
const router = express.Router();

// Fetch all cars:
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// Add car:
router.post("/cars", async (req, res) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year
    });

    try {
        const newCar = await car.save();
        res.status(201).json({ newCar });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
})

// Delete car:
router.delete("/cars", async (req, res) => {
    await Car.deleteOne({brand: req.body.brand, model: req.body.model}, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
})

// Update car by id:
router.put("/cars/:id", async (req, res) => {
    await Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ result });
        }
    });
})

module.exports = router;