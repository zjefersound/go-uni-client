import { getSessionUser } from "@/app/api/auth/[...nextauth]/functions/getSessionUser";
import { sanityClient } from "@/configs/sanity";
import { IBill, IBillPayload } from "@/models/IBill";
import { IServiceOptions } from "@/models/IServiceOptions";
import { filtersToGroq } from "@/utils/filtersToGroq";
import { toSanityRef } from "@/utils/toSanityRef";
import { groq } from "next-sanity";

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
    receiver: toSanityRef(bill.receiverId),
  };

  if (bill.payerId) {
    payload.payer = toSanityRef(bill.payerId);
  }
  return sanityClient.create(payload);
};

const patch = (id: string, bill: IBillPayload) => {
  const payload: any = { ...bill };

  if (bill.receiverId) {
    payload.receiver = toSanityRef(bill.receiverId);
    delete payload.receiverId;
  }
  if (bill.payerId) {
    payload.payer = toSanityRef(bill.payerId);
    delete payload.payerId;
  }

  return sanityClient.patch(id).set(payload).commit();
};

const handleDelete = (id: string) => {
  return sanityClient.delete(id);
};

export const billService = {
  getAll,
  getById,
  create,
  patch,
  delete: handleDelete,
};
