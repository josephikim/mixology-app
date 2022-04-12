import { Schema, Document, model } from 'mongoose';

export interface IRoleDoc extends Document {
  name: string;
}

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Role = model<IRoleDoc>('Role', roleSchema);

export default Role;
