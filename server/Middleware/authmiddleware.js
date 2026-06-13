const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // const token = req.cookies.token;
        // console.log(token);

        const token = res.cookie("token", token, {
            httpOnly: true,
            secure: true,        // production ke liye MUST
            sameSite: "none",    // cross-site cookie allow
        });
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // // console.log(decoded);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;