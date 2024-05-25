import jwt from "jsonwebtoken"

export default function isAuthenticated(req, res, next) {

    try {
        // maybe the following field needs to be defined at the frontend... TODO
        // writing Authorization does not help... must write authorization only
        // console.log("auth header:", req.headers.authorization);
        const reqauth = req.headers.authorization
        const token = reqauth ? reqauth.split(" ")[1] : null
        console.log(!token);
        console.log("token=", token);
        if (!token) {
            console.log("Unauthorized");
            return res.status(401).json({ message: "Unauthorized" })
        }

        // console.log("token:",token) ; 

        const isCustomAuth = token.length < 500
        console.log("isCustomAuth:", isCustomAuth);
        let decodedInfo = jwt.decode(token);

        if (decodedInfo) {
            if ((new Date().getTime()) > decodedInfo.exp * 1000)
                return res.status(401).json({ message: "Unauthorized/Token expired" })
        }

        if (token && isCustomAuth) {

            decodedInfo = jwt.verify(token, 'test')

            // userid field now contains the id made by mongo for custom auth users
            console.log("decoded for custom auth:", decodedInfo);
            req.userid = decodedInfo.id

        }
        else {
            // need to add a field for token in redux store for google auth users
            decodedInfo = jwt.decode(token);

            // userid field now contains the subid from google auth users
            req.userid = decodedInfo?.sub
        }

        next()

    } catch (error) {
        console.log("some error in auth middleware\n", error);
        console.log(error instanceof jwt.TokenExpiredError);
        return res.status(401).json({ message: "Unauthorized/Error server-side" })
    }

}