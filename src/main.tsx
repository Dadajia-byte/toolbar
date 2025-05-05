import { render } from './packages/csr';
import Toolbar from './components/toolbar';
import './global';
import { createVNode } from './packages/core';

interface ToolbarOptions {

}

export function initToolbar(options?: ToolbarOptions) {
  render(createVNode(
    'div',
    null,
    [1, 2]
  ), document.querySelector("#app"));
  render(Toolbar(options), document.querySelector("body"));
}