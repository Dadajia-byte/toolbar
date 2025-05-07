function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browserName, browserVersion = 'Unknown';
  if (/edg/i.test(ua)) {
    browserName = 'Edge';
    browserVersion = ua.match(/edg\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/opr|opera/i.test(ua)) {
    browserName = 'Opera';
    browserVersion = ua.match(/(?:opr|opera)[\/\s](\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/samsungbrowser/i.test(ua)) {
    browserName = 'Samsung Internet';
    browserVersion = ua.match(/samsungbrowser\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/miuibrowser/i.test(ua)) {
    browserName = 'MiuiBrowser';
    browserVersion = ua.match(/miuibrowser\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/ucbrowser/i.test(ua)) {
    browserName = 'UC Browser';
    browserVersion = ua.match(/ucbrowser\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/qqbrowser/i.test(ua)) {
    browserName = 'QQ Browser';
    browserVersion = ua.match(/qqbrowser\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/baidubrowser/i.test(ua)) {
    browserName = 'Baidu Browser';
    browserVersion = ua.match(/baidubrowser\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/chrome|crios|crmo/i.test(ua) && !/edg|miuibrowser|samsungbrowser|ucbrowser|qqbrowser|baidubrowser/i.test(ua)) {
    browserName = 'Chrome';
    browserVersion = ua.match(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/firefox|iceweasel|fxios/i.test(ua)) {
    browserName = 'Firefox';
    browserVersion = ua.match(/(?:firefox|iceweasel|fxios)\/(\d+(\.\d+)?)/i)?.[1]?? 'Unknown';
  } else if (/safari/i.test(ua) && !/chrome|crios|crmo|edg|miuibrowser|samsungbrowser|ucbrowser|qqbrowser|baidubrowser/i.test(ua)) {
    browserName = 'Safari';
    browserVersion = ua.match(/version\/(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/msie/i.test(ua)) {
    browserName = 'Internet Explorer';
    browserVersion = ua.match(/msie (\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/trident/i.test(ua)) {
    browserName = 'Internet Explorer';
    browserVersion = ua.match(/rv:(\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else {
    browserName = 'Unknown';
    browserVersion = 'Unknown';
  }
  return {
    browserName,
    browserVersion,
  }
}
function getDeviceInfo() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) {
    return 'Mobile';
  } else if (/tablet/i.test(ua)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}
function getOSInfo() {
  const ua = navigator.userAgent;
  let osName, osVersion = 'Unknown';
  if (/windows nt/i.test(ua)) {
    osName = 'Windows';
    osVersion = ua.match(/windows nt (\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/mac os x/i.test(ua)) {
    osName = 'macOS';
    osVersion = ua.match(/mac os x (\d+(\.\d+)?)/i)?.[1].replace(/_/g, '.') ?? 'Unknown';
  } else if (/android/i.test(ua)) {
    osName = 'Android';
    osVersion = ua.match(/android (\d+(\.\d+)?)/i)?.[1] ?? 'Unknown';
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    osName = 'iOS';
    osVersion = ua.match(/os (\d+(\.\d+)?)/i)?.[1].replace(/_/g, '.') ?? 'Unknown';
  } else if (/linux/i.test(ua)) {
    osName = 'Linux';
    osVersion = 'Unknown';
  }
  return {
    osName,
    osVersion,
  }
}
function getCookies(key: string) {
  const cookieParis = document.cookie.split('; ');
  for (const pair of cookieParis) {
    const [k, v] = pair.split('=');
    if (k === key) {
      return decodeURIComponent(v);
    }
  }
  return null;
}
function getNetType() {
  // 可能用connection有点问题，但是旧版就是这么写的，这里先复用
  const typeMap: Record<string, string> = {
    'wifi': '1',
    '2g': '2',
    '3g': '3', 
    '4g': '4',
    '5g': '5',
  };
  const effectiveType = (navigator as any).connection?.effectiveType?.toLowerCase() ?? '';
  return typeMap[effectiveType] || '';
}
function getPageUrl() {
  return location.href + location.pathname;
}
function getTimeStamp() {
  return new Date().getTime();
}
export {
  getBrowserInfo,
  getDeviceInfo,
  getOSInfo,
  getCookies,
  getNetType,
  getPageUrl,
  getTimeStamp
}