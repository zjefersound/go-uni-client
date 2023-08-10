import { IRide } from "@/models/IRide";
import { arrayOfKeys } from "@/utils/arrayOfKeys";
import { daysInMonth } from "@/utils/daysInMonth";
import clsx from "clsx";

interface Props {
  firstDate: Date;
  rides: IRide[];
}

export function WeekBar({ firstDate, rides = [] }: Props) {
  const firstDay = firstDate.getDate();
  const lastDay = daysInMonth(firstDate.getMonth(), firstDate.getFullYear());
  const dayInitials = ["S", "T", "Q", "Q", "S", "S", "D"];
  return (
    <ul className="flex justify-between">
      {arrayOfKeys(7).map((index) => (
        <li key={index} className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">{dayInitials[index]}</span>
          <div
            className={clsx(
              "h-[2.5rem] w-[2.5rem] rounded-full font-bold flex items-center justify-center border",
              {
                "bg-emerald-100 text-emerald-600 border-emerald-300": rides[index]?.paid,
              },
              {
                "bg-red-100 text-red-600 border-red-300": rides[index] && !rides[index]?.paid,
              },
              {
                "bg-gray-100 text-gray-600": !rides[index],
              }
            )}
          >
            {firstDay + index <= lastDay
              ? firstDay + index
              : (firstDay + index) % lastDay}
          </div>
        </li>
      ))}
    </ul>
  );
}
