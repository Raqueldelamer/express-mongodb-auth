const bcrypt = require("bcryptjs");


async function encryptPassword(password) {

  // create a "salt" to enhance the encryption
  // it's a random number that gives extra protection
  // const salt = await bcrypt.genSalt(10);
    const salt = "$2a$10$9HcgIykiI8MOH8eBm693Hu";
    const hashedPassword = await bcrypt.hash(password, salt);

  // you can save hashedPassword safely in a database
  // you cannot save password safely in a database 

    console.log(password);
  // console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
}
// encryptPassword("h3ll0");


async function checkPassword(password, hashedPassword) {
    const p = await encryptPassword(password);
  // console.log(password);

    if(p === hashedPassword) {
    console.log("Welcome, your password is: " + password);
    return true;
    } else {
    console.log("incorrect password")
    return false;
    }
}

encryptPassword("sk84evr!");
checkPassword("sk84evr!", "$2a$10$9HcgIykiI8MOH8eBm693Hu.pOVQ5CLGOnxOwZnpLpOHeT3GMURna6")