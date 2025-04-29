import {createRenderer, VNode} from '@/core/index';
import { nodeOps } from './nodeOps';
import patchProp from './patchProps';
const renderOptions = Object.assign({patchProp}, nodeOps);
export const render = (vnode: VNode, container:any) => {
  return createRenderer(renderOptions).render(vnode, container);
}