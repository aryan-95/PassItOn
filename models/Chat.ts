
import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  productId: mongoose.Types.ObjectId;
  buyerEmail: string;
  sellerEmail: string;
  messages: {
    sender: string; // email of sender
    message: string;
    timestamp: Date;
  }[];
  createdAt: Date;
}

const ChatSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  messages: [{
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

// Create compound index for efficient queries
ChatSchema.index({ productId: 1, buyerEmail: 1, sellerEmail: 1 });

export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
