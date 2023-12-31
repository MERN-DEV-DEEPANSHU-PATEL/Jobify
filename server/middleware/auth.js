import { UnAuthenticatedError } from "./custom-api-errors.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid : not mech mid.");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (error) {
    throw new UnAuthenticatedError(
      "Authentication Invalid : not verify token mid"
    );
  }
  next();
};

export default auth;
