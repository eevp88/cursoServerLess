import {Schema, Document, Connection, Model} from "mongoose";

export interface Pet extends Document {
    name: string;
    type: string;
    description: string;
}

export const petSchema = new Schema<Pet>({
  name: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String, required: true},
});

export const petsModel = (conn: Connection): Model<Pet> => {
  return conn.model<Pet>("Pets", petSchema);
};
