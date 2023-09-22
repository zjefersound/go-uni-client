export interface ITrip {
  _id: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
}

export interface ITripPayload {
  from: string;
  to: string;
  distance: number;
  duration: number;
}