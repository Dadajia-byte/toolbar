import { isFunction, isObject, isString } from "./shared";
export const Text = Symbol("Text");
export const Fragment = Symbol("Fragment");
export interface VNode {
  type: any; // 节点类型
  props?: Record<string, any>;
  children?: any; // 子节点
  el?: any; // 真实 DOM 元素
  shapeFlag: number; // 节点类型标记位
  key?: string | number; // 节点唯一标识
  subTree?: VNode; // 子节点
  component?: any; // 组件实例
}
export const isVNode = (val: any): val is VNode => val?.__v_isVNode;
export const isSameVNode = (n1: VNode, n2: VNode) => n1.type === n2.type && n1.key === n2.key;

export function createVNode(type: any, props: any, ...children: any): VNode {
  const normalizedChildren = children.length === 0 ? children[0] : children;
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
    children: normalizedChildren,
    key: props?.key,
    el: null,
    shapeFlag
  };
  
  if (children) {
    if (Array.isArray(children)) {
      vnode.shapeFlag |= ShapeFlag.ARRAY_CHILDREN;
    } else if (isObject(children)) {
      vnode.shapeFlag |= ShapeFlag.SLOTS_CHILDREN;
    } else {
      children = String(children);
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