import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const SendMessage = async (chatId, senderId, receiverId, text) => {
  if (!text.trim()) return;

  await addDoc(collection(db, "chats", chatId, "messages"), {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });

  // 2. Update chat metadata
  await setDoc(
    doc(db, "chats", chatId),
    {
      participants: [senderId, receiverId], // sorted ideally
      lastMessage: text,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
