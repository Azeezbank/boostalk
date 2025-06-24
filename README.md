# boostalk-backend

To install dependencies:

```bash
bun install
```

To run:

```bash
npm run dev
```

# Boostalk-Backend

This is auth route for registring user


# 🧠 Socket.IO Messaging API

**Base URL**: `https://boostalk.onrender.com`

---

## 🔌 Events You Emit

### 1. `register`
Registers a user’s socket.

**Payload:**
```json
{
  "userId": "string"
}
2. private_message
Send a private message.

Payload:
json
{
  "senderId": "string",
  "receiverId": "string",
  "content": "string"
}

3. typing
Show typing status to the receiver.

Payload:
json
{
  "senderId": "string",
  "receiverId": "string"
}
4. read_message
Notify sender that message has been read.

Payload:

json
{
  "senderId": "string",
  "receiverId": "string",
  "messageId": "string"
}

📥 Events You Receive
1. private_message
json
{
  "senderId": "string",
  "message": "string"
}
2. typing
json
{
  "senderId": "string"
}
3. read_message
json
{
  "receiverId": "string",
  "messageId": "string"
}