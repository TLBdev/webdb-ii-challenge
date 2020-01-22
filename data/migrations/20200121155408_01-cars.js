
exports.up = function (knex) {
    return knex.schema.createTable('cars', car => {
        car.increments()

        car.string('make', 255).index()

        car.string('model', 255).index()

        car.string('vinNumber', 255)

        car.integer('mileage')

        car.string('transmission', 255)

        car.string('title')

        car.timestamps(true, true)


    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cars");
};
