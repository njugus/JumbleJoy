import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
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