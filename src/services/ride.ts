import { sanityClient } from "@/configs/sanity";
import { IRide } from "@/models/IRide";
import { IServiceOptions } from "@/models/IServiceOptions";
import { dateToString } from "@/utils/dateToString";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { groq } from "next-sanity";

export interface IRidePayload {
  date: string;
  paid: boolean;
  tripId: string;
  carId: string;
  passengers: number;
  passengersOneWay: number;
  pricePerPassenger: number;
  extraCosts: number;
  observations: string;
}
export interface IRidePatchPayload {
  date?: string;
  paid?: boolean;
  tripId?: string;
  carId?: string;
  passengers?: number;
  passengersOneWay?: number;
  pricePerPassenger?: number;
  extraCosts?: number;
  observations?: string;
}

const getToday: () => Promise<IRide> = () => {
  return sanityClient.fetch(groq`*[_type == "ride"][date == "${
    new Date().toISOString().split("T")[0]
  }"][0]{
    _id,
    _createdAt,
    passengers,
    passengersOneWay,
    date,
    pricePerPassenger,
    extraCosts,
    observations,
    paid,
    car -> {
      ...
    },
    trip -> {
      ...
    }
  }`);
};

const getRecents: () => Promise<IRide[]> = () => {
  return sanityClient.fetch(groq`*[_type == "ride"][date != "${dateToString(
    new Date()
  )}"] | order(date desc)[0..2]{
    _id,
    _createdAt,
    passengers,
    passengersOneWay,
    date,
    pricePerPassenger,
    extraCosts,
    observations,
    paid,
    car -> {
      ...
    },
    trip -> {
      ...
    }
  }`);
};

const getAll: (options?: IServiceOptions) => Promise<IRide[]> = ({
  filters,
} = {}) => {
  return sanityClient.fetch(groq`*[_type == "ride"] ${filtersToGroq(
    filters
  )} | order(date desc){
    _id,
    _createdAt,
    passengers,
    passengersOneWay,
    date,
    pricePerPassenger,
    extraCosts,
    observations,
    paid,
    car -> {
      ...
    },
    trip -> {
      ...
    }
  }`);
};

const getById: (id: string) => Promise<IRide> = (id) => {
  return sanityClient.fetch(groq`*[_type == "ride"][_id == "${id}"][0]{
    _id,
    _createdAt,
    passengers,
    passengersOneWay,
    date,
    pricePerPassenger,
    extraCosts,
    observations,
    paid,
    car -> {
      ...
    },
    trip -> {
      ...
    }
  }`);
};

const create = (ride: IRidePayload) => {
  return sanityClient.create({
    _type: "ride",
    date: ride.date,
    passengers: ride.passengers,
    passengersOneWay: ride.passengersOneWay,
    pricePerPassenger: ride.pricePerPassenger,
    extraCosts: ride.extraCosts,
    observations: ride.observations,
    paid: ride.paid,
    trip: {
      _ref: ride.tripId,
      _type: "reference",
    },
    car: {
      _ref: ride.carId,
      _type: "reference",
    },
  });
};

const patch = (id: string, ride: IRidePatchPayload) => {
  const payload: any = { ...ride };
  if (ride.tripId) {
    payload.trip = {
      _ref: ride.tripId,
      _type: "reference",
    };
  }
  if (ride.carId) {
    payload.car = {
      _ref: ride.carId,
      _type: "reference",
    };
  }
  return sanityClient.patch(id).set(payload).commit();
};

export const rideService = {
  getToday,
  getAll,
  getRecents,
  getById,
  create,
  patch,
};
