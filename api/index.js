const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

//globals
const bcryptSalt = bcrypt.genSaltSync(11);
const jwtSecret = "thisisrandomstring";

//middleware
app.use(
    cors({
        credentials: true,
        origin: [
            "https://airbnb-two-ruddy.vercel.app",
            "http://localhost:5173",
            "https://my-fake-airbnb.netlify.app",
        ],
    })
);

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cookieParser());

//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected!"));

//global functions
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) reject(err);
            resolve(userData);
        });
    });
}

//routes
app.get("/test", (req, res) => {
    res.json("test Ok");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(422).json({ error: "Please add all the fields" });
        }

        const findMail = await User.findOne({ email });
        if (findMail) {
            return res.status(409).json({ error: "Email already exists!" });
        } else {
            const userDoc = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            });

            return res.json(userDoc);
        }
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    const userDoc = await User.findOne({ email });
    if (!userDoc) {
        return res.status(422).json({ error: "Email not Registered!" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            jwtSecret,
            {},
            (err, token) => {
                if (err) throw err;
                const isProduction = process.env.NODE_ENV === "production";
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: "None",
                }).json(userDoc);
            }
        );
    } else {
        res.status(422).json({ error: "Invalid Password!" });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json({ message: "Unauthorized" });
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }).json({ message: "Logged out!" });
});

app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: `${__dirname}/uploads/${newName}`,
    });
    res.json(newName);
});

// Multer configuration to use /tmp directory
const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
    const uploadedFiles = req.files.map((file) => {
        const newFileName =
            "photo" + Date.now() + path.extname(file.originalname);
        const newFilePath = path.join(__dirname, "uploads", newFileName);

        // Move the file from /tmp to /uploads
        fs.renameSync(file.path, newFilePath);

        return newFileName; // Return the new file name
    });
    res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
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
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        // Parse time strings to numbers (e.g., "14:00" to 14)
        const parsedCheckIn = parseInt(checkIn.split(":")[0]);
        const parsedCheckOut = parseInt(checkOut.split(":")[0]);

        try {
            const placeDoc = await Place.create({
                owner: userData.id,
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn: parsedCheckIn,
                checkOut: parsedCheckOut,
                maxGuests,
                price,
            });
            res.json(placeDoc);
        } catch (error) {
            // Handle any errors that occur during creation
            res.status(422).json({ error: error.message });
        }
    });
});

app.get("/places", async (req, res) => {
    res.json(await Place.find({}));
});

app.get("/user-places", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        const data = await Place.find({ owner: id });
        res.json(data);
    });
});

app.get("/places/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
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
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (placeDoc.owner.toString() === userData.id) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
            await placeDoc.save();
            res.json("Ok");
        }
    });
});

app.post("/bookings", async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ redirectTo: "/login" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
            req.body;

        Booking.create({
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price,
            user: userData.id,
        })
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                res.json({ message: "Something went wrong", error: err });
            });
    });
});

app.get("/bookings", async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        try {
            const bookings = await Booking.find({ user: userData.id }).populate(
                "place"
            );
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: "Database query failed" });
        }
    });
});

//listen
app.listen(4000, () => {
    console.log("Server running");
});
