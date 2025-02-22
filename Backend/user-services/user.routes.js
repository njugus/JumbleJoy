import { registerNewUser } from "./user.controllers";
import { loginUser } from "./user.controllers";
import { Router} from 'express'

const router = Router()

router.post("/register", registerNewUser)
router.post("/login", loginUser)

export default router