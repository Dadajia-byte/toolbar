import { isObject, isString } from "./shared";
export const Text = Symbol("Text");
export interface VNode {
  type: any; // 节点类型
  props?: Record<string, any>;
  children?: any; // 子节点
  el?: any; // 真实 DOM 元素
  shapeFlag: number; // 节点类型标记位
  key?: string | number; // 节点唯一标识
}
export const isVNode = (val: any): val is VNode => val?.__v_isVNode;
export const isSameVNode = (n1: VNode, n2: VNode) => n1.type === n2.type && n1.key === n2.key;
export function createVNode(type: any, props: any, children?: any): VNode {
  const shapeFlag = isString(type)
    ? ShapeFlag.ELEMENT
    : 0;

  const vnode = {
    __v_isVNode: true,
    type,
    props,
    children,
    key: props?.key,
    el: null,
    shapeFlag
  };
  
  if (children) {
    if (Array.isArray(children)) {
      vnode.shapeFlag |= ShapeFlag.ARRAY_CHILDREN;
    } else if (isObject(children)) {
      vnode.shapeFlag |= ShapeFlag.ARRAY_CHILDREN;
    } else {
      children = String(children);
      vnode.shapeFlag |= ShapeFlag.TEXT_CHILDREN;
    }
  }

  return vnode;
}
export const enum ShapeFlag {
  ELEMENT = 1 << 0, // 元素节点
  TEXT_CHILDREN = 1 << 3, // 文本数组节点
  ARRAY_CHILDREN = 1 << 4, // 数组子节点
  SLOTS_CHILDREN = 1 << 5, // 插槽子节点
}