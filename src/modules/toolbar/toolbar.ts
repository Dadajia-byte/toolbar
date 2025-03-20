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
          this.addModule(module);
        }
      });
    }

    // 加载自定义模块
    if (options.customModules) {
      this.activeModules.push(...options.customModules);
    }
  }

  // 动态添加模块
  addModule(module: Module) {
    this.activeModules.push(module);
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
    const toolbarVNode:VNode = {
      tag: 'div',
      props: {
        id: 'toolbar',
        class: 'dark',
      },
      children: this.activeModules.map((module) => module.render())
    }
    render(toolbarVNode, document.body);
  }
  
}