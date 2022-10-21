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
},
{
  timestamps : true 
})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
