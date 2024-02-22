import Jwt from "jsonwebtoken";
export const verifiedUser = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const secretKey = process.env.JWT_SECRET;
    const user = Jwt.verify(authorization, secretKey);
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Otp not recieved" });
    console.log(error.message);
  }
};
