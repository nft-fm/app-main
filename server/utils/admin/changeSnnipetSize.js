
const changeSnnipetSize = async (newSizeInSec) => {
    if (!newSizeInSec || newSizeInSec <= 0) newSizeInSec = 30;

    let allNfts = await NftType.find({isDraft: false, isMinted: true}, {address: 1, audioUrl: 1});
    
    if (!allNfts || !allNfts[0]) return ({success: false});

    else console.log("all nfts", allNfts);
}

module.exports = changeSnnipetSize