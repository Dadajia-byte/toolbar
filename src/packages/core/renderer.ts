import { getSequence } from "./shared";
import { VNode, createVNode, Text, ShapeFlag, isSameVNode, Fragment } from "./vnode";
export interface RenderOptions {
  createElement(type: string, namespace?: string): any;
  createText(text: string): any;
  setText(node: any, text: string): void;
  setElementText(node: any, text: string): void;
  insert(child: any, parent: any, anchor?: any): void;
  remove(child: any): void;
  patchProp(el: any, key: string, prevValue: any, nextValue: any): void;
}
export function createRenderer(options: RenderOptions) {
  const {
    createElement: hostCreateElement,
    createText: hostCreateText,
    setElementText: hostSetElementText,
    insert: hostInsert,
    patchProp: hostPatchProp,
    remove: hostRemove,
    setText: hostSetText,
  } = options;
  const normalize = (children: Array<VNode | string | number>) =>(
    children.map((child) =>
      typeof child === "string" || typeof child === "number"
        ? createVNode(Text, null, String(child))
        : child
    )
  )
  function render(vnode: VNode, container: any): void {
    if (vnode === null) {
      if (container._vnode) {
        unmount(container._vnode);
      }
    } else {
      patch(container?._vnode || null, vnode, container);
      container._vnode = vnode; // 缓存当前 vnode
    }
  }
  function patch(n1: VNode | null, n2: VNode, container: any, anchor: any = null) {
    if (n1 === n2) {
      return; // 两次渲染一个节点
    }
    if (n1 && isSameVNode(n1, n2)) {
      unmount(n1);
      n1 = null;
    }
    const { type, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container);
        break;
      case Fragment:
        processFragment(n1, n2, anchor, container);
        break;
      default:
        if (shapeFlag & ShapeFlag.ELEMENT) {
          processElement(n1, n2, container, anchor);
        } else if (shapeFlag & ShapeFlag.COMPONENT) {
          processComponent(n1, n2, container, anchor);
        }
    }
  }
  function processComponent(n1: VNode | null, n2: VNode, container: any, anchor: any) {
    if (n1 === null) {
      mountComponent(n2, container, anchor);
    } else {
      updateComponent(n1, n2);
    }
  }
  function mountComponent(vnode: VNode, container: any, anchor: any) {
    const instance = (vnode.component = {
      vnode,
      subTree: null,
      props: vnode.props || {},
      isMounted: false
    });
    const Component = vnode.type;
    const subTree = (instance.subTree = Component(instance.props));
    patch(null, subTree, container, anchor);
    vnode.el = subTree.el;
    instance.isMounted = true;
  }
  function updateComponent(n1: VNode, n2: VNode) {
    const instance = (n2.component = n1.component);
    instance.props = n2.props || {};
    const subTree = (instance.subTree = instance.vnode!.type(instance.props));
    patch(n1.subTree, subTree, n1.el);
    n2.el = subTree.el;
  }
  function mountElement(vnode: VNode, container: any, anchor: any) {
    const { type, children, props, shapeFlag, namespace } = vnode;
    // -- 1.创建真实 DOM --
    let el = (vnode.el = namespace
      ? hostCreateElement(type, namespace)
      : hostCreateElement(type));
    // -- 2.处理属性 --
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key]);
      }
    }
    // -- 3. 处理子元素 --
    if (shapeFlag & ShapeFlag.TEXT_CHILDREN) {
      hostSetElementText(el, children);
    } else if (shapeFlag & ShapeFlag.ARRAY_CHILDREN) {
      mountChildren(children, el, anchor, namespace);
    }
    // -- 4. 挂载到容器 --
    hostInsert(el, container);
  }
  function patchElement(n1:VNode, n2:VNode, anchor: any=null) {
    // -- 1.复用dom --
    let el = (n2.el = n1.el);
    let oldProps = n1.props || {};
    let newProps = n2.props || {};
    // -- 2.处理属性 --
    patchProps(el, oldProps, newProps);
    // -- 3.全量diff --
    patchChildren(n1, n2, el, anchor);
  }
  function patchChildren(n1: VNode, n2: VNode, el: any, anchor: any = null) {
    const c1 = n1.children;
    const c2 = normalize(n2.children);
    const prevShapeFlag = n1.shapeFlag;
    const shapeFlag = n2.shapeFlag;
    if (shapeFlag & ShapeFlag.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
        unmountChildren(c1);
      }
      if (c1 !== c2) {
        hostSetElementText(el, c2);
      }
    } else {
      if (prevShapeFlag & ShapeFlag.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlag.ARRAY_CHILDREN) {
          patchKeyedChildren(c1, c2, el);
        } else {
          unmountChildren(c1);
        } 
      } else {
        if (prevShapeFlag & ShapeFlag.TEXT_CHILDREN) {
          hostSetElementText(el, "");
        }
        if (shapeFlag & ShapeFlag.ARRAY_CHILDREN) {
          mountChildren(c2, el, anchor);
        }
      }
    }
  }
  function patchKeyedChildren(c1: any, c2: any, el: any) {
    let i= 0;
    let e1 = c1.length - 1;
    let e2 = c2.length - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i];
      if (isSameVNode(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2];
      if (isSameVNode(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i>e1) {
      if (i<=e2) {
        let nextPos = e2 + 1;
        let anchor = c2[nextPos]?.el;
        while(i<=e2) {
          patch(null, c2[i], el, anchor);
          i++;
        }
      }
    } else if (i> e2) {
      if (i<= e1) {
        while(i<=e1) {
          unmount(c1[i]);
          i++;
        }
      }
    } else {
      let s1 = i;
      let s2 = i;
      const keyToNewIndexMap = new Map();
      let toBePatched = e2 - s2 + 1;
      let newIndexToOldMapIndex = new Array(toBePatched).fill(0);
      for (let i = s2; i <= e2; i++) {
        const child = c2[i];
        keyToNewIndexMap.set(child.key, i);
      }
      for (let i = s1; i <= e1; i++) {
        const vnode = c1[i];
        let newIndex = keyToNewIndexMap.get(vnode.key);
        if (newIndex === undefined) {
          unmount(vnode);
        } else {
          newIndexToOldMapIndex[newIndex - s2] = i + 1;
          patch(vnode, c2[newIndex] as VNode, el);
        }
      }

      // 调整顺序倒序插入
      let increasingSeq = getSequence(newIndexToOldMapIndex);
      let j = increasingSeq.length;
      for(let i = toBePatched-1; i>=0; i--) {
        let newIndex = s2 + i;
        let anchor = c2[newIndex +1]?.el || null;
        const vnode = c2[newIndex];
        if (!vnode.el) {
          patch(null, vnode, el, anchor);
        } else {
          if (i===increasingSeq[j]) {
            j--;
          } else {
            hostInsert(vnode.el, el, anchor);
          }
        }
      }
    }
  }
  function mountChildren(children:Array<VNode | string | number>, container: any, anchor: any = null, namespace: string | undefined = undefined) {
    const normalizeChildren = normalize(children);
    for (let i = 0; i < normalizeChildren.length; i++) {
      const child = normalizeChildren[i] as VNode;
      if (namespace) {
        child.namespace = namespace;
      }
      patch(null, child, container, anchor);
    }
  }
  function unmountChildren(children: Array<VNode | string>) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      unmount(child as VNode);
    }
  }
  function processElement(n1: VNode | null, n2: VNode, container: any, anchor: any = null) {
    if (n1 === null) {
      mountElement(n2, container, anchor);
    } else {
      patchElement(n1, n2, anchor);
    }
  }
  const processFragment = (n1: VNode | null, n2: VNode, container: any, anchor: any) => {
    if (n1 === null) {
      mountChildren(n2.children, container, anchor);
    } else {
      patchChildren(n1, n2, container, anchor);
    }
  }; 
  function patchProps(el: any, oldProps: Record<string, any>, newProps: Record<string, any>) {
    for (const key in newProps) {
      if (key.startsWith('xlink:')) {
        el.setAttributeNS('http://www.w3.org/1999/xlink', key, newProps[key]);
      } else {
        hostPatchProp(el, key, oldProps[key], newProps[key]);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        if (key.startsWith('xlink:')) {
          el.removeAttributeNS('http://www.w3.org/1999/xlink', key);
        } else {
          hostPatchProp(el, key, oldProps[key], null);
        }
      }
    }
  }
  function processText(n1: VNode | null, n2: VNode, container: any) {
    if (n1 === null) {
      hostInsert((n2.el = hostCreateText(n2.children as string)), container);
    } else {
      if (n1.children !== n2.children) {
        const newEl = hostCreateText(n2.children as string);
        hostInsert(newEl, container, n1.el);
        hostRemove(n1.el);
        n2.el = newEl;
      } else {
        n2.el = n1.el; // 如果文本内容相同，可以复用
      }
    }
  }
  function unmount(vnode: VNode) {
    const { el } = vnode;
    const performRemove = () => {
      hostRemove(el);
    }
    // 这里暂时不考虑乱七八糟的组件和内置组件
    performRemove();
  }
  return { render };
}