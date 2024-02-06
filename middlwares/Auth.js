import jwt from "jsonwebtoken";
//פונקתיה הבודקת אם יש תוקן חוקי למשתמש אין כן נותנת לו לעבור למיידלאור הבא 
export const auth = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send(" אין תוקן בבקשה התחבר לאתר שוב ")
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();

    }
    catch (err) {
        res.status(401).send("תוקן זה אינו מורשה")
    }
}
// פונקציה הבודקת לפי התוקן האם הוא משתמש מנהל 
export const authAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("אין תוקן בבקשה התחבר לאתר שוב ")

    try {

        let user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role == "ADMIN") {
            req.user = user;
            next();
        }
        else
            return res.status(403).send(" אינך רשאי להגיע לפעולה זו")

    }
    catch (err) {
        res.status(401).send("תוקן זה אינו מורשה")
    }

}
