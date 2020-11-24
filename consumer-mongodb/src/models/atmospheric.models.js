module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        oxygen: Number,
        humidity: Number,
        temperature: Number,
        date: String,
        __v: {
            type: Number,
            select: false
        }
    });

    const Atmospheric = mongoose.model('atmospherics', schema);

    return Atmospheric;
};