import { userService } from "@/services/user";
import md5 from "md5";

export async function verifyPassword(username: string, password: string) {
  const user = await userService.getPasswordByUsername(username);
  if (user.password === md5(password)) {
    return user._id;
  }
  return null;
}