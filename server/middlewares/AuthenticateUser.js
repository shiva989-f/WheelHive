import jwt from 'jsonwebtoken';
export const ensureAuthentication = async (req, res, next)=> {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res.status(403).json({msg: "Unauthorized, Please login!", success: true})
    }

    try {
        const decode = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decode
        next()
    } catch (error) {
        return res.status(403).json({ msg: "Unauthorized, Please Login!" });
    }
}