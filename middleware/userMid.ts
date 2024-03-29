import jwt from "jwt-simple";

export const isAdmin = async (req, res, next) => {
  try {
    
    const { userInfo } = req.cookies;
   
    
    const secret = process.env.JWT_secret;
    if (!secret) throw new Error("no secret found in the server");
    if (!userInfo) throw new Error('"userInfo" not found ');
    const decoded = jwt.decode(userInfo, secret);
    

    if (decoded.role === "admin") {
    req.role='admin'
      next();
    } else {
      res.status(403).send({ error: "user is not authorized to see users" });
      
      console.log( "user is not authorized to see users")
    }
    
  } catch (error) {
    console.error("error is in isAdmin", error.message);
    res.send({ error: error.message });
  }
};

//--get id of person who last changed something like which admin erased a user or updated
export const getId = async (req, res, next) => {
  try {
    
    const { userInfo } = req.cookies;
    const secret = process.env.JWT_secret;
    if (!secret) throw new Error("no secret found in the server");
    const decoded = jwt.decode(userInfo, secret);
   
    const { id } = decoded;
    
    if (id && decoded.role==='admin' ) {
      req.id = id;
    
      next();
     
    }
    
  } catch (error) {
    console.error(error.message);
    res.send({ error: error.message });
   
  }
};


