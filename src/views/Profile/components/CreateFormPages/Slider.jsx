import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Slider = ({nftData, updateState, usdPerEth, usdPerBnb, currChainId }) => {

    const [BNB, setBNB] = useState(0.1)
    const [mintNFT, setMintNFT] = useState(1)



    return (
        <div className="slider-box">
        <div>
        <h1>Advanced Options</h1>
          <label className="slider-label"></label>
          <p className="slider-title">Price</p>
        </div>
        <input 
            className="slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={nftData.price}
            name="price"
            onChange={(e) => {
                updateState(e);} 
            }
            required

            style = {{ width: '100%' }}
        
        />
        <div 
        style={{display: "flex", flex: "row", justifyContent: "space-between" }}>
        <p>{nftData.price} BNB </p>
        {(currChainId === 1 || currChainId === 4) && (
          <p>{(nftData.price * usdPerEth).toFixed(2)} $USD</p>
        )}
        {(currChainId === 56 || currChainId === 97) && (
          <p>{(nftData.price * usdPerBnb).toFixed(2)} $USD</p>
        )}
        </div>
        <p className="slider-title">Number of NFTs</p>
        <input 
            className="slider"
            type="range"
            min="1"
            max="10"
            step="1"
            value={nftData.numMinted}
            name="numMinted"
            onChange={(e) => {
                updateState(e);}
            }
            style = {{ width: '100%' }}
            required
         
        />
        <div
        style={{display: "flex", flex: "row", justifyContent: "space-between" }}>
        <p>{nftData.numMinted} NFTS </p>
        {(currChainId === 1 || currChainId === 4) && (
          <p>
            {(nftData.price * usdPerEth * nftData.numMinted).toFixed(2)} $USD
          </p>
        )}
        {(currChainId === 56 || currChainId === 97) && (
          <p>
            {(nftData.price * usdPerBnb * nftData.numMinted).toFixed(2)} $USD
          </p>
        )} </div>
        <div> 
        </div>
      </div>

    )

    const Rows = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    `;
}

export default Slider