const express = require('express')
const router = express.Router()
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/a768678405854cf584ae620be7844cc3'))
const abi = require('../modules/BATTLEPool.json')
const contract = new web3.eth.Contract(abi.abi, '0xa9CDb5e3C911884Ca6D4b32273c219B536Ee9e6A')
const { web3RejectUnauthenticated } = require('../middleware/web3-authentication');
const Nft = require('../schemas/Nft.schema')
const NftType = require('../schemas/NftType.schema')

const xpTable = [
  {
    level: 1,
    xp: 0,
  },
  {
    level: 2,
    xp: 10,
  },
  {
    level: 3,
    xp: 25,
  },
  {
    level: 4,
    xp: 45,
  },
  {
    level: 5,
    xp: 70,
  },
  {
    level: 6,
    xp: 100,
  },
  {
    level: 7,
    xp: 135,
  },
  {
    level: 8,
    xp: 175,
  },
  {
    level: 9,
    xp: 220,
  },
  {
    level: 10,
    xp: 270,
  },
]

router.post('/get-by-user', async (req, res) => {
  try {
    //  add pagination and sorting
    let Nfts = await Nft.find({ owner: req.body.address });
    console.log("what i find", req.body, Nfts);
    res.send(Nfts);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.get('/', async (req, res) => {
  try {
    let Nft = await Nft.findOne({ _id: req.body.nftId });
    res.send(Nft);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/mint', web3RejectUnauthenticated, async (req, res) => {
  try {
    const { contractAddress, nftIds, owner } = req.body;

    let nftType = await NftType.findOne({ contractAddress });
    console.log("didwefind", nftType)
    if (nftType.numMinted + nftIds.length > nftType.mintLimit) {
      res.status(500).send("mint limit exceeded");
    }
    const { picture, rarity, stats, name } = nftType;

    let newNfts = [];
    for (let nftId of nftIds) {
      let newNft = new Nft({ nftId, contractAddress, picture, rarity, stats, nftType: nftType._id, name, owner })
      newNfts.push(newNft);
      await newNft.save();
    }
    nftType.numMinted += nftIds.length;
    await nftType.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/xp', web3RejectUnauthenticated, async (req, res) => {
  try {
    const { nftId, xp } = req.body.nftId;

    let nft = await Nft.findOne({ _id: nftId });
    nft.xp += xp;
    //  is xp cumulative, or is it the xp to the next level?
    //  caluclate next level and xp to next level

    await nft.save();
    res.send(newNft);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

module.exports = router
