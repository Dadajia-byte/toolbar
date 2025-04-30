import { createVNode, VNode } from "@/packages/core";
import { BaseModule } from "@/components/base/BaseModule";
import { SvgIcon } from "@/utils/svgIcon";
export class Top extends BaseModule {
  readonly name: string = "top";
  order: number = 999; // 模块的顺序，数字越小越靠前
  render(): VNode {
    return createVNode(
      "div",
      {
        class: "toolbar-item toolbar-top",
        onClick: this.bindHandler(this.scrollToTop), // 绑定点击事件
      },
      [SvgIcon("top")],
    );
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  }
}
