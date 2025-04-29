import { VNode } from "@/core";
import { render } from "@/csr";
export abstract class BaseModule {
  abstract name: string; // 模块名称
  protected props: Record<string, any> = {};
  protected state: Record<string, any> = {};
  private boundHandlers = new WeakMap<Function, Function>();
  container: HTMLElement | null = null;
  constructor(initalProps?: Record<string, any>) {
    this.props = initalProps || {};
  }  

  abstract render(): VNode;

  onMount(): void {}
  onUnmount(): void {}
  onBeforeUpdate(): void {}
  onUpdated(): void {}

  /**
   * 更新模块的属性
   */
  setProps(props: Record<string, any>): void {
    this.props = { ...this.props, ...props };
    this.forceUpdate();
  }

  /**
   * 更新模块的状态
   */
  setState(state: Record<string, any>): void {
    this.state = { ...this.state, ...state };
    this.forceUpdate();
  }
  /**
   * 强制更新模块
   */
  protected forceUpdate(): void {
    const currentElement = this.getElment();
    if (currentElement) {
      this.onBeforeUpdate();
      this.mount(this.container!);
      this.onUpdated();
    }
  }
  /**
   * 获取模块的真实 DOM 元素
   */
  getElment(): HTMLElement | null {
    return document.querySelector(`[data-module-name="${this.name}"]`);
  }
  /**
   * 挂载模块
   */
  mount(container: HTMLElement): void {
    const vnode = this.render();
    this.container = container;
    vnode.props = {
      ...vnode.props,
      'data-module-name': this.name
    };
    render(vnode, container);
  }
  /**
   * 卸载模块
   */
  unmount(): void {
    const currentElement = this.getElment();
    if (currentElement) {
      currentElement.parentElement?.removeChild(currentElement);
      this.onUnmount();
    }
  }

  protected bindHandler(fn: Function): Function {
    if (!this.boundHandlers.has(fn)) {
      this.boundHandlers.set(fn, fn.bind(this));
    }
    return this.boundHandlers.get(fn)!;
  }
}