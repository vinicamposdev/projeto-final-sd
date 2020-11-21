module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        year: {
            type: String,
            required: true,
            trim: true
        },
        license_plate: {
            type: String,
            required: true,
            trim: true
        },
        __v: {
            type: Number,
            select: false
        }
    });

    const Vehicle = mongoose.model('vehicle', schema);

    return Vehicle;
};