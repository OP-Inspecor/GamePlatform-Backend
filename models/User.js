const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    // created_games: {
    //   type: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    // },
    history_games: {
        type: [{ type: Schema.Types.ObjectId, ref: "Game" }],
    }
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
