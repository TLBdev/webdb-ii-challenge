const express = require("express");
const knex = require("knex");

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3",
    },
    useNullAsDefault: true,
};


const db = knex(knexConfiguration);

const router = express.Router();

router.get("/", (req, res) => {

    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve fruits" });
        });
});

router.post("/", (req, res) => {
    const fruitData = req.body;
    db("cars")
        .insert(fruitData) // with SQLite, by default it returns an array with the last id
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(addedCar => {
                    res.status(201).json(addedCar);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Failed to store data" });
        });
});


module.exports = router