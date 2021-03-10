const { resolveTxt } = require('dns');
const Admin = require('../schemas/Admin.schema')

const web3RejectUnauthenticated = async (req, res, next) => {

  // const adminAccounts = ["0xD31bD1a793F935d01E5C144150FFFb96a8854495", "0x73EA59bE21c688E83f0fC37491327959408c7176"]

  // const s = req.body;
  // const address = req.body.address;
  // const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);

  // if (signingAddress === address && adminAccounts.includes(address)) {
  //   next();
  // } else {
  //   res.status(403).send('user not authenticated')
  //   return;
  // }

  //  use encryption for pw
  // const admin = await Admin.findOne({ username: "admin" });
  // if (admin.password === req.body.password) {
  //   next();
  // } else {
  //   res.status(403).send('user not authenticated')
  //   return;
  // }
  next();

}

module.exports = { web3RejectUnauthenticated }
