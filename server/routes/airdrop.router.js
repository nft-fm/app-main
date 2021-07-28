const express = require("express");
const router = express.Router();
const User = require("../schemas/User.schema");
const NftType = require("../schemas/NftType.schema");
const { utils } = require("ethers");
const axios = require("axios");
const { resolve } = require("path");

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
//2f6f419a083c46de9d83ce3dbe7db601 <- ripped api key
router.post("/airdrop", async (req, res) => {
  try {
    console.log("/airdrop hit");
    let allNftHolders = [];
    const nfts = await NftType.find({ nftId: { $exists: true } });

    Promise.all(
      nfts.map(({ nftId }) => {
        axios({
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
                            "tokenId": ${nftId}
                          },
                          "assetContractAddress": "0x88d3e00ce938f1a591336131b859465b50d608b7",
                          "chain": "ETHEREUM",
                          "tokenId": ${nftId}
                        }`,
          },
        })
          .then((res) => {
            console.log(res.data.data.archetype.asset.assetOwners.edges);
            allNftHolders.push(res.data.data.archetype.asset.assetOwners.edges);
            // resolve()
          })
          .catch((err) => console.log(err));
      })
    );

    console.log(allNftHolders);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
