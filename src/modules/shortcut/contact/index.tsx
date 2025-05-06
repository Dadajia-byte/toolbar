const Contact = ()=>{
  const hide = () => {
    const pop = document.querySelector('#toobar-contact_pop') as HTMLElement;
    pop.classList.add('hide');
  }
  const show = () => {
    const pop = document.querySelector('#toobar-contact_pop') as HTMLElement;
    pop.classList.remove('hide');
  }
  return (
    <div class="shortcut-item" onMouseenter={show} onMouseLeave={hide}>
      <svg class="svg-icon" viewbox="0 0 20 20" width="20" height="20">
        <path d="M6 9.417c0-.835.671-1.512 1.5-1.512.828 0 1.5.677 1.5 1.512s-.672 1.512-1.5 1.512c-.829 0-1.5-.677-1.5-1.512zm4.999 0c0-.835.672-1.512 1.5-1.512.829 0 1.5.677 1.5 1.512s-.671 1.512-1.5 1.512c-.828 0-1.5-.677-1.5-1.512zm3.72 6.645a.995.995 0 0 1-1.319-.513 1.01 1.01 0 0 1 .508-1.33 5.25 5.25 0 0 0 3.091-4.797c0-2.89-2.326-5.242-5.185-5.242H8.185C5.326 4.18 3 6.532 3 9.422c0 2.891 2.326 5.242 5.185 5.242h2.447l1.832 3.896a1.003 1.003 0 0 1-.902 1.44.998.998 0 0 1-.904-.576L9.367 16.68H8.185C4.224 16.68 1 13.424 1 9.422s3.224-7.258 7.185-7.258h3.629c3.961 0 7.185 3.256 7.185 7.258 0 2.871-1.68 5.477-4.28 6.64z"></path>
      </svg>
      <div id="toobar-contact_pop" class="shortcut-item-pop hide">
        <i class="triangle_right"><i class="triangle_inner"></i></i>
        <div class="content">
          <a class="link" target="blank" href="http://kf.qq.com/product/QQlive.html">客服</a>
          <a class="link" target="blank" style="margin-top: 10px;" href="https://rule.tencent.com/rule/preview/99b651d1-b46c-4e11-a688-ff729b08d88c">侵权投诉</a>
          <a class="link" target="blank" style="margin-top: 10px;" href="//film.qq.com/support/help.html?ptag=v.siderbar.help">VIP帮助中心</a>
          <a class="link" target="blank" style="margin-top: 10px;" href="//dcm.qq.com/txsp.html#/">VIP采购</a>
        </div>
      </div>
    </div>
  )
}

export default Contact;