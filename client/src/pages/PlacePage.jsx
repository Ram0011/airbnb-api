import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallary from "../PlaceGallary";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios
            .get(`https://airbnb-api-topaz.vercel.app/places/${id}`)
            .then((response) => {
                setPlace(response.data);
            });
    }, [id]);

    if (!place) {
        // If place is null, return a loading indicator or an empty div
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-4 md:px-16 lg:px-16 py-8">
            <h1 className="text-3xl mb-2 font-bold">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>

            <PlaceGallary place={place} />
            <div className="my-4 px-1">
                <h2 className="font-bold text-2xl mb-3">Description</h2>
                <p className="text-lg">{place.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] px-1 py-4 items-center">
                <div className="font-semibold text-xl">
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max Guests: {place.maxGuests} <br />
                    <br />
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white px-3 py-4 ">
                <span className="text-xl font-bold">Extra Info:</span>
                <div className="text-sm text-gray-800 py-1 pr-4 grid grid-cols-1 md:grid-cols-2 ">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    );
}
