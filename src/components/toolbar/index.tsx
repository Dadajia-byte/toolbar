import "./toolbar.scss";
import Top from "./top";
import Feedback from "./feedback";
import Contact from "./contact";
interface ToolbarOptions {

}
const Toolbar = (options?: ToolbarOptions) => {
  console.log(options);
  
  return (
    <div id="toolbar" class="dark">
      <Feedback/>
      <Contact/>
      <Top/>
    </div>
  );
}

export default Toolbar;