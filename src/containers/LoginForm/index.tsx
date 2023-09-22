"use client";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Button } from "@/components/Button";
import { isValidLogin } from "./validation";
import { FormControl } from "@/components/forms/FormControl";
import { Loading } from "@/components/Loading";
import { useForm } from "@/hooks/useForm";

interface Props {
  submitText: string;
  onSubmit: (data: ILoginPayload) => Promise<void>;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export function LoginForm({ submitText, onSubmit }: Props) {
  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ILoginPayload>({
      onSubmit,
      validator: isValidLogin,
    });

  return (
    <form className="space-y-3 flex flex-col" onSubmit={handleSubmit}>
      <FormControl id="username" label="Username" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineUser />
          </TextInput.Icon>
          <TextInput.Input
            value={data.username}
            onChange={(e) => handleChangeValue("username", e.target.value)}
            placeholder="Digite o username..."
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="password" label="Senha" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            <AiOutlineLock />
          </TextInput.Icon>
          <TextInput.Input
            type="password"
            value={data.password}
            onChange={(e) => handleChangeValue("password", e.target.value)}
            placeholder="******"
            required
          />
        </TextInput.Root>
      </FormControl>
      <Button disabled={loading}>
        {loading && <Loading className="mr-2" size="sm" />}
        {submitText}
      </Button>
    </form>
  );
}
