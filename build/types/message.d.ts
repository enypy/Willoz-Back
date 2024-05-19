interface IMessage {
  senderId: mongoose.Schema.Types.ObjectId
  receiverId: mongoose.Schema.Types.ObjectId
  isOpen: boolean
  content: string
}

interface IMessageMethods {
  markAsRead(): Promise<void>
}

type MessageModel = Model<IMessage, {}, IMessageMethods>