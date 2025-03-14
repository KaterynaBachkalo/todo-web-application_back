import { model, Schema, Types } from "mongoose";
import { INotice } from "../types";

const noticeSchema = new Schema<INotice>(
  {
    _id: {
      type: Types.ObjectId,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    imgURL: {
      type: String,
    },
    species: {
      type: String,
    },
    birthday: {
      type: String,
    },
    sex: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    comment: {
      type: String,
    },
    locationId: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    popularity: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Notice = model<INotice>("Notice", noticeSchema);
