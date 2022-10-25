const mongoose = require('mongoose');
const schema = mongoose.Schema;

const emailListSchema = new schema ({
  email: {
    type: String,
    required: true,
  }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('emailList', emailListSchema);
