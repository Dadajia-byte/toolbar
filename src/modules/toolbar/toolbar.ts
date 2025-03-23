import { VNode } from "@/core";
import { render } from "@/csr";
import "./toolbar.scss";
export type Module = {
  name: string; // 模块名称
  render: () => VNode; // 渲染函数，返回一个 VNode
};

export interface ToolbarOptions {
  defaultModules?: string[]; // 默认渲染的模块名称
  customModules?: Module[];  // 自定义模块
}

export class Toolbar {
  private defaultModules: Record<string, Module>;
  private activeModules: Module[];

  constructor(options: ToolbarOptions = {}) {
    this.defaultModules = {};
    this.activeModules = [];

    // 加载默认模块
    if (options.defaultModules) {
      options.defaultModules.forEach((moduleName) => {
        const module = this.defaultModules[moduleName];
        if (module) {
          this.activeModules.push(module);
        }
      });
    }

    // 加载自定义模块
    if (options.customModules) {
      this.activeModules.push(...options.customModules);
    }
  }
  private update(): void {
    const newVNode: VNode = {
      tag: "div",
      props: {
        id: "toolbar",
        class: "dark",
      },
      children: this.activeModules.map((module) => module.render()),
    };
    render(newVNode, document.body);
  }

  // 调整模块顺序
  reorderModules(order: string[]) {
    const moduleMap = new Map(this.activeModules.map((module) => [module.name, module]));
    const orderModules = order.map((name) => moduleMap.get(name)).filter(Boolean) as Module[];
    // 未指定顺序的模块，保持原有顺序
    const remainingModules = this.activeModules.filter((module) => !order.includes(module.name));
    // 未指定顺序的模块，始终放在最后
    this.activeModules = [...orderModules, ...remainingModules];
    this.update();
  }

  // 动态添加模块
  addModule(module: Module) {
    this.activeModules.push(module);
    this.update();
  }

  // 内部切换主题
  static switchTheme(theme?: "dark" | "light") {
    const toolbar = document.getElementById("toolbar");
    if (!toolbar) {
      return;
    }
    if (!theme) { // 如果没有传入主题，则根据当前主题进行切换
      if (toolbar.classList.contains("dark")) {
        toolbar.classList.remove("dark");
        toolbar.classList.add("light");
      } else if (toolbar.classList.contains("light")) {
        toolbar.classList.remove("light");
        toolbar.classList.add("dark");
      } else {
        toolbar.classList.add("dark");
      }
    } else {
      toolbar.classList.remove("dark", "light");
      toolbar.classList.add(theme);
    }
  }

  // 初始化渲染工具箱
  init(): void {
    this.update();
  }
  
}