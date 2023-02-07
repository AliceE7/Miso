const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    prefix: String,
    guild: String,
  }
)

const Model = model("prefix", schema);

module.exports = {
  model: Model,
  addPrefix: async (message, prefix) => {
    return new Model({
      prefix: prefix,
      guild: message.guild.id
    }).save();
  },
  findPrefix: async (message) => {
    return Model.findOne({ guild: message.guild.id });
  },
  deletePrefix: async (message, reason) => {
    return Model.updateOne(
      { guild: message.guild.id },
      {
        status: "DELETED",
        $push: {
          status_updates: { guild: message.guild.id, status: "DELETED", reason },
        },
      }
    )
  },
};