import { createVNode, VNode } from "@/packages/core";
import { BaseModule } from '../base/BaseModule';
import "./toolbar.scss";
import { injector } from "./default";
interface ToolbarOptions {
  theme?: "dark" | "light";
  defaultModules?: Array<string | {name: string; options?: any}>;
  customModules?: BaseModule[];
  container?: HTMLElement;
}


export class Toolbar extends BaseModule {
  readonly name = "toolbar";
  private activeModules: BaseModule[] = [];
  private theme: "dark" | "light"; // 主题，默认 dark

  constructor(options: ToolbarOptions) {
    super();
    this.theme = options.theme || "dark";
    const defaultModules = this.resolveDefaultModules(options.defaultModules || ['top']);
    const customModules = options.customModules || [];
    this.activeModules = [...defaultModules, ...customModules].sort((a, b)=> (a.order || 0) - (b.order || 0));
  }

  private resolveDefaultModules(defaultModules: Array<string | { name: string; options?: any }>): BaseModule[] {
    return defaultModules.map((module) => {
      if (typeof module === "string") {
        return injector.resolve(module);
      } else {
        return injector.resolve(module.name, module.options);
      }
    });
  }

  render(): VNode {
    return createVNode("div", { id: "toolbar", class: this.theme }, this.activeModules.map((module) => module.render()));
  }

  onMount() {
    this.forceUpdate();
  }

  switchTheme(theme?: "dark" | "light") {
    this.theme = theme || (this.theme === "dark" ? "light" : "dark");
    this.forceUpdate();
  }

  addModule(module: BaseModule) {
    this.activeModules.push(module);
    this.forceUpdate();
  }

  removeModule(moduleName: string) {
    this.activeModules = this.activeModules.filter(m => m.name !== moduleName);
    this.forceUpdate();
  }
  init(container?: HTMLElement) {
    this.mount(container || document.body)
  }
}