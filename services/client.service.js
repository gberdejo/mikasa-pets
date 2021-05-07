const Client = require("../models/client");
const bcryptjs = require("bcryptjs");
const clientService = {};

clientService.registerClient = async (obj) => {
  try {
    const client = Client.build(obj);
    if (client instanceof Client) {
      const salt = bcryptjs.genSaltSync(10);
      client.password = bcryptjs.hashSync(obj.password, salt);
      await client.save();
      return client.dataValues;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
clientService.getClientbyEmail = async (email) => {
  try {
    const client = await Client.findOne({ where: { email } });
    if (client) return client.dataValues;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
clientService.getClientbyId = async (id) => {
  try {
    const client = await Client.findOne({
      where: { id },
    });
    if (client) return client.dataValues;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = clientService;
