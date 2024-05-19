import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema<IMessage, MessageModel, IMessageMethods>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true })

MessageSchema.methods.markAsRead = async function () {
  this.isOpen = true
  await this.save()
}

export default mongoose.model("Message", MessageSchema)