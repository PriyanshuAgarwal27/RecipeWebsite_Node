const sessionIdToUserMap = new Map();

const setUser = (id, user) => {
  sessionIdToUserMap.set(id, user);
  console.log(id);
  console.log(user);
};
const getUser = (id) => {
  sessionIdToUserMap.get(id);
};
module.exports = { setUser, getUser };
