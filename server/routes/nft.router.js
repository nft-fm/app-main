const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('nft request', req)
    const ips = ["34.202.148.8", "35.173.24.19", "136.49.99.70"]
    let nft 
    if (ips.includes(req.headers['x-forwarded-for'] )) {
      nft =  await NftType.findOne({ nftId: id, chain: "ETH" });
    } else {
      nft =  await NftType.findOne({ nftId: id, chain: "BSC" });

    }
    if (!nft) {
      res.send("Unable to access this NFT.");
    } else {
      let attributes = [
        {
          trait_type: "Artist",
          value: nft.artist,
        },
        {
          trait_type: "Genre",
          value: nft.genre,
        },
      ];
      const data = nft.videoUrl
        ? {
            name: nft.artist + " - " + nft.title,
            description: `This is an NFT from ${nft.artist}. The owner of this NFT can listen to this exclusive full length song at beta.fanfare.fm`,
            image: nft.imageUrl,
            video: nft.videoUrl,
            attributes,
          }
        : {
            name: nft.artist + " - " + nft.title,
            description: `This is a music NFT from ${nft.artist}. The owner of this NFT can listen to this exclusive full length song only at beta.fanfare.fm`,
            image: nft.imageUrl,
            attributes,
          };

      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
