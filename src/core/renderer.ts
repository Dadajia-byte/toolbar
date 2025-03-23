export interface VNode {
  tag: string | undefined; // 节点类型
  props?: Record<string, any>;
  children?: Array<VNode | string> | string; // 子节点
  el?: any; // 真实 DOM 元素
}

export interface RenderOptions {
  createElement(tag: string): any;
  createText(text: string): any;
  setText(node: any, text: string): void;
  setElementText(node: any, text: string): void;
  insert(child: any, parent: any, anchor?: any): void;
  remove(child: any): void;
  patchProp(el: any, key: string, prevValue: any, nextValue: any): void;
}

export function createRenderer(options: RenderOptions) {
  const {
    createElement,
    createText,
    insert,
    patchProp,
    remove,
    setText,
  } = options;

  function render(vnode: VNode, container: any): void {
    const prevVNode = container._vnode || null;
    if (vnode) {
      patch(prevVNode, vnode, container);
    } else if (prevVNode) {
      // 如果新 vnode 为空且存在旧 vnode，则移除旧节点
      unmount(prevVNode);
    }
    container._vnode = vnode; // 缓存当前 vnode
  }

  function patch(oldVNode: VNode | null, newVNode: VNode, container: any) {
    if (oldVNode === newVNode) return;
    if (oldVNode && (oldVNode?.tag !== newVNode.tag)) {
      unmount(oldVNode);
      oldVNode =null;
    }
    if (newVNode.tag === undefined) { // 文本节点
      processText(oldVNode, newVNode, container);
    } else {
      processElement(oldVNode, newVNode, container);
    }
  }
  function mountElement(vnode: VNode, container: any) {
    let el = (vnode.el = createElement(vnode.tag as string));
    if (vnode.props) {
      for (const key in vnode.props) {
        patchProp(el, key, null, vnode.props[key]);
      }
    }
    if (typeof vnode.children === "string") {
      setText(el, vnode.children);
    } else if (Array.isArray(vnode.children)) {
      mountChildren(vnode.children, el);
    }
    insert(el, container);
  }
  function normalize(children: Array<VNode | string>) {
    return children.map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return {
          tag: undefined,
          props: {},
          children: child.toString(),
        } as VNode;
      }
      return child;
    });
  }
  function mountChildren(children:Array<VNode |string>, container: any) {
    const normalizedChildren = normalize(children);
    for (const child of normalizedChildren) {
      patch(null, child as VNode, container);
    }
  }

  function patchElement(n1:VNode,n2:VNode) {
    let el = (n2.el = n1.el);
    let oldProps = n1.props || {};
    let newProps = n2.props || {};
    patchProps(el, oldProps, newProps);
    patchChildren(n1.children, n2.children, el);
  }

  function patchProps(el: any, oldProps: Record<string, any>, newProps: Record<string, any>) {
    for (const key in newProps) {
      patchProp(el, key, oldProps[key], newProps[key]);
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patchProp(el, key, oldProps[key], null);
      }
    }
  }

  function patchChildren(oldChildren: any, newChildren: any, container: any) {
    if (typeof newChildren === "string") {
      if (Array.isArray(oldChildren)) {
        oldChildren.forEach((child: VNode) => unmount(child));
      }
      setText(container, newChildren);
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        setText(container, "");
        mountChildren(newChildren, container);
      } else if (Array.isArray(oldChildren)) {
        const oldLen = oldChildren.length;
        const newLen = newChildren.length;
        const commonLength = Math.min(oldLen, newLen);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i], container);
        }
        if (newLen > oldLen) {
          for (let i = commonLength; i < newLen; i++) {
            patch(null, newChildren[i], container);
          }
        } else if (oldLen > newLen) {
          for (let i = commonLength; i < oldLen; i++) {
            unmount(oldChildren[i]);
          }
        }
      }
    }
  }


  function processElement(n1: VNode | null, n2: VNode, container: any) {
    if (n1 === null) {
      mountElement(n2, container);
    } else {
      patchElement(n1, n2);
    }
  }
  
  function processText(n1: VNode | null, n2: VNode, container: any) {
    if (n1 === null) {
      const textNode = createText(n2.children as string);
      n2.el = textNode;
      insert(textNode, container);
    } else {
      const el = (n2.el = n1.el);
      if (n1.children !== n2.children) {
        setText(el, n2.children as string);
      }
    }
  }

  function unmount(vnode: VNode) {
    if (vnode.el) {
      remove(vnode.el);
    }
    if (Array.isArray(vnode.children)) {
      vnode.children.forEach((child) => {
        if (typeof child !== "string") {
          unmount(child as VNode);
        }
      });
    }
  }


  return { render };
}