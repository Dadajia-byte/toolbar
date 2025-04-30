import { render } from './packages/csr';
import Toolbar from './components/toolbar';
import './global';


const App = () => {
  return (
    <div>
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
      <Toolbar/>
    </div>
  );
};

export function initToolbar(options?: any) {
  const app = App();
  render(app, document.querySelector("body"));
}