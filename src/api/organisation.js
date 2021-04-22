import client from "./client";

const endpoint = "/organisations";

const getDetails = async () => {
  const {
    data: { data },
    ...response
  } = await client.get(endpoint);

  return { data, response };
};

const editOrganisation = async (fields) => {
  const {
    data: { data },
    ...response
  } = await client.post(endpoint, fields);

  return { data, response };
};

const getLogo = async () => {
  const { data, ...response } = await client.get(`${endpoint}/logo`);

  return { data, response };
};

const changeLogo = async (logo) => {
  const { data, ...response } = await client.post(`${endpoint}/logo`, logo);

  return { data, response };
};

const exports = {
  changeLogo,
  editOrganisation,
  getDetails,
  getLogo,
};

export default exports;
