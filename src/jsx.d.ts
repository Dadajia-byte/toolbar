import { VNode } from "./packages/core/vnode";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any; // 支持任意 HTML 标签
    }
    interface Element extends VNode {} // TSX 返回的类型是 VNode
    interface ElementChildrenAttribute {
      children: {}; // 指定 children 属性
    }
  }
}