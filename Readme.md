# Develop

**_ UPDATE appBaseUrl IN config.ts when IP CHANGES _**

# Socket server actions

active -> Emit when user signed in -> payload: { uid: userWhoSignedInUid }
reconnect -> Emit if socket disconnected -> payload: User
connect-request -> Emit when user sends connection request -> payload: {requestSender: {firstname: senderName, lastname: senderLastName}, receiverId: receiverUid}
accept-connect -> Emit when user accepts connection request -> payload: User
isTyping -> Emit when user is typing a message -> payload: {uid: receiverUid, isTyping: boolean }
send-message -> Emit when user sends a message -> payload: Message
inactive -> Emit when user signs out -> payload: { uid: userWhoSignedOutUid }
