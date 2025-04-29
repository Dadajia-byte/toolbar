import { createVNode, VNode } from "@/core";
import { BaseModule } from "@/modules/base/BaseModule";
import { injector } from ".";

class Top extends BaseModule {
  readonly name: string = "top";

  render(): VNode {
    return createVNode("div", {
      
    })
  }
}

injector.register("top", (options) => new Top(options));