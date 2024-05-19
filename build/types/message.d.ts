interface IMessage {
  senderId: mongoose.Schema.Types.ObjectId
  receiverId: mongoose.Schema.Types.ObjectId
  isOpen: boolean
}

interface IMessageMethods {
  markAsRead(): Promise<void>
}

type MessageModel = Model<IMessage, {}, IMessageMethods>