/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [redirect, setRedirect] = useState("");
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    async function bookThisPlace() {
        try {
            if (!user) {
                alert("Please login to book this place");
                return;
            }
            if (!checkIn || !checkOut) {
                alert("Fill CheckIn and CheckOut Dates Correctly");
                return;
            }
            if (!phone) {
                alert("Please enter your phone number");
                return;
            }

            const data = {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                place: place._id,
                price: numberOfNights * place.price,
            };
            const response = await axios.post(
                "https://airbnb-7n5y.onrender.com/bookings",
                data
            );
            console.log(response.data);
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            alert(error.response.data.error);
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-center text-2xl ">
                Price: ₹ {place.price} / night
                <br /> Please login to book this place
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className=" py-4 px-4">
                        <label>Check In: </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className=" py-4 px-4 border-l">
                        <label>Check Out: </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className=" py-4 px-4 border-t">
                    <label>Number of Guests: </label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                    />
                </div>
                {checkIn > checkOut &&
                    alert("CheckIn Date should be before CheckOut Date!")}
                {numberOfNights > 0 && (
                    <div className=" py-4 px-4 border-t">
                        <label>Your Name </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <label>Your Mobile: </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            </div>

            <button
                className="primary mt-4 hover:bg-pink-700"
                onClick={bookThisPlace}
            >
                Book this Place
                {numberOfNights > 0 && (
                    <span>, ₹ {numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}
