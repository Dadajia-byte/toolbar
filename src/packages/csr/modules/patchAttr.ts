export default function patchAttr(el: HTMLElement, key: string, value: string | null) {
  // 添加或更新属性
  if (!value) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}
