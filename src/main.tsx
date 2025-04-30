import { render } from './packages/csr';
import Toolbar from './components/toolbar';
import './global';
import { createVNode } from './packages/core';


const App = () => {
  const test = () =>{
    console.log(1234);
  }
  return (
    <div>
      <Toolbar />
    </div>
  );
};

export function initToolbar(options?: any) {
  const app = App();
  const toolbar = Toolbar();
  render(App(), document.querySelector("body"));
  render(createVNode('div', null, 
  
    [ toolbar,
      createVNode('div', { class: '1' }, [2]),
      createVNode('div', { class: '2' }, [2])],
  ), document.querySelector("body"));
}