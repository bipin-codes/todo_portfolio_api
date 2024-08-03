const { Schema, default: mongoose } = require('mongoose');

const todoSchema = new Schema({
  task: { type: String, required: true },
  task_details: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

todoSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Model = mongoose.model('ToDo', todoSchema);
module.exports = { Model };
