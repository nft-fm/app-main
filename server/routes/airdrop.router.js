const express = require("express");
const router = express.Router();
const User = require("../schemas/User.schema");
const NftType = require("../schemas/NftType.schema");
const Airdrop = require("../schemas/Airdrop.schema");
const { utils } = require("ethers");
const axios = require("axios");
const { resolve } = require("path");
const moment = require("moment");

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
      batch: req.body.batch
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
    console.log("getNftIds hit");
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
    console.log("getNftIds hit");
    const airdrop = await Airdrop.findOne().sort('-batch');
    console.log("next batch", airdrop);
    res.send({batchNum: airdrop.batch + 1});
  } catch (err) {
    res.send(err);
  }
});


router.post("/getHoldersFromDB", async (req, res) => {
  try {
    console.log("getHoldersFromDB hit", req.body);
    const holders = await Airdrop.find({batch: req.body.batch});
    console.log(holders);
    res.status(200).send(holders);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
