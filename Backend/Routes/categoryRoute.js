import express from "express";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../Controllers/categoryController.js";

// router object
const router = express.Router();

//Routing Perform
//Create Category

router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//Update Category
router.post("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//GetAll Category
router.get("/get-category",  categoryController);

//Single Category 
router.get("/single-category/:slug",  singleCategoryController);

//Delete Category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;