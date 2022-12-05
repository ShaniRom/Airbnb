import jwt from "jwt-simple";

export const isAdmin = async (req, res, next) => {
  try {
    const { userInfo } = req.cookies;
    console.log(userInfo);
    if (!userInfo) throw new Error('"userInfo" not found ');
    const secret = process.env.JWT_secret;
    if (!secret) throw new Error("no secret found in the server");
    const decoded = jwt.decode(userInfo, secret);
    console.log(decoded);

    if (decoded.role === "admin") {
      req.role = "admin";
      //req.id=decoded.id
      next();
    } else {
      res.status(403).send({ error: "user is not authorized to see users" });
    }
  } catch (error) {
    console.log("error is in isAdmin", error.message);
    res.send({ error: error.message });
  }
};
//get id of person who last changed something like which wdmin erased a user or updated
export const getId = async (req, res, next) => {
  try {
    const { userInfo } = req.cookies;
    const secret = process.env.JWT_secret;
    if (!secret) throw new Error("no secret found in the server");
    const decoded = jwt.decode(userInfo, secret);
    const { id } = decoded;
    if (id) {
      req.id = id;
    }
    next();
  } catch (error) {
    console.log(error.message);

    next();
  }
};


