import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallary from "../PlaceGallary";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`https://airbnb-7n5y.onrender.com/bookings`)
                .then((response) => {
                    const foundBooking = response.data.find(
                        ({ _id }) => _id === id
                    );
                    if (foundBooking) setBooking(foundBooking);
                });
        }
    }, [id]);

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg-slate-200 p-4 mb-4 rounded-2xl">
                <h2 className="font-bold text-2xl">
                    Your Booking Information:{" "}
                </h2>
                <p className="mt-1">
                    <span className="font-bold mr-1">Check-in:</span>{" "}
                    {new Date(booking.checkIn).toLocaleString()}
                </p>
                <p className="mt-1">
                    <span className="font-bold mr-1">Check-Out:</span>{" "}
                    {new Date(booking.checkOut).toLocaleString()}
                </p>
                <p className="mt-1">
                    <span className="font-bold mr-1">Guests:</span>{" "}
                    {booking.guests} {booking.guests > 1 ? "guests" : "guest"}
                </p>
                <p className="mt-1 text-xl">
                    <span className="font-bold  font-serif">Total price: </span>
                    <span className="font-bold">₹{booking.price} </span>
                </p>
            </div>
            <PlaceGallary place={booking.place} />
        </div>
    );
}
