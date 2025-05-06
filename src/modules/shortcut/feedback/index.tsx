import { initIframeModal } from "../../feedback";
const Feedback = () =>{
  const hide = () => {
    const pop = document.querySelector('#shortcut-feedback_pop') as HTMLElement;
    pop.classList.add('hide');
  }
  const show = () => {
    const pop = document.querySelector('#shortcut-feedback_pop') as HTMLElement;
    pop.classList.remove('hide');
  }
  return (
    <div class="shortcut-item" onClick={initIframeModal} onMouseenter={show} onMouseLeave={hide}>
      <svg class="svg-icon" viewBox="0 0 23 23" width="20" height="20">
        <path d="M14.6875 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H18C19.1046 22 20 21.1046 20 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M19.6063 3.06066C20.1921 2.47487 21.1419 2.47487 21.7277 3.06066V3.06066C22.3134 3.64645 22.3134 4.59619 21.7277 5.18198L12.1817 14.7279H10.0604V12.6066L19.6063 3.06066Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
      <div id="shortcut-feedback_pop" class="shortcut-item-pop hide">
        <i class="triangle_right"><i class="triangle_inner"></i></i>
        <div class="content">
          <span>问题反馈</span>
        </div>
      </div>
    </div>
  )
}

export default Feedback;