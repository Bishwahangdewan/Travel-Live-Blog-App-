const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
  title : {
    type: String,
    required: true,
  },
  article : {
    type: String,
    required: true,
  },
  description : {
    type: String,
    max: 170,
    required: true,
  },
  image : {
    type : String,
  },
},
{
  timestamps : true
})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
