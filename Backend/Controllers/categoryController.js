import categoryModal from "../Modals/categoryModal.js";
import slugify from "slugify";

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
          }
        const existingCategory = await categoryModal.findOne({name})
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exists"
              });
        }
    const  category = await new categoryModal({name, slug: slugify(name)}).save();
    res.status(201).send({
        success: true,
        message: "New Category Created ",
        category,
      });

    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    })
}
};

//Update Category 
export const updateCategoryController = async (req,res) => {
try {
  const {name} = req.body;
  const {id} = req.params;

  const  category = await categoryModal.findByIdAndUpdate(
    id, 
    {name, slug: slugify(name)},
    {new: true}
    );
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  
} catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Category",
      error,
    });
}
};
//GetAll CategoryController

export const categoryController = async (req,res) => {
  try {
    const  category = await categoryModal.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all Categories",
      error,
    });
  }
};

//Single CategoryController
export const singleCategoryController =  async (req, res) => {
  try {
  const  category = await categoryModal.findOne({slug:req.params.slug});
  res.status(200).send({
    success: true,
    message: "Get single Category Successfully",
    category,
  });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Single Category",
      error,
    });
    
  }
};
//Delete CategoryController
export const deleteCategoryController = async (req,res) => {
  try {
    const {id} = req.params;
            await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting Category",
      error,
    });
  }
};