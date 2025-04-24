export function isObject(value: any) {
  return typeof value === "object" && value !== null;
}

export function isFunction(value: any) {
  return typeof value === "function";
}

export function isString(value: any) {
  return typeof value === "string";
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: any, key: any) => hasOwnProperty.call(val, key);

export const getSequence = (arr: any) => {
  const result = [0];
  const p = result.slice(0);
  let start, end, mid;
  const len = arr.length;
  for(let i=0;i<len;i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      let resultLastIndex = result[result.length - 1];
      if (arr[resultLastIndex] < arrI) {
        p[i] = resultLastIndex;
        result.push(i);
        continue;
      }
    }
    start = 0;
    end = result.length - 1;
    while(start < end) {
      mid = ((start + end) / 2) | 0;
      if (arr[result[mid]] < arrI) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }
    if (arrI < arr[result[start]]) {
      p[i] = result[start - 1];
      result[start] = i;
    }
    let l = result.length;
    let last = result[l - 1];
    while(l-- > 0) {
      result[l] = last;
      last = p[last];
    }
  }
  return result;
}