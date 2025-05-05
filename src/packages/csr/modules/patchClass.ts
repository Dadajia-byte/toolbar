export default function patchClass(el:HTMLElement, value:string | null) {
  if (value == null) {
    // 移除class
    el.removeAttribute("class");
  } else {
    if (el instanceof SVGElement) {
      // 对于 SVG 元素，使用 setAttribute 设置 class
      el.setAttribute('class', value);
    } else {
      // 对于普通 HTML 元素，直接设置 className
      (el as HTMLElement).className = value;
    }
  }
}
