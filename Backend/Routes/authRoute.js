import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController,} from "../Controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";


// router object
const router = express.Router();

//Routing Perform

//Register || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//TEST || METHOD POST
router.post("/test", requireSignIn, isAdmin, testController);


//Protected USER Auth Route || METHOD GET
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok: true});
});
//Protected ADMIN  Auth Route || METHOD GET
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok: true});
});

//update Profile
router.put("/profile", requireSignIn, updateProfileController);

//ORDERS
router.get("/orders", requireSignIn, getOrdersController);

//ALL ORDERS
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//ORDER STATUS UPDATE
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;
