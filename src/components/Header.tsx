import Link from "next/link";
import { AiOutlineCar, AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
  title?: string;
  goBackHref?: string;
}

export function Header({ goBackHref, title }: Props) {
  return (
    <div className="h-16 border-b flex items-center px-3">
      {goBackHref && <Link href={goBackHref}> <AiOutlineArrowLeft className="h-5 w-5 mr-2"/></Link>}
      <AiOutlineCar className="h-7 w-7 text-emerald-600 mr-1" />
      <h1 className="font-extrabold text-lg tracking-widest">
        {title || (
          <>
            Go
            <span className="text-emerald-600">UNI</span>
          </>
        )}
      </h1>
    </div>
  );
}
