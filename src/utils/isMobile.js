function isMobile() {
  let platform = navigator.appVersion;
  if (platform.indexOf('iPhone') !== -1 ||
  platform.indexOf('iPad') !== -1 ||
  platform.indexOf('Android') !== -1 ||
  platform.indexOf('webOS') !== -1 ||
  platform.indexOf('BlackBerry') !== -1 ||
  platform.indexOf('IEMobile') !== -1 ||
  platform.indexOf('Opera Mini') !== -1
  ) {
    return true;
  }
  else {
    return false;
  }
}

export default isMobile;
