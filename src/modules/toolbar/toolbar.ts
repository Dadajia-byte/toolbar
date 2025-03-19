type Module = {
  name: string; // 模块名称
  render: () => HTMLElement; // 渲染函数，返回一个 DOM 元素
};

interface ToolbarOptions {
  defaultModules?: string[]; // 默认渲染的模块名称
  customModules?: Module[];  // 自定义模块
}

export class Toolbar {
  private defaultModules: Record<string, Module>;
  private activeModules: Module[];

  constructor(options: ToolbarOptions = {}) {
    // 定义默认模块
    this.defaultModules = {
      search: {
        name: 'search',
        render: () => {
          const div = document.createElement('div');
          div.innerText = 'Search Module';
          return div;
        },
      },
      settings: {
        name: 'settings',
        render: () => {
          const div = document.createElement('div');
          div.innerText = 'Settings Module';
          return div;
        },
      },
    };

    // 初始化激活的模块
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

  // 动态添加模块
  addModule(module: Module) {
    this.activeModules.push(module);
  }

  // 渲染工具栏
  render(): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    this.activeModules.forEach((module) => {
      const moduleElement = module.render();
      toolbar.appendChild(moduleElement);
    });

    return toolbar;
  }
}