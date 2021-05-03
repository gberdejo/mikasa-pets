const Client = require("../models/client");
const bcryptjs = require("bcryptjs");
const clientService = {};

clientService.registerClient = async (obj) => {
  try {
    const client = Client.build(obj);
    if (client instanceof Client) {
      const salt = bcryptjs.genSaltSync(10);
      client.password_client = bcryptjs.hashSync(obj.password_client, salt);
      await client.save();
      return client;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
clientService.findClientEmail = async (email) => {
  try {
    const client = await Client.findOne({ where: { email_client: email } });
    if (client) return client;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = clientService;
