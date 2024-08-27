var User = require('./model/User');

module.exports.loginUser = (userDetails) => {
  var email = userDetails.email;
  var password = userDetails.password;
  return User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.error("User not found");
        return false;
      }
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            console.log("Login successful");
            return true;
          } else {
            console.error("Incorrect password");
            return false;
          }
        });
    })
    .catch((error) => {
      console.error("Error during login:", error);
      return false;
    });
};



module.exports.signUpUser = (userDetails) => {
    console.log("@@@@@@@",userDetails)
  const data = new User({
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password
  });
  console.log("######",data)
  return data.save()
    .then(() => {
      console.log("Data saved successfully");
      return true;
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      return false;
    });
};
