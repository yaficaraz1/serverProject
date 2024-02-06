import { generateToken } from "../config/Jwt.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
    try {
        let { email, userName, password } = req.body;
        if (!userName || !email || !password)
            return res.status(404).send(" חסרים פרמטרים של שם משתמש או סיסמה או מייל ")
        if (!/^(?=[A-Za-z]{2}\d{6}$)/.test(password))
            return res.status(400).send(' הסיסמה אינה עומדת בכללים של שני אותיות ושש מספרים ')
        let hashedPassword = await bcrypt.hash(password, 15);//ליצור את הפונקציה הזו 

        let newUser = new User({ userName, password: hashedPassword, email });
        await newUser.save();
        let { _id, userName: y, role, email: e } = newUser;
        let token = generateToken(newUser);
        res.json({ userName: y, email: e, token });
    }
    catch (err) {
        res.status(500).send(" קרתה שגיעה ב" + err)
    }

}
//פונקציית log in המקבלת שם משתמש וסיסמה
export const login = async (req, res) => {
    try {
        let { userName, password } = req.body;
        if (!userName || !password)
            return res.status(404).send("פרמטרים נדרשים של  שם משתמש או סיסמה")
            if (!/^(?=[A-Za-z]{2}\d{6}$)/.test(password))
            return res.status(400).send(' הסיסמה אינה עומדת בכללים של שני אותיות ושש מספרים ')

        let loggedInUser = await User.findOne({ userName });
        if (!loggedInUser)
            return res.status(404).send(" איו לנו משתמש כזה במערכת נסה שוב ")
        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("איו לנו סיסמה  כזה במערכת נסה שוב ")
        let { userName: u, _id, email, role } = loggedInUser;
        let token = generateToken(loggedInUser);
        res.json({ _id, role, userName: u, token, email });

    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }

}
//פונקציה המחזירה את כול המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        let allusers = await User.find({}, "-password");//projection -לשלוך חלק מהשדות
        res.json(allusers);

    }
    catch (err) {
        res.status(500).send(" לא הצלחנו נסה שוב מאוחר יותר ")
    }

}

