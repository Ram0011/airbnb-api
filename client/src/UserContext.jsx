import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fun = async () => {
            if (!user) {
                await axios
                    .get("https://airbnb-api-topaz.vercel.app/profile")
                    .then(({ data }) => {
                        // console.log(data.message);
                        if (data.message === "Unauthorized") {
                            setUser(null);
                        } else {
                            setUser(data);
                        }
                        setReady(true);
                    });
            }
        };
        fun();

        // eslint-disable-next-line
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
