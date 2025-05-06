import { VNode } from "./core/runtime-core/vnode";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends VNode {}
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}