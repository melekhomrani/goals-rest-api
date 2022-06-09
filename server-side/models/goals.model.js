const mongooose = require('mongoose');

const goalSchema = new mongooose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooose.model('Goal', goalSchema);
