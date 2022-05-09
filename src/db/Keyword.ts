import { Schema, Document, model } from 'mongoose';

export interface IKeywordDoc extends Document {
  type: string;
  value: string;
}

const keywordSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Enter a type.']
  },
  value: {
    type: String,
    required: [true, 'Enter a value.'],
    unique: [true, 'That value is taken.']
  }
});

const Keyword = model<IKeywordDoc>('Keyword', keywordSchema);

export default Keyword;
