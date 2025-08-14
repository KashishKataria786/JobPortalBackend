import bcrypt from 'bcrypt';
import {UserModel} from '../models/UserModel.js';
import  jwt from 'jsonwebtoken'

export const POSTRegisterUserController = async (req, res) => {
  const { name, email, password, phone , role} = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Missing Credentials" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await newUser.save();

    return res.status(201).send({ message: "User Created Successfully" , newUser});

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};
export const POSTLoginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Missing email or password" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ success:false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({success:false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name:user.name
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Return only necessary user info
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).send({
      message: `Welcome back, ${user.name}`,
      token,
      data: safeUser,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Server error" });
  }
};
