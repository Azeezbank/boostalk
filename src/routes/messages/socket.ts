import { Server, Socket } from "socket.io";
import Messages from "@/models/Messages.model";
import { v4 as uuidv4} from 'uuid';

const users: Record<string, string> = {};

const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);

    socket.on("register", (userId: string) => {
      users[userId] = socket.id;
      console.log("User registered:", userId);
    });

    socket.on("private_message", async ({ senderId, receiverId, content }) => {
      const receiverSocket = users[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("private_message", {
          senderId,
          content,
        });
      }
      // Save to DB
      const id = uuidv4();
      await Messages.create({id, senderId, receiverId, content})
    });

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocket = users[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("typing", { senderId });
      }
    });

    socket.on("read_message", ({ senderId, receiverId, messageId }) => {
      const senderSocket = users[senderId];
      if (senderSocket) {
        io.to(senderSocket).emit("read_message", {
          receiverId,
          messageId,
        });
      }
    });

    socket.on("disconnect", () => {
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default initializeSocket;