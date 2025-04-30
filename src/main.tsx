import { render } from './packages/csr';
import Toolbar from './components/toolbar';
import './global';

interface ToolbarOptions {

}

export function initToolbar(options?: ToolbarOptions) {
  render(Toolbar(options), document.querySelector("body"));
}