// 节点的 DOM 操作

export const nodeOps = {
  // 创建元素
  createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  },
  // 创建文本节点
  createText(text: string): Text {
    return document.createTextNode(text);
  },
  // 设置文本
  setText(node: Text, text: string): void {
    node.nodeValue = text;
  },
  // 设置元素文本
  setElementText(node: HTMLElement, text: string): void {
    node.textContent = text;
  },
  // 插入节点
  insert(child: Node, parent: Node, anchor: Node | null = null): void {
    parent.insertBefore(child, anchor);
  },
  // 删除节点
  remove(child: Node): void {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  // 获取父节点
  parentNode(node: Node): Node | null {
    return node.parentNode;
  },
  // 获取下一个兄弟节点
  nextSibling(node: Node): Node | null {
    return node.nextSibling;
  },
};