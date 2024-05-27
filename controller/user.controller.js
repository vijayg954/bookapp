import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already registerd" });
    }
    const hashpassword = await bcryptjs.hash(password, 10);
    const createUser = new User({
      fullname: fullname,
      email: email,
      password: hashpassword,
    });
    await createUser.save();

    res.status(201).json({ message: "user created",user:{
      _id:createUser._id,
      fullname:createUser.fullname,
      email:createUser.email
    } });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const ismatch = await bcryptjs.compare(password, user.password);
    if (!user || !ismatch) {
      return res.status(400).json({ message: "invalid username or password" });
    } else {
      return res.status(200).json({
        message: "login success",
        user: { fullname: user.fullname, _id: user._id, email: user.email },
      });
    }
  } catch (error) {
    console.log("error" + error.message);
    res.status(500).json({ message: "server error" });
  }
};
