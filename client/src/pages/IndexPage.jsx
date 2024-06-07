import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios
            .get("https://airbnb-7n5y.onrender.com/places")
            .then((response) => {
                setPlaces(response.data);
                // console.log(response.data);
            });
    }, []);

    return (
        <div className="mt-16 grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {places.length > 0 &&
                places.map((place) => (
                    <Link
                        to={`/place/${place._id}`}
                        key={place._id}
                        className="bg-gray-100 rounded-2xl gap-x-2 p-2 hover:shadow-2xl"
                    >
                        <div className="rounded-2xl flex mb-2">
                            {place.photos?.[0] && (
                                <img
                                    className="aspect-square rounded-2xl object-cover h-full w-full"
                                    src={`https://airbnb-7n5y.onrender.com/uploads/${place.photos[0]}`}
                                    alt="photo"
                                />
                            )}
                        </div>

                        <h2 className=" p-2 font-serif text-lg font-semibold truncate">
                            {place.title}
                        </h2>
                        <h3 className="ml-2 font-light font-serif text-sm">
                            {place.address}
                        </h3>
                        <div className="ml-2 font-serif mt-2 mb-2">
                            <span className="font-bold font-mono text-lg">
                                ₹{place.price}
                            </span>{" "}
                            <span className="text-gray-800 ml-1 font-sans">
                                per night
                            </span>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
