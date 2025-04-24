import { VNode } from "@/core";
import { render } from "@/csr";
import "./toolbar.scss";
export type Module = {
  name: string; // 模块名称
  render: () => VNode; // 渲染函数，返回一个 VNode
};

export interface ToolbarOptions {
  theme?: "dark" | "light"; // 主题，默认 dark
  defaultModules?: string[]; // 默认渲染的模块名称
  customModules?: Module[];  // 自定义模块
  container?: HTMLElement; // 渲染的容器 默认 document.body
}

export class Toolbar {
  private defaultModules: Record<string, Module>;
  private activeModules: Module[];
  private theme: "dark" | "light"; // 主题，默认 dark
  private toolbarVNode: VNode; // 工具箱的 VNode
  private container: HTMLElement; // 渲染的容器 默认 document.body

  constructor(options: ToolbarOptions = {}) {
    this.theme = options.theme || "dark";
    this.container = options.container || document.body; // 默认容器
    this.toolbarVNode = {
      type: "div",
      props: {
        id: "toolbar",
        class: this.theme,
      },
      children: [],
    }
    this.activeModules = [];
    this.defaultModules = {}
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
    // 初始化工具栏的 VNode
    this.toolbarVNode = {
      type: "div",
      props: {
        id: "toolbar",
        class: this.theme,
      },
      children: this.activeModules.map((module) => module.render()),
    };
    
  }
  private update(): void {
    this.toolbarVNode = {
      ...this.toolbarVNode,
      props: {
        ...this.toolbarVNode.props,
        class: this.theme,
      },
      children: this.activeModules.map((module) => {
        const vnode = module.render();
        return { ...vnode };
      }),
    };
    console.log("toolbarVNode", this.toolbarVNode.children);
    
    render(this.toolbarVNode, this.container);
  }

  reorderModules(order: string[]) {
    const moduleMap = new Map(this.activeModules.map((module) => [module.name, module]));
    const orderModules = order.map((name) => moduleMap.get(name)).filter(Boolean) as Module[];
    const remainingModules = this.activeModules.filter((module) => !order.includes(module.name));
    this.activeModules = [...orderModules, ...remainingModules];
    this.update();
  }

  switchTheme(theme?: "dark" | "light") {
    if (theme) {
      this.theme = theme;
    } else {
      this.theme = this.theme === "dark" ? "light" : "dark";
    }
    this.update();
  }

  // 动态添加模块
  addModule(module: Module) {
    this.activeModules.push(module);
    this.update();
  }
  // 动态删除模块
  removeModule(moduleName: string) {
    this.activeModules = this.activeModules.filter((module) => module.name !== moduleName);
    this.update();
  }

  // 初始化渲染工具箱
  init(): void {
    this.update();
  }
  
}