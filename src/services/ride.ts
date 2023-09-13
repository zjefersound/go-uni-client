import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { sanityClient } from "@/configs/sanity";
import { IRide } from "@/models/IRide";
import { IServiceOptions } from "@/models/IServiceOptions";
import { dateToString } from "@/utils/date/dateToString";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { toSanityRef } from "@/utils/toSanityRef";
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
  billIds: string[];
}

export interface IRidePatchPayload extends Partial<IRidePayload> {}

const getToday: () => Promise<IRide> = async () => {
  const user = await getSessionUser();
  return sanityClient.fetch(groq`*[_type == "ride"][date == "${
    new Date().toISOString().split("T")[0]
  }"][driver._ref == "${user.id}"][0]{
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

const getRecents: () => Promise<IRide[]> = async () => {
  const user = await getSessionUser();
  return sanityClient.fetch(groq`*[_type == "ride"][date != "${dateToString(
    new Date()
  )}"][driver._ref == "${user.id}"] | order(date desc)[0..3]{
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

const getAll: (options?: IServiceOptions) => Promise<IRide[]> = async ({
  filters,
} = {}) => {
  const user = await getSessionUser();
  return sanityClient.fetch(groq`*[_type == "ride"][driver._ref == "${
    user.id
  }"] ${filtersToGroq(filters)} | order(date desc){
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
    bills[] -> {
      ...,
      payer -> {
        ...
      },
      receiver -> {
        ...
      },
    },
    car -> {
      ...
    },
    trip -> {
      ...
    }
  }`);
};

const create = async (ride: IRidePayload) => {
  const user = await getSessionUser();
  const bills = ride.billIds?.map(toSanityRef) || [];

  return sanityClient.create({
    _type: "ride",
    date: ride.date,
    passengers: ride.passengers,
    passengersOneWay: ride.passengersOneWay,
    pricePerPassenger: ride.pricePerPassenger,
    extraCosts: ride.extraCosts,
    observations: ride.observations,
    paid: ride.paid,
    trip: toSanityRef(ride.tripId),
    car: toSanityRef(ride.carId),
    driver: toSanityRef(user.id),
    bills,
  });
};

const patch = (id: string, ride: IRidePatchPayload) => {
  const payload: any = { ...ride };
  if (ride.billIds) {
    payload.bills = ride.billIds?.map(toSanityRef) || [];
    delete payload.billIds;
  }
  if (ride.tripId) {
    payload.trip = toSanityRef(ride.tripId);
    delete payload.tripId;
  }
  if (ride.carId) {
    payload.car = toSanityRef(ride.carId);
    delete payload.carId;
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
