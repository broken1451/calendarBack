import mongoose, { Model, Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: { type: Date, default: Date.now },
});

// cambiar la respuesta de moongose
eventSchema.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject(); // objeto q se esta serializando
  object.id = _id;
  return object;
});

export const EventModel = mongoose.model("Event", eventSchema);
