import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middleware/authMiddleware.js";

/*Router Object */
const router = express.Router();

/*Routing */

/*Register Route with Post method */
router.post("/register", registerController);

/*Login User with POst method */
router.post("/login", loginController);

/*Test route */
router.get("/test", requiredSignIn, isAdmin, testController);

export default router;
