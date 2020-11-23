const db = require('../models')
const Dummy = db.dummy;

exports.insert = (metrics) => {
    // Create a Event instance
    const dummy = new Dummy(metrics);

    // Save dummy in the database
    dummy
        .save()
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
};
