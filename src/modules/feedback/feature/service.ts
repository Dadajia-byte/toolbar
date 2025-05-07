import { getBrowserInfo, getCookies, getDeviceInfo, getNetType, getOSInfo, getTimeStamp } from "../utils/info";

/**
 * 
 * @param params 
 * @returns 返回加密后的部份参数
 */
async function getAiSeeEncryptedQuery() {
  const aiseeUrl = 'https://nodeyun.video.qq.com/x/api/aisee';
  const obj = {
    userid: getCookies('vqq_vuserid') || getCookies('vuserid') || getCookies('video_guid'),
    t: getTimeStamp(),
    guid: getCookies('video_guid'),
    hardware: `${getDeviceInfo()}/${getOSInfo().osName}${getOSInfo().osVersion}/${getBrowserInfo().browserName}${getBrowserInfo().browserVersion}`,
    net: getNetType(),
  } 
  const queryString = Object.keys(obj)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
        .join('&');
  console.log(queryString);
  
  // try {
  //   const response = await fetch(`${aiseeUrl}?${queryString}`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const json = await response.json();
  //   if (json.ret === 0 && json.url) {
  //       const reg = /.*submit\?(.*)/;
  //       const query = json.url.match(reg)[1];
  //       return query; // 返回加密的 query
  //   }
  // } catch (err) {
  //   console.error('getAiSeeEncryptedQuery error', err);
  // }
}

export { getAiSeeEncryptedQuery };