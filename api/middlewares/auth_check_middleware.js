const jwt = require("jsonwebtoken");
const Author = require("../models/author_model");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTSecret);
        
        
        const author = await Author.findByPk(decoded.authorId);
        if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
        }

        req.authorId = decoded.authorId;
        next();
    } catch (error) {
        console.log("Token verify error:", error);
        res.status(401).json({ message: "Authentication failed" });
        return;
    }
};