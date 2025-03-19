import {createRenderer,VNode} from '@/core/renderer';
import { attrOps } from './attrOps';
import { nodeOps } from './nodeOps';
import { eventOps } from './eventOps';
const renderOptions = {
  ...nodeOps,
  ...attrOps,
  ...eventOps
}
export const render = (vnode: VNode, container:any) => {
  return createRenderer(renderOptions).render(vnode, container);
}