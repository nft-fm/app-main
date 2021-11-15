const getBrowserType = () => { 
  let browserType = 'unknown';
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 ) 
 {
     browserType = 'Opera';
 }
 else if(navigator.userAgent.indexOf("Chrome") !== -1 )
 {
      browserType = 'Chrome';
 }
 else if(navigator.userAgent.indexOf("Safari") !== -1)
 {
      browserType = 'Safari';
 }
 else if(navigator.userAgent.indexOf("Firefox") !== -1 ) 
 {
      browserType = 'Firefox';
 }
 else if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode == true )) //IF IE > 10
 {
      browserType = 'IE';
 }  
 return (browserType);
}

export default getBrowserType;