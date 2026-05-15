import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";

export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}