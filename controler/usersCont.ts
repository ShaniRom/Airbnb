import Users from "../model/usersModel";
import jwt from "jwt-simple";

export const login = async (req, res) => {
  try {

    const { username, password, role } = req.body;
    if (
      typeof username === "string" &&
      typeof password === "string" &&
      typeof role === "string"
    ) {
      const user = await Users.findOne({ username, password, role });
      if (user) {
        if (user.password === password) {
          const secret = process.env.JWT_SECRET;
          const payload = { username, id: user._id, role };
          const token = jwt.encode(payload, secret);

          res.cookie("userInfo", token, { maxAge: 900000, httpOnly: true });
          
          res.send({ ok: true, login: true });

          return;
        }
      }

      throw new Error("username or password or role are incorrect");
    } else {
      throw new Error("username or password or role is missing");
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
  
    let { username, password, role } = req.body;
    if (
      typeof username === "string" &&
      typeof password === "string" &&
      typeof role === "string"
    ) {
      const newUser = new Users({ username, password, role });
      const result = await newUser.save();
      const payload = { username, id: newUser._id, role };
      const secret = process.env.JWT_SECRET;
      const token = jwt.encode(payload, secret);
      res.cookie("userInfo", token, { httpOnly: true });
      res.send({ ok: true, register: true });
    } else {
      throw new Error("username or password or role is missing");
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const signOutUser = async (req, res) => {
  try {
    const { userInfo } = req.cookies;

    if (userInfo) {
      res.clearCookie("userInfo");
      res.send({ signedOut: true });

      return;
    }
    throw new Error(" no user to sign out from ");
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

/////// for navbar to check if there is a user logged in

export const loggedInUser = async (req, res, next) => {
  try {
    const { userInfo } = req.cookies;
    if (!userInfo) throw new Error('"userInfo" not found ');

    if (userInfo) {
      const secret = process.env.JWT_secret;
      if (!secret) throw new Error("no secret found in the server");
      const decoded = jwt.decode(userInfo, secret);
     
      res.send({ username: decoded.username, role: decoded.role });
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    
    //console.log(`user id is ${req.id} and the role is ${req.role}`);
    const { userInfo } = req.cookies;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.decode(userInfo, secret);
   
    if (decoded && decoded.role === "admin") {
      const users = await Users.find({ role: { $ne: "admin" } });

      res.send({ ok: true, users });

      return;
    }
    throw new Error("user is not allowed ");
  } catch (error) {
    console.log("error on getUsers", error.message);
    res.send({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, username } = req.body;
    if (username && userId) {
      const users = await Users.updateOne(
        { _id: userId },
        { username: username }
      );
      res.send({ ok: true, users });
    } else {
      throw new Error("username or userId  is missing");
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const users = await Users.deleteOne({ _id: userId });
      res.send({ ok: true, users });
    } else {
      throw new Error(" userId  is missing");
    }
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
  }
};
