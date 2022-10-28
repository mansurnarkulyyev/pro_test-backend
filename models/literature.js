const { Schema, model } = require("mongoose");
const Joi = require("joi");

const linkRexep =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const literatureSchema = new Schema(
  [
    {
      title: {
        type: String,
        default: "Article literature",
        required: [true, "Name of source is required"],
        unique: true,
      },
      link: {
        type: String,
        match: linkRexep,
      },
    },
  ],
  { versionKey: false, timestamps: true }
);

const Literature = model("literature", literatureSchema);

const literatureTemplate = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().pattern(linkRexep),
});

module.exports = {
  Literature,
  literatureTemplate,
};
