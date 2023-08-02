import { sanityClient } from "@/config/sanity";
import { IRide } from "@/models/IRide";
import { groq } from "next-sanity";

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
    }
  }`);
};

const getRecents: () => Promise<IRide[]> = () => {
  return sanityClient.fetch(groq`*[_type == "ride"][date != "${
    new Date().toISOString().split("T")[0]
  }"] | order(date desc)[0..2]{
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
    }
  }`);
};

const getAll: () => Promise<IRide[]> = () => {
  return sanityClient.fetch(groq`*[_type == "ride"]{
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
    }
  }`);
};

export const rideService = {
  getToday,
  getAll,
  getRecents,
  getById,
};
