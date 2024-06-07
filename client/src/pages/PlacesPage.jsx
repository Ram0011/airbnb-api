import { Link } from "react-router-dom";
// import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    // const { action } = useParams();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios
            .get("https://airbnb-api-topaz.vercel.app/user-places")
            .then(({ data }) => {
                setPlaces(data);
            });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center mt-9">
                <Link
                    to={"/account/places/new"}
                    className=" inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1 hover:bg-pink-700 hover:shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add new Place
                </Link>
            </div>
            <div className="mt-6">
                {places.length > 0 &&
                    places.map((place) => (
                        <Link
                            to={`/account/places/${place._id}`}
                            key={place._id}
                            className="bg-gray-100 flex flex-col md:flex-row mb-5 lg:flex-row gap-4 p-4 rounded-2xl cursor-pointer hover:bg-gray-200 "
                        >
                            <div className="flex w-full h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 bg-gray-200 rounded-xl shrink-0">
                                {place.photos.length > 0 && (
                                    <img
                                        className="w-full h-full object-cover rounded-xl"
                                        src={`https://airbnb-api-topaz.vercel.app/uploads/${place.photos[0]}`}
                                        alt="photo"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold">
                                        {place.title}
                                    </h2>
                                    <p className="text-sm mt-1">
                                        {place.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
            {/* {action === "new" && <PlacesFormPage />} */}
        </div>
    );
}
