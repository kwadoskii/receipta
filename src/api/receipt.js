import client from "./client";

const endpoint = "receipts/";

const getAll = async () => {
  const {
    data: { data },
    ...response
  } = await client.get(endpoint);

  return { data, response };
};

const addNew = async (fields, config = {}) => {
  const { data, ...response } = await client.post(endpoint, fields, { ...config });

  return { data, response };
};

const getOne = async (receiptNumber, config) => {
  const { data, ...response } = await client.get(`${endpoint}pdf/${receiptNumber}`, {
    ...config,
  });

  return { data, response };
};

const exports = {
  addNew,
  getAll,
  getOne,
};

export default exports;
