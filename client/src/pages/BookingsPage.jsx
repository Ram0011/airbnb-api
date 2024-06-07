import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios
            .get("https://airbnb-7n5y.onrender.com/bookings")
            .then((response) => {
                setBookings(response.data);
            });
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {bookings.length > 0 &&
                    bookings.map((booking) => {
                        return (
                            <Link
                                to={`/account/bookings/${booking._id}`}
                                key={booking._id}
                                className="flex flex-col md:flex-row lg:flex-row gap-4 hover:bg-gray-200 rounded-2xl overflow-hidden mt-6 bg-slate-200"
                            >
                                <div className="w-48 ">
                                    <img
                                        src={`https://airbnb-7n5y.onrender.com/uploads/${booking.place.photos[0]}`}
                                        alt="photo0"
                                    />
                                </div>
                                <div className="p-2">
                                    <h2 className="text-xl font-semibold">
                                        {booking.place.title}
                                    </h2>
                                    {format(
                                        new Date(booking.checkIn),
                                        "dd-MM-yyyy"
                                    )}{" "}
                                    -{" "}
                                    {format(
                                        new Date(booking.checkOut),
                                        "dd-MM-yyyy"
                                    )}{" "}
                                    <br />
                                    <div className="mb-1 flex gap-2 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="font-semibold">
                                            {differenceInCalendarDays(
                                                new Date(booking.checkOut),
                                                new Date(booking.checkIn)
                                            )}{" "}
                                            Nights
                                        </span>
                                    </div>
                                    <div className="font-bold font-serif">
                                        Total Price: ₹
                                        <span className="font-sans">
                                            {booking.price}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
