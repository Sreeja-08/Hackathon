import { verifyToken } from "./auth";

export function getUserFromRequest(req: Request) {
  const authHeader =
    req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded: any = verifyToken(token);

  return decoded.userId;
}