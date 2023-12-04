const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String, //permanent array of categories
      required: true,
    },
    loaderUrl: { type: String },
    dataUrl: { type: String },
    frameworkUrl: { type: String },
    codeUrl: { type: String },
    rating: {
      type: Number,
      default: 0,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
      required: true,
    },

    filesUrl: {
      type: String,
      //required:true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Game = model("Game", gameSchema);
module.exports = Game;
