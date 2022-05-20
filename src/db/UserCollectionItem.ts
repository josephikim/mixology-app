import { Schema, Document, model } from 'mongoose';

import { IUserDoc } from './User';

export interface IUserCollectionItemDoc extends Document {
  user: IUserDoc;
  idDrink: string;
  rating?: number;
  notes?: string;
}

const userCollectionItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  idDrink: {
    type: String
  },
  rating: {
    type: Number
  },
  notes: {
    type: String
  }
});

const UserCollectionItem = model<IUserCollectionItemDoc>('UserCollectionItem', userCollectionItemSchema);

export default UserCollectionItem;
