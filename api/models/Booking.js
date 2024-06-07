const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: Number,
});

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
