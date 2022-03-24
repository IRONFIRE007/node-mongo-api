import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/companydb")
.then(db => console.log("Connect"))
.catch(err => console.log("Error: " + err));