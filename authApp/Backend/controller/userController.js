var service = require('../service');

module.exports.loginUser = async(req , res) =>
{
    try
    {
        var status = await service.loginUser(req.body);
        console.log(req.body);

        if(status)
            res.send({"status": true,  "message": "User signUp successfull"})
        else
            res.send({"status": false,  "message": "Error signUp user"})
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports.signUpUser = async (req, res) => {
    try {
      const userDetails = req.body; // Access the request body
      var status = await service.signUpUser(userDetails); // Pass the user details to the service
    
      console.log(userDetails);
      if (status) {
        res.send({ "status": true, "message": "User signUp successful" });
      } else {
        res.send({ "status": false, "message": "Error signing up user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
  };
  