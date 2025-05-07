import "./index.scss";
import Top from "./top";
import Feedback from "./feedback";
import Contact from "./contact";
import { render } from "preact";
interface ToolbarOptions {
  theme?: string;
  
}
export const Shortcut = (options?: ToolbarOptions) => {
  return (
    <div id="shortcut" class="dark">
      <Feedback/>
      <Contact/>
      <Top/>
    </div>
  );
}

export function initShortcut(options?: ToolbarOptions) {
  const container = document.querySelector('#shortcut_container');
  if (!container) {
    const newContainer = document.createElement('div');
    newContainer.id = 'shortcut_container';
    document.body.appendChild(newContainer);
    render(Shortcut(options), newContainer);
  } else {
    render(Shortcut(options), container);
  }
}