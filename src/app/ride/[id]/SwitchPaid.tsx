'use client';
import { Switch } from "@/components/forms/Switch";
import { IRide } from "@/models/IRide";

interface Props {
  ride: IRide;
}
export function SwitchPaid({ ride }: Props) {
  return <Switch value={false} onChange={value => { alert( 'ok')}}/>;
}
