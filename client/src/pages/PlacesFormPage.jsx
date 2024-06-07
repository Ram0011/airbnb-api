import PhotosUploder from "../PhotosUploder";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(1000);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios
            .get(`https://airbnb-api-topaz.vercel.app/places/${id}`)
            .then((response) => {
                const { data } = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            });
    }, [id]);

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };
        if (id) {
            // update
            try {
                await axios.put("https://airbnb-api-topaz.vercel.app/places", {
                    id,
                    ...placeData,
                });
                setRedirect(true);
            } catch (error) {
                alert(error.response.data.error);
            }
        } else {
            try {
                await axios.post(
                    "https://airbnb-api-topaz.vercel.app/places",
                    placeData
                );
                setRedirect(true);
            } catch (error) {
                alert(error.response.data.error);
            }
        }
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />;
    }

    return (
        <div>
            <AccountNav />
            <form className="mx-auto" onSubmit={savePlace}>
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">Title</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="title, My Place"
                    className="border border-gray-800"
                />
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">Address</h2>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="adderess"
                    className="border border-gray-800"
                />
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">Photos</h2>

                <PhotosUploder
                    addedPhotos={addedPhotos}
                    onChange={setAddedPhotos}
                />
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">
                    Description
                </h2>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">Perks</h2>
                <Perks selected={perks} onChange={setPerks} />
                <h2 className="text-2xl mt-4 ml-3 text-gray-900">Extra Info</h2>
                <textarea
                    placeholder="Tell us about your place"
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />

                <h2 className="text-2xl mt-4 ml-3 text-gray-900">
                    Check In and Check Out
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    <div>
                        <h3 className="mt-2 -mb-1 ml-3">Check In:</h3>
                        <input
                            type="text"
                            placeholder="14:00"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out:</h3>
                        <input
                            type="text"
                            placeholder="11:00"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Guests:</h3>
                        <input
                            type="number"
                            className=""
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night ₹:</h3>
                        <input
                            type="number"
                            className=""
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button className="bg-primary w-full rounded-2xl text-white text-lg mt-4 hover:bg-pink-700 py-2">
                    Save
                </button>
            </form>
        </div>
    );
}
