import { registerNewUser } from "./user.controllers";
import { Router} from 'express'

const router = Router()

router.post("/", registerNewUser)

export default router