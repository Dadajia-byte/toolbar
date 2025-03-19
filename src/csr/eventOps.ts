// 事件的 DOM 操作

export const eventOps = {
  // 添加事件监听
  addEventListener(
    el: HTMLElement,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): void {
    el.addEventListener(event, handler);
  },
  // 移除事件监听
  removeEventListener(
    el: HTMLElement,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): void {
    el.removeEventListener(event, handler);
  },
};