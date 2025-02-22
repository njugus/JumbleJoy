import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const prisma = new PrismaClient()

//register a new user
export const registerNewUser = async(req, res) => {
    try{
        const{ fullName, email, password, phone } = req.body
        //check whether the user with the email exists
        const existingUser = await prisma.user.findUnique({
            where : {email}
        }
    )
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User with email arleady exists"
            })
        }

        //hash the users password
        const hashedPassword = await bcrypt.hash(password, 10)
        //create a new user
        const newUser = await prisma.user.create({
            data : {
                fullName,
                email,
                password : hashedPassword,
                phone
            },
            select : {
                id,
                fullName,
                email,
                phone,
                role
            }
        })

        res.status(201).json({
            success : true,
            message : "User Registered Successfully",
            data : newUser
        })
    }catch(error){
        console.error("Error registering user", error)
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

//login controller
export const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const payload = {
            id : user.id,
            fullName : user.fullName,
            email : user.email,
            phone : user.phone,
            role : user.role
        }

        //create a token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
        //store the token in the cookie
        res.cookie('access_token', token).json({
            success : true,
            message : "Login Successfull",
            data : payload
        })

    }catch(error){
        console.error("Error Login in User", error)
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        })
    }
}
