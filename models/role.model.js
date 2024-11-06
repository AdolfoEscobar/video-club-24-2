const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    resource: {
      type: String,
      required: true
    },
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete', 'manage'],
      required: true
    }]
  }],
  description: {
    type: String
  }
}, {
  timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
