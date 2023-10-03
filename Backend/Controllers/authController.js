import userModal from "../Modals/userModal.js";
import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModal from "../Modals/orderModal.js";



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phoneno, address, answer, } = req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phoneno) {
      return res.send({ message: "Phone No is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //CHECK USER
    const existingUser = await userModal.findOne({ email });
    // EXISTING USER CONDITION CHECK
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }
    //REgister User
    const hashedPassword = await hashPassword(password);
    //SAVE
    const user = await new userModal({
      name,
      email,
      phoneno,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN 
export const loginController = async (req,res) => {
try {
  const {email,password} = req.body
  //VALIDATION
  if(!email || !password) {
    return res.status(404).send({
      success: false,
      message: "Invalid Email or Password"
    });
  }
  // CHECK USER
   const user = await userModal.findOne({email})
  if(!user) {
    return res.status(404).send({
      success: false,
      message: "Email is not Registered"
    });
  }
  const match = await comparePassword(password,user.password)   
  if(!match) {
    return res.status(200).send({
      success: false,
      message: "Invalid Password"
    });
  }
  // TOKEN GENERATE/CREATE

  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).send({
    success: true,
    message: "Login Successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,
      address: user.address,
      role: user.role,
    },
    token,
  });

} catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
}
};
//Forgot Password CONTOLLER
 export const forgotPasswordController = async (req, res) => {
try {
  const {email,answer, newPassword} = req.body;
  //Validation
  if (!email) {
    return res.status(400).send({ message: "Email is Required" });
  }
  if (!answer) {
    return res.status(400).send({ message: "Answer is Required" });
  }
  if (!newPassword) {
    return res.status(400).send({ message: " New Password is Required" });
  }
  //Check
  const user = await userModal.findOne({email, answer});
  //Validation
  if(!user) {
    return res.status(404).send({
      success: false,
      message: "Wrong Email or Answer",
    })
  }
const hashed = await hashPassword(newPassword);
await userModal.findByIdAndUpdate(user._id, {password: hashed });
res.status(200).send({
  success: true,
  message: "Password Reset Successfully",
});
} catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
});
}
 };

// TEST CONTROLLER
export const testController = async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//Update Profile
export const updateProfileController = async (req,res) => {
  try {
    const {name, email, password, phoneno, address} = req.body;
    const user = await userModal.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({error: "Password is Required and 6 character long"});
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModal.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
     phoneno:phoneno || user.phoneno,
     address: address || user.address,
    }, {new: true});
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Update Profile",
      error,
});
  }
};

//ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModal
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.error(error.stack);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error: error.message,
    });
  }
};
//All ORDERS admin
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModal
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
       .sort({createdAt: "-1"});
    res.json(orders);
  } catch (error) {
    console.error(error.stack);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error: error.message,
    });
  }
};

//ORDER STATUS CONTROLLER
export const orderStatusController = async (req,res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModal.findByIdAndUpdate(
      orderId,
       {status},
        {new: true}
        );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Updating Orders",
      error: error.message,
    });
  }
};