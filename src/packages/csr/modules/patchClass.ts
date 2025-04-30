export default function patchClass(el:HTMLElement, value:string | null) {
  if (value == null) {
    // 移除class
    el.removeAttribute("class");
  } else {
    el.className = value;
  }
}
