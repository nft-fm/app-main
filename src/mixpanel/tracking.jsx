import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { AccountProvider, useAccountConsumer } from "../contexts/Account";
import getBrowserType from "./getBrowserType";
import getDeviceType from "./getDeviceType";
import queryString from "query-string";

const Tracking = () => {
  const location = useLocation();
  const { account } = useAccountConsumer();
  
  // console.log("utm", queryString.parse(location.search));

  useEffect(() => {
    axios
    .post(`/api/user/track-pageview`, {
      hasMetamask: !!window.ethereum,
      address: account,
      page: location.pathname.substring(1),
      browser: getBrowserType(),
      deviceType: getDeviceType(),
      platform: navigator.platform,
      utm_source: queryString.parse(location.search).utm_source || null,
      utm_campaign: queryString.parse(location.search).utm_campaign || null,
      utm_content: queryString.parse(location.search).utm_content || null,
    })
    .then((res) => {})
    .catch((err) => {});
  }, [location]);

  return (
    <div>
    </div>
  )
}

export default Tracking;