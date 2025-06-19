// clean UserIds
const Clean = (userId) => {
  const cleanedID = (userId || "").replace(/-/g, "");
  return cleanedID;
};
// gennerate chatID
export const getChatID = (user1Id, user2Id) => {
  let cleanedUser1Id = Clean(user1Id);
  let cleanedUser2Id = Clean(user2Id);
  return [cleanedUser1Id, cleanedUser2Id].sort().join("_");
};
