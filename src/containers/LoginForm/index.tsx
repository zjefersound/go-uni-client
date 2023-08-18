"use client";
import { FormEvent, useState } from "react";
import { TextInput } from "@/components/forms/TextInput";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Button } from "@/components/Button";
import { isValidLogin } from "./validation";
import { IValidationError } from "@/models/IValidationReturn";
import { FormControl } from "@/components/forms/FormControl";
import { Loading } from "@/components/Loading";

interface Props {
  submitText: string;
  onSubmit: (data: ILoginPayload) => Promise<void>;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export function LoginForm({ submitText, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleChangeValue = (id: string, value: any) => {
    setData((d: any) => ({ ...d, [id]: value }));
    const newErrors = errors.filter((error) => error.field !== id);
    setErrors(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { isValid, errors: newErrors } = isValidLogin(data);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors([]);
      onSubmit(data).finally(() => setLoading(false));
    }
  };

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
