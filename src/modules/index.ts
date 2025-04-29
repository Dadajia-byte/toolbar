import { createVNode, isVNode, VNode } from "@/core";
interface ModuleConfig {
  name: string;
  tag?: string;
  props: Record<string, any>;
  children?: Array<string | ModuleConfig | VNode>;
}

function isModuleConfig(obj: any): obj is ModuleConfig {
  return obj && typeof obj === 'object' && 'name' in obj;
}
// export function createModule(config: ModuleConfig): BaseModule {
//   return new ConfigModule(config);
// }

// class ConfigModule extends BaseModule {
//   name: string;
//   constructor(private config: ModuleConfig) {
//     super();
//     this.name = config.name;
//   }
//   render(): VNode {
//     const children = (this.config.children || []).map(child => {
//       if (typeof child === 'string') {
//         return createVNode(Text, null, child);
//       }
//       if (isModuleConfig(child)) {
//         return createModule(child).render();
//       }
//       if (isVNode(child)) {
//         return child;
//       }
//       throw new Error('无效的子元素类型');
//     });

//     return createVNode(
//       this.config.tag || 'div',
//       {
//         ...this.config.props,
//         class: ['module-base', this.config.props?.class].filter(Boolean).join(' ')
//       },
//       children
//     );
//   }
// }



export * from './toolbar/toolbar';