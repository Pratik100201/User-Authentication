import userModel from "../model/userModel.js";
import hashPassword, { comparePassword } from "../helper/authhelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, password, email, address, phone } = req.body;

    //Validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone Number is Required" });
    }

    //Existing
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("User Already Existing now Login");
      res.status(201).send({
        success: true,
        message: " User Already Exist",
      });
    }

    // Registration
    const hashedPassword = await hashPassword(password);

    //Save User
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: " User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in Registration ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //user validation
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User doesnot Exist",
      });
    }

    //Matching Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    //Next Token creation
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User Loged in Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(`Error in Login ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

/*Test middleware */
export const testController = (req, res) => {
  console.log("Protected ");
};

//export default { registerController, loginController };
