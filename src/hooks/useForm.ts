import {
  IValidationError,
  IValidationReturn,
} from "@/models/IValidationReturn";
import { FormEvent, useState } from "react";

interface Props {
  initialData?: any;
  defaultData?: any;
  onSubmit: (data: any) => Promise<any>;
  validator: (data: any) => IValidationReturn;
}
export function useForm<T=unknown>({
  initialData,
  defaultData,
  onSubmit,
  validator,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData || defaultData || ({} as any));

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleChangeValue = (id: string, value: any) => {
    setData((d: any) => ({ ...d, [id]: value }));
    const newErrors = errors.filter((error) => error.field !== id);
    setErrors(newErrors);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const { isValid, errors: newErrors } = validator(data);

    if (!isValid) {
      setErrors(newErrors);
      setLoading(false);
    } else {
      setErrors([]);
      setData(defaultData);
      onSubmit(data).finally(() => setLoading(false));
    }
  };

  return {
    data: data as T,
    setData,
    loading,
    setLoading,
    handleChangeValue,
    handleSubmit,
    errors,
  };
}
