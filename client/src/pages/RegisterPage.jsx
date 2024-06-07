import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (ev) => {
        ev.preventDefault();
        try {
            const ans = await axios.post(
                "https://airbnb-api-topaz.vercel.app/register",
                {
                    name,
                    email,
                    password,
                }
            );
            console.log(ans);

            alert("Registration Successful! Please Login.");
        } catch (error) {
            console.log(error);
            alert(error.response.data.error);
        }
    };

    return (
        <>
            <div className="mt-4 flex grow items-center justify-around mb-20">
                <div className="mx-auto my-auto ">
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form
                        className="sm:w-full md:max-w-md mx-auto "
                        onSubmit={registerUser}
                    >
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="email@mail.com"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <button className="primary hover:bg-pink-700 my-2">
                            Register
                        </button>
                    </form>
                    <div className="py-2 text-center text-gray-700 text-lg">
                        Alresdy have an account?{" "}
                        <Link
                            to={"/login"}
                            className="hover:text-gray-500 ml-1 text-black underline"
                        >
                            Login
                        </Link>{" "}
                    </div>
                </div>
            </div>
        </>
    );
}
