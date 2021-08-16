const Mixpanel = require('mixpanel');
const mixpanelToken = process.env.PRODUCTION ? process.env.MAIN_MIXPANEL_TOKEN : process.env.TEST_MIXPANEL_TOKEN;
const mixpanel = Mixpanel.init(mixpanelToken, {protocol: 'https'});

const trackNftPurchase = (props) => {
  const {address, ipAddress, artistAddress, nftId, nftPrice} = props;
  console.log("tracking purchase", props);
  mixpanel.track('nft purchase', {
    distinct_id: address,
    ipAddress,
    artistAddress,
    nftId,
    nftPrice,
  });
}

const trackNewUser = (props) => {
const {address, ip} = props;
console.log("tracking login", props);

mixpanel.track('user signup', {
    distinct_id: address,
    ip,
  })
  mixpanel.people.set(address, {
    $created: (new Date()).toISOString(),
    address,
    // visits: 0,
    // purchases: 0,
    // ethSpent: 0,
  })
}

const trackLogin = (props) => {
const {address, ip} = props;
console.log("tracking login", props);

mixpanel.track('login', {
    distinct_id: address,
    ip,
  })
}

const trackPageview = (props) => {
  const {address, ip, page} = props;
console.log("tracking pageview", props);
  mixpanel.track('pageview', {
    distinct_id: address ? address : null,
    ip,
    page: page === "" ? "home" : page,
    isLoggedIn: address ? true : false,
  });
}

const trackNftMint = () => {

}

const trackArtistApplication = () => {
  
}

const trackNftView = (address, ipAddress, nftId, artistAddress) => {
  mixpanel.track('nft view', {
    distinct_id: address ? address : null,
    isLoggedIn: address ? true : false,
    ipAddress,
    nftId,
    artistAddress,
  });
}

const trackSnippetPlay = (address, ipAddress, nftId, artist) => {

}

module.exports = {
  trackNftPurchase,
  trackNftMint,
  trackArtistApplication,
  trackNewUser,
  trackLogin,
  trackPageview,
  trackNftView,
  trackSnippetPlay,
}