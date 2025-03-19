// 属性的 DOM 操作

export const attrOps = {
  // 设置属性
  setAttribute(el: HTMLElement, key: string, value: string): void {
    el.setAttribute(key, value);
  },
  // 移除属性
  removeAttribute(el: HTMLElement, key: string): void {
    el.removeAttribute(key);
  },
  // 获取属性
  getAttribute(el: HTMLElement, key: string): string | null {
    return el.getAttribute(key);
  },
  // 检查属性是否存在
  hasAttribute(el: HTMLElement, key: string): boolean {
    return el.hasAttribute(key);
  },
};