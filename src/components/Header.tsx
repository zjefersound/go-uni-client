import { AiOutlineCar } from "react-icons/ai";
export function Header() {
  return (
    <div className="h-16 border-b flex items-center px-3">
      <AiOutlineCar className="h-7 w-7 text-emerald-600 mr-1" />
      <h1 className="font-extrabold text-lg tracking-widest">
        Go
        <span className="text-emerald-600">UNI</span>
      </h1>
    </div>
  );
}
