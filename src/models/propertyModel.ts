import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
  service: { type: String, required: true },
  accountNumber: { type: String, required: true },
});

const PropertySchema = new Schema({
  name: { type: String, required: true },
  accounts: {
    type: [AccountSchema],
    default: [],
  },
});

const Property = model('Property', PropertySchema);

export default Property;