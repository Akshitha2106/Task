import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  // console.log(req.headers["auth"]);
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access Denied"));
  }
  const token = req.headers["auth"];
//   console.log(token);
  try {
    const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
    // console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTIY, "Invalid token")
    );
  }
};
export default AuthMiddleware;