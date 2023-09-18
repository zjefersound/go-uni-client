import { nanoid } from 'nanoid';
export function toSanityRefWithKey(id: string) {
  return {
    _ref: id,
    _key: nanoid(),
    _type: "reference",
  };
}
