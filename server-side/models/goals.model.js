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
    User: {
      type: mongooose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongooose.model('Goal', goalSchema);
