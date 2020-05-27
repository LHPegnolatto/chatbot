const User = require('../models/user');

(async ()=>{
  if (await User.countDocuments() === 0) {
    await User.create({ 
      name: 'Default',
      email: 'admin',
      password: 'admin',
      admin: true
    });
  }
})();