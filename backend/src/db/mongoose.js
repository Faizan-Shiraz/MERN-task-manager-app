const mongoose = require("mongoose");
// const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     validate: {
//       validator: function(v) {
//         return v > 15;
//       },
//       message: props => `${props.value} is not a valid age number!`
//     },
//     default: 0
//   },
//   email: {
//     type: String,
//     validate: {
//       validator: v => {
//         return validator.isEmail(v);
//       },
//       message: () => "Please Enter valid E-mail"
//     },
//     required: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     validate: {
//       validator: v => {
//         return v.toLowerCase().includes("password");
//       },
//       message: "Invalid password"
//     },
//     minlength: 7,
//     required: true,
//     trim: true
//   }
// });

// const me = new User({
//   name: "Faizan",
//   age: 18,
//   email: "mango@mango.com",
//   password: "12345678"
// });

// me.save()
//   .then(r => console.log(r))
//   .catch(e => console.log("-------", e.message));

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const myTask = new Task({
//   description: "Task 2"
// });

// myTask
//   .save()
//   .then(r => console.log(r))
//   .catch(e => console.log(e));
