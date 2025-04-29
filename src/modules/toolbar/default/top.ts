import { createVNode, VNode } from "@/core";
import { BaseModule } from "@/modules/base/BaseModule";
export class Top extends BaseModule {
  readonly name: string = "top";

  render(): VNode {
    return createVNode("div", {
    })
  }
}
