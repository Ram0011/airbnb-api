/* eslint-disable react/prop-types */
import { useState } from "react";

export default function PlaceGallary({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="p-8 grid gap-4 bg-black">
                    <div>
                        <h2 className="text-2xl justify-center text-white mr-36">
                            Photos of {place.title}
                        </h2>
                        <button
                            className=" fixed flex gap-2 py-2 px-4 rounded-xl bg-gray-400 hover:bg-gray-500 shadow-md shadow-black right-12 top-8"
                            onClick={() => setShowAllPhotos(false)}
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
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                />
                            </svg>
                            Close Photos
                        </button>
                    </div>

                    <div className="p-8 grid gap-4 ">
                        {place?.photos?.length > 0 &&
                            place.photos.map((photo) => (
                                <div key={photo}>
                                    <img
                                        className="rounded-lg"
                                        src={`https://airbnb-7n5y.onrender.com/uploads/${photo}`}
                                        alt="photo"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="rounded-xl aspect-square cursor-pointer "
                                src={
                                    "https://airbnb-7n5y.onrender.com/uploads/" +
                                    place.photos[0]
                                }
                                alt="photo1"
                            />
                        </div>
                    )}
                </div>
                <div className="lg:grid gap-2 hidden md:block">
                    {place.photos?.[1] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className=" aspect-square object-cover cursor-pointer"
                            src={
                                "https://airbnb-7n5y.onrender.com/uploads/" +
                                place.photos[1]
                            }
                            alt="photo2"
                        />
                    )}
                    {place.photos?.[2] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className=" aspect-square object-cover cursor-pointer"
                            src={
                                "https://airbnb-7n5y.onrender.com/uploads/" +
                                place.photos[2]
                            }
                            alt="photo3"
                        />
                    )}
                </div>
            </div>
            <button
                className="absolute flex gap-2 bottom-1 right-1 py-2 px-2 bg-white text-lg rounded-xl shadow-xl border border-black hover:bg-gray-300 items-center"
                onClick={() => setShowAllPhotos(!showAllPhotos)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                    />
                </svg>
                Show more photos
            </button>
        </div>
    );
}
