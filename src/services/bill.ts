import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { sanityClient } from "@/configs/sanity";
import { IBill } from "@/models/IBill";
import { IServiceOptions } from "@/models/IServiceOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { groq } from "next-sanity";

export interface IBillPayload {
  payerId: string;
  receiverId: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  paid: boolean;
}

const getAll: (options?: IServiceOptions) => Promise<IBill[]> = async ({
  filters,
} = {}) => {
  const user = await getSessionUser();
  return sanityClient.fetch(groq`*[_type == "bill" && receiver._ref == "${
    user.id
  }"] ${filtersToGroq(filters)} | order(date desc) {
    _id,
    payer -> {
      _id,
      name,
      username,
      avatar,
    },
    receiver -> {
      _id,
      name,
      username,
      avatar,
    },
    date,
    amount,
    currency,
    description,
    paid,
  }`);
};

const getById: (id: string) => Promise<IBill> = (id) => {
  return sanityClient.fetch(groq`*[_type == "bill"][_id == "${id}"][0]{
    _id,
    payer -> {
      _id,
      name,
      username,
      avatar,
    },
    receiver -> {
      _id,
      name,
      username,
      avatar,
    },
    date,
    amount,
    currency,
    description,
    paid,
  }`);
};

const create = (bill: IBillPayload) => {
  const payload: any = {
    _type: "bill",
    date: bill.date,
    amount: bill.amount,
    currency: bill.currency,
    description: bill.description,
    paid: bill.paid,
    receiver: {
      _ref: bill.receiverId,
      _type: "reference",
    },
  };

  if (bill.payerId) {
    payload.payer = {
      _ref: bill.payerId,
      _type: "reference",
    };
  }
  return sanityClient.create(payload);
};

const patch = (id: string, bill: IBillPayload) => {
  const payload: any = { ...bill };

  if (bill.receiverId) {
    payload.receiver = {
      _ref: bill.receiverId,
      _type: "reference",
    };
    delete payload.receiverId;
  }
  if (bill.payerId) {
    payload.payer = {
      _ref: bill.payerId,
      _type: "reference",
    };
    delete payload.payerId;
  }

  return sanityClient.patch(id).set(payload).commit();
};

const handleDelete = (id: string) => {
  return sanityClient.delete(id);
};

export const fuelSupplyService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
};
