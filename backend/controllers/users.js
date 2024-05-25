import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import user from '../models/user.js'
// import isAuthenticated from '../middleware/auth.js';

const JWT_EXPIRY_PERIOD = "1m"

export async function signin(req, res) {
    console.log("login form received:\n", req.body);

    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        console.log("existing user is:\n", existingUser);
        if (!existingUser) {
            // console.log("not an existing user");
            return res.json({ message: "not an existing user" });
        }
        else {
            // console.log("attempting to log in");
            // console.log("password is", password);
            const comparison = await bcrypt.compare(password, existingUser.password);
            console.log("comparison:", comparison);
            if (!comparison) {
                return res.status(400).json({ errmsg: "password does not match" })
            }
            else {
                //password correct, now sign a token send to the front end
                console.log("existing user:", existingUser);
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: JWT_EXPIRY_PERIOD })
                return res.status(200).json({ result: existingUser, token })
            }
        }

    } catch (error) {
        return res.json({ message: `some error on server --- ${error}` })
    }


}

export async function signup(req, res) {
    // first check if user already exists

    console.log("signup form received\n",req.body);

    const { email, password, confirmPassword, firstname, lastname } = req.body;
    console.log("password:",password, "\nconfirmpass:", confirmPassword, "\n");

    console.log(password!=confirmPassword);

    try {
        const existingUser = await user.findOne({ email })
        
        if (existingUser) {
            return res
            // .status(400)
            .json({ message: "User already exists" })
        }

        else {

            if (password !== confirmPassword) {
                return res
                // .status(400)
                .json({ message: "Password and confrom password don't match" })
            }

            else {
                const hashedPassword = await bcrypt.hash(password, 8)

                const newUser = new user({ email, password: hashedPassword, name: `${firstname} ${lastname}` })

                console.log(newUser);

                newUser.save().then((savedNewUser) => {
                    const token = jwt.sign({ email: savedNewUser.email, id: savedNewUser._id }, 'test', { expiresIn: "1h" })

                    return res.status(200).json({ result:savedNewUser, token })

                    console.log(user.find({}).then((foundUsers)=>{
                        console.log("foundUsers\n",foundUsers);
                    }).catch((err)=>{
                        console.log("error in find :", err);
                    }));

                })

                // const token = jwt.sign({email:})

            }
        }
    } catch (err) {
        return res.status(500).json({message:"some error in signup server side :", err})
    }

    // if exists then send 400
    // if doesnt exist then create the user after validations
    // then log the user in, send the user object


}