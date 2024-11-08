import { model, Schema } from "mongoose";
import { INews } from "../types";

const newsSchema = new Schema<INews>(
  {
    _id: { type: String },
    imageURL: { type: String },
    title: { type: String },
    text: { type: String },
    date: { type: String },
    url: { type: String },
    id: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Pet = model<INews>("News", newsSchema);
