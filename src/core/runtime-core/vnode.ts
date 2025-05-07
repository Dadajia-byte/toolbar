import { isFunction, isObject, isString } from "./shared";
export const Text = Symbol("Text");
export const Fragment = Symbol("Fragment");
export interface VNode {
  type: any;
  props?: Record<string, any>;
  children?: any;
  el?: any;
  shapeFlag: number;
  key?: string | number;
  subTree?: VNode;
  component?: any;
  namespace?: string;
}
export const isVNode = (val: any): val is VNode => val?.__v_isVNode;
export const isSameVNode = (n1: VNode, n2: VNode) => n1.type === n2.type && n1.key === n2.key;
/**
 * 
 * @param type 节点类型
 * @param props 节点属性
 * @param children 节点子节点 可以是字符串、数组（vn数组）、剩余参数（多个vn节点）、对象（暂不处理）
 * @returns 
 */
export function createVNode(type: any, props: any, ...children: any): VNode {
  const normalizeChildren = children.length === 0 ? children[0] : children;

  const shapeFlag = isString(type)
    ? ShapeFlag.ELEMENT
    : isObject(type)
    ? ShapeFlag.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlag.FUNCTIONAL_COMPONENT
    : 0;

  const vnode = {
    __v_isVNode: true,
    type,
    props,
    children: normalizeChildren,
    key: props?.key,
    el: null,
    shapeFlag,
    namespace: type === 'svg' ? 'http://www.w3.org/2000/svg' : undefined,
  };
  
  if (normalizeChildren) {
    if (Array.isArray(normalizeChildren)) {
      vnode.shapeFlag |= ShapeFlag.ARRAY_CHILDREN;
    } else if (isObject(normalizeChildren)) {
      vnode.shapeFlag |= ShapeFlag.SLOTS_CHILDREN;
    } else {
      vnode.children = String(normalizeChildren);
      vnode.shapeFlag |= ShapeFlag.TEXT_CHILDREN;
    }
  }

  return vnode;
}
export const enum ShapeFlag {
  ELEMENT = 1 << 0, // 元素节点
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数组件
  STATEFUL_COMPONENT = 1 << 2, // 有状态组件
  COMPONENT = FUNCTIONAL_COMPONENT | STATEFUL_COMPONENT, // 组件节点
  TEXT_CHILDREN = 1 << 3, // 文本数组节点
  ARRAY_CHILDREN = 1 << 4, // 数组子节点
  SLOTS_CHILDREN = 1 << 5, // 插槽子节点
}