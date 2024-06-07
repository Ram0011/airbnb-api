import { Link } from "react-router-dom";
import airbnb from "./assets/airbnb.png";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="px-6 flex justify-between">
            <Link to={"/"} className="flex items-center ">
                <img src={airbnb} alt="logo" className="h-10 w-10" />
                <span className="font-sans font-bold text-2xl pl-3 text-pink-600">
                    airbnb
                </span>
            </Link>

            <div className="hidden md:flex border gap-2 border-gray-400 rounded-full items-center py-2 px-4 shadow-md shadow-gray-400">
                <div className="border-r border-gray-300 px-4 text-gray-500">
                    Anywhere
                </div>
                <div className="border-r border-gray-300 px-4 text-gray-500">
                    Anyweek
                </div>
                <div className=" px-4 text-gray-500">Add guests</div>
                <button className="bg-primary text-white p-1 rounded-full hover:bg-pink-800">
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
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </div>

            <Link
                to={user ? "/account" : "/login"}
                className="flex border gap-2 border-gray-400 rounded-full items-center py-2 px-4 shadow-md overflow-hidden hover:text-gray-500 hover:shadow-xl"
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
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <div className="bg-gray-500 text-white rounded-full p-1 ml-1 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {!!user && (
                    <div className="items-center text-lg ">{user.name}</div>
                )}
            </Link>
        </header>
    );
}
