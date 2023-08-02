import { sanityClient } from "@/config/sanity";
import { IRide } from "@/models/IRide";
import { groq } from "next-sanity";

const getRecents: () => Promise<IRide[]> = () => {
  return sanityClient.fetch(groq`*[_type == "ride"][0..2]{
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

export const rideService = {
  getAll,
  getRecents,
};
