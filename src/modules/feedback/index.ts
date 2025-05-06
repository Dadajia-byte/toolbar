
import { render } from '@/core/runtime-dom';
import IframeModal from './IframeToast';

export function initIframeModal() {
  const container = document.querySelector('#iframeToast');
  if (!container) {
    const newContainer = document.createElement('div');
    newContainer.id = 'iframeToast';
    document.body.appendChild(newContainer);
    render(IframeModal(), newContainer);
  } else {
    render(IframeModal(), container);
  }
}

initIframeModal;