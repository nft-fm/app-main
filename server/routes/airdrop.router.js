const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const Airdrop = require("../schemas/Airdrop.schema");
const axios = require("axios");
const { airdropOnNFTPurchase } = require("../web3/server-utils.js");
const queryUrl = `https://api.opensea.io/graphql/`;
const ItemOwnersList_data_ttWlh = `{
    archetype(archetype: $archetype) {
      asset {
        assetOwners(first: 100) {
          edges {
            node {
              quantity
              owner {
                address
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        id
      }
    }
    accounts_url
    on
    AccountType {
      address
      user {
        publicUsername
        id
      }
    }
  }`;

router.post("/getHoldersFromOpenSea", async (req, res) => {
  try {
    console.log("/getHoldersFromOpenSea hit", req.body);
    let allNftHolders = [];

    await axios({
      url: queryUrl,
      method: "POST",
      data: {
        query: `query ItemOwnersListLazyQuery($archetype: ArchetypeInputType!) {
                  ...${ItemOwnersList_data_ttWlh}
                }`,
        variables: `{
                      "archetype": {
                        "assetContractAddress": "0x88d3e00ce938f1a591336131b859465b50d608b7",
                        "chain": "ETHEREUM",
                        "tokenId": ${req.body.nftId}
                      },
                      "assetContractAddress": "0x88d3e00ce938f1a591336131b859465b50d608b7",
                      "chain": "ETHEREUM",
                      "tokenId": ${req.body.nftId}
                    }`,
      },
    })
      .then((res) => {
        console.log(res.data.data.archetype.asset.assetOwners.edges);
        res.data.data.archetype.asset.assetOwners.edges.map((item) => {
          if (
            item.node.owner.address !==
            "0xb46700fbe3c2ed36851a4ccfead109ceff32d40f"
          ) {
            allNftHolders.push({
              address: item.node.owner.address,
              quantity: item.node.quantity,
            });
          }
        });
      })
      .catch((err) => console.log(err));

    //add in query that parses out this month's batch
    // const airdrop = await Airdrop.findOne({
    //   nftId: req.body.nftId,
    // });
    // if (!airdrop) {
    //   console.log(here)
    const airdrop = new Airdrop({
      nftId: req.body.nftId,
      holders: allNftHolders,
      batch: req.body.batch,
    });
    await airdrop.save();
    // }

    res.send(airdrop);
  } catch (err) {
    res.send(err);
  }
});

router.post("/getNftIds", async (req, res) => {
  try {
    let nftIds = [];
    const nfts = await NftType.find({ nftId: { $exists: true } });
    nfts.map(({ nftId }) => nftIds.push(nftId));
    res.send(nftIds);
  } catch (err) {
    res.send(err);
  }
});

router.get("/nextBatchNum", async (req, res) => {
  try {
    const airdrop = await Airdrop.findOne().sort("-batch");
    res.send({ batchNum: airdrop.batch + 1 });
  } catch (err) {
    res.send(err);
  }
});

router.post("/getHoldersFromDB", async (req, res) => {
  try {
    const holders = await Airdrop.find({ batch: req.body.batch });
    res.status(200).send(holders);
  } catch (err) {
    res.send(err);
  }
});

router.post("/airdropOnNftPurchase", async (req, res) => {
  try {
    airdropOnNFTPurchase(req.body.receiver, req.body.amount, (tx) => {
      if (tx === "signerError" || tx === "transactionError") {
        res.status(500).send(tx);
      } else {
        res.status(200).send(tx);
      }
    }).catch((err) => {
      console.log("ERROR", err);
      res.status(500).send(err);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
