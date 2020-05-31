const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list1_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connected to db'));
db.once('open', function(){
    console.log('successful');
});