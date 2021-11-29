import { Schema, model } from 'mongoose';

export interface IRole extends Document {
  name: string;
}

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
