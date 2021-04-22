import client from "./client";

const endpoint = "users/";

const getAll = async () => {
  const {
    data: { data },
    ...response
  } = await client.get(endpoint);

  return { data, response };
};

const deleteUser = async (userId) => {
  const {
    data: { data },
    ...response
  } = await client.delete(endpoint + userId);

  return { data, response };
};

const addUser = async (userDetails) => {
  const {
    data: { data },
    ...response
  } = await client.post(endpoint, { ...userDetails });
  return { data, response };
};

const editUser = async (userDetails) => {
  const {
    data: { data },
    ...response
  } = await client.patch(endpoint, { ...userDetails });

  return { data, response };
};

const changePassword = async (details) => {
  const { data, ...response } = await client.post(endpoint + "changepassword", {
    ...details,
  });

  return { data, response };
};

const getUser = async (userId) => {
  const {
    data: { data },
    ...response
  } = await client.get(`${endpoint}/${userId}`);

  return { data, response };
};

const exports = {
  addUser,
  changePassword,
  deleteUser,
  editUser,
  getAll,
  getUser,
};

export default exports;
