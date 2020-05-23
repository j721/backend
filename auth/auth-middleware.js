const jwt = require("jsonwebtoken");

//verify users are logged in

module.exports = (req, res, next) => {

    const token = req.headers.authorization;
    if (token) {
        const secret = process.env.JWT_SECRET || "top secret!";

        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: "you cannot pass!" }); // the token is invalid

                req.jwt = decodedToken;
                next();  // the token is good
            }
        });
    } else {
        res.status(400).json({ message: "Please provide the authentication information" });
    }
};