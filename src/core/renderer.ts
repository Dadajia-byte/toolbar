export interface VNode {
  tag: string;
  props?: Record<string, any>;
  children?: Array<VNode | string>;
}

export interface RenderOptions {
  createElement(tag: string): any;
  createText(text: string): any;
  setText(node: any, text: string): void;
  setElementText(node: any, text: string): void;
  insert(child: any, parent: any, anchor?: any): void;
  remove(child: any): void;
  setAttribute(el: any, key: string, value: any): void;
  addEventListener(el: any, event: string, handler: EventListener): void;
  removeEventListener(el: any, event: string, handler: EventListener): void;
}

export function createRenderer(options: RenderOptions) {
  const {
    createElement,
    createText,
    insert,
    setAttribute,
    addEventListener,
  } = options;

  function render(vnode: VNode, container: any): void {
    if (!vnode) return;

    const el = createElement(vnode.tag);

     // 设置属性
     if (vnode.props) {
      for (const [key, value] of Object.entries(vnode.props)) {
        if (key.startsWith("on") && typeof value === "function") {
          addEventListener(el, key.slice(2).toLowerCase(), value);
        } else {
          setAttribute(el, key, value);
        }
      }
    }

    // 渲染子节点
    if (vnode.children) {
      vnode.children.forEach((child) => {
        if (typeof child === "string") {
          const textNode = createText(child);
          insert(textNode, el);
        } else {
          render(child, el);
        }
      });
    }

    // 插入到容器中
    insert(el, container);
  }

  return { render };
}