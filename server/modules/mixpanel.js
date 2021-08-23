const Mixpanel = require("mixpanel");
const mixpanelToken = process.env.PRODUCTION
  ? process.env.MAIN_MIXPANEL_TOKEN
  : process.env.TEST_MIXPANEL_TOKEN;
const mixpanel = Mixpanel.init(mixpanelToken, { protocol: "https" });

const trackNftPurchase = (props) => {
  const { address, ip, artistAddress, nftId, nftPrice } = props;
  console.log("tracking purchase", props);
  mixpanel.track("nft purchase", {
    distinct_id: address,
    ip,
    ipAddress: ip,
    artistAddress,
    nftId,
    nftPrice,
  });
};

const trackNewUser = (props) => {
  const { address, ip } = props;
  console.log("tracking login", props);

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
  console.log("tracking login", props);

  mixpanel.track("login", {
    distinct_id: address,
    ip,
    ipAddress: ip,
  });
};

const trackPageview = (props) => {
  const { address, ip, page } = props;
  console.log("tracking pageview", props);
  mixpanel.track("pageview", {
    distinct_id: address ? address : null,
    ip,
    ipAddress: ip,
    page: page === "" ? "home" : page,
    isLoggedIn: address ? true : false,
  });
};
const trackNftMint = () => {};

const trackArtistApplication = () => {};

const trackNftView = (props) => {
  const {address, ip, nftId, artistAddress, title, artist} = props
  console.log("tracking nft view", props)
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
