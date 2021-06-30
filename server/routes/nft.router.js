const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nft = await NftType.findOne({ nftId: id });
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
            description: `This is a music NFT from ${nft.artist}. The owner of this NFT can listen to this exclusive full length song and view the music video at nftfm.io.`,
            image: nft.imageUrl,
            attributes,
          }
        : {
            name: nft.artist + " - " + nft.title,
            description: `This is a music NFT from ${nft.artist}. The owner of this NFT can listen to this exclusive full length song only at nftfm.io`,
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
