import { BaseModule } from "../../base/BaseModule";
import { Top } from "./top";

type ModuleFactory = (options?: any) => BaseModule;
class Injector {
  private registry = new Map<string, ModuleFactory>();

  // 注册模块
  register(name: string, factory: ModuleFactory) {
    this.registry.set(name, factory);
  }

  // 获取模块实例
  resolve(name: string, options?: any): BaseModule {
    const factory = this.registry.get(name);
    if (!factory) {
      throw new Error(`未找到 name 为 "${name}" 的模块`);
    }
    return factory(options);
  }
}

// 导出全局单例
export const injector = new Injector();

injector.register("top", (options) => new Top(options));