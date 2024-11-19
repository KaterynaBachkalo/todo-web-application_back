import { model, Schema } from "mongoose";
import { IFriend } from "../types";

const friendSchema = new Schema<IFriend>(
  {
    _id: { type: String },
    title: { type: String },
    url: { type: String },
    addressUrl: { type: String },
    imageUrl: { type: String },
    address: { type: String },
    workDays: [
      {
        _id: { type: String },
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
    ],
    phone: { type: String },
    email: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Friend = model<IFriend>("Friend", friendSchema);
