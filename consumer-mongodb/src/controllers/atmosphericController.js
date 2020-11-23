const db = require('../models')
const Atmospheric = db.atmospheric;

exports.insert = (metrics) => {
    // Create a Atmospheric instance
    const atmospheric = new Atmospheric(metrics);

    // Save atmospheric in the database
    atmospheric
        .save()
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
};
