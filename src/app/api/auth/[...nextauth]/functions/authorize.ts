import { userService } from "@/services/user";
import { verifyPassword } from "./verifyPassword";

interface CredentialsProps {
  username: string;
  password: string;
}

export async function authorize(credentials?: CredentialsProps) {
  if (!credentials?.username || !credentials?.password) return null;

  const authorizedId = await verifyPassword(
    credentials.username,
    credentials.password
  );

  if (authorizedId) {
    const user = await userService.getById(authorizedId);
    return {
      id: user._id,
      email: user.email,
      image: user.avatar,
      name: user.name,
    } as any;
  } else {
    return null;
  }
}