export const saveUserFace = (username, descriptor) => {
  let users = JSON.parse(localStorage.getItem("users")) || {};

  users[username] = Array.from(descriptor);

  localStorage.setItem("users", JSON.stringify(users));
};

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || {};
};