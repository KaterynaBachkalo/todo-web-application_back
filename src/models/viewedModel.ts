import { model, Schema } from "mongoose";
import { IFavorite } from "../types";

const viewedSchema = new Schema<IFavorite>(
  {
    _id: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Viewed = model<IFavorite>("Viewed", viewedSchema);
