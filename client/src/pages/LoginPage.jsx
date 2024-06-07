import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = await axios.post(
                "https://airbnb-api-topaz.vercel.app/login",
                {
                    email,
                    password,
                }
            );
            setUser(userInfo.data);

            if (userInfo.status == 200) {
                alert("Login Successful");
                setRedirect(true);
            }
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <div className="mt-4 flex grow items-center justify-around mb-20">
                <div className="mx-auto my-auto ">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form
                        className="sm:w-full md:max-w-md mx-auto"
                        onSubmit={handleLoginSubmit}
                    >
                        <input
                            type="email"
                            placeholder="email@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="primary hover:bg-pink-700 my-2">
                            Login
                        </button>
                    </form>
                    <div className="py-2 text-center text-gray-700 text-lg">
                        Don&apos;t have an account?{" "}
                        <Link
                            to={"/register"}
                            className="hover:text-gray-500 ml-1 text-black underline"
                        >
                            Register
                        </Link>{" "}
                    </div>
                    <div className="py-2 text-center text-gray-700 text-lg">
                        OR
                    </div>
                    <Link
                        to={"/"}
                        className="py-1 items-center justify-center flex text-gray-700 text-lg bg-gray-100 rounded-full hover:bg-slate-200 cursor-pointer"
                    >
                        <div className="text-xl  text-gray-700 text-center">
                            Visit HomePage
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
