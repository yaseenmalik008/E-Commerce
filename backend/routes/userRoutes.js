import  express from "express";
import { authUser ,getuserProfile,registerUser} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getuserProfile)

export default router