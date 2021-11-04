const Mixpanel = require("mixpanel");
const mixpanelToken = process.env.PRODUCTION
  ? process.env.MAIN_MIXPANEL_TOKEN
  : process.env.TEST_MIXPANEL_TOKEN;
const mixpanel = Mixpanel.init(mixpanelToken, { protocol: "https" });

const trackNftPurchase = (props) => {
  const { address, artistAddress, nftId, nftPrice, chain, title, artist } = props;
  mixpanel.track("nft purchase", {
    distinct_id: address,
    artistAddress,
    nftId,
    nftPrice,
    chain,
    title,
    artist,
  });
};

const trackNewUser = (props) => {
  const { address, ip } = props;

  mixpanel.track("user signup", {
    distinct_id: address,
    ip,
    ipAddress: ip,
  });
  mixpanel.people.set(address, {
    $created: new Date().toISOString(),
    address,
    ipAddress: ip,
    // visits: 0,
    // purchases: 0,
    // ethSpent: 0,
  });
};

const trackLogin = (props) => {
  const { address, ip } = props;

  mixpanel.track("login", {
    distinct_id: address,
    ip,
    ipAddress: ip,
  });
};

const trackPageview = (props) => {
  const { address, ip, page, hasMetamask } = props;
  mixpanel.track("pageview", {
    hasMetamask: hasMetamask,
    distinct_id: address ? address : null,
    ip,
    ipAddress: ip,
    page: page === "" ? "market" : page,
    isLoggedIn: address ? true : false,
  });
};
const trackNftMint = () => {};

const trackArtistApplication = () => {};

const trackNftView = (props) => {
  console.log("nft view", props);
  const { address, ip, nftId, artistAddress, title, artist } = props;
  mixpanel.track("nft view", {
    distinct_id: address ? address : null,
    isLoggedIn: address ? true : false,
    ipAddress: ip,
    ip,
    nftId: nftId,
    artistAddress: artistAddress,
    title: title,
    artist: artist,
  });
};

const trackSnippetPlay = (address, ipAddress, nftId, artist) => {};

module.exports = {
  trackNftPurchase,
  trackNftMint,
  trackArtistApplication,
  trackNewUser,
  trackLogin,
  trackPageview,
  trackNftView,
  trackSnippetPlay,
};
