
import { render } from '@/core/runtime-dom';
import IframeModal from './IframeToast';

export function showIframeModal() {
  const container = document.querySelector('#iframeToast');
  if (!container) {
    const newContainer = document.createElement('div');
    newContainer.id = 'iframeToast';
    document.body.appendChild(newContainer);
    render(IframeModal(), newContainer);
  } else {
    const container = document.querySelector('#feedbackModal');
    container && container.classList.remove('hide');
  }
  const iframe = document.querySelector('#rightAiframe') as HTMLIFrameElement;
  iframe && (iframe.src = 'https://h5.dcl.qq.com/pc/index?data=SZ6wGdUZk82mFYkORyuDsj9lxy8aniJRcnNHCA+aDz1bjfEmkZPenDYOVyHRXh80sczptlCxual5qeDM0l1R8PjNCbsPz1+QsHtCKLQghdX8HCuvn/wEgzo3iS+LV1Grk2UWzsWJfrGy+1w+R7HMB7B3qVWxdZ5X59KvIMXqK2EZP9Ru5UA4vxDdHl1pUfjbsbOEm9RoM9L6Mk2MVEWMK/9T8pq9vMtH/6tzel/U1HMUJraK6JBimfSaF3lMYV1958wLE1Yc6093pNZ/KjjI35vXrRhZm1cJHIf7oGo3sEZE/ki2082ugvXzCcKKVF8xz6d0h2Aeu4xyDx2S/nL4fw==&appid=843a3ae2a1&pid=1&customField=%7B%22custom_vuid%22%3A%22c495c0c79457b9f2%22%2C%22custom_url%22%3A%22test.v.qq.com%2Fx%2Fcover%2Fmzc00200102dx2m%2Fv4100nqhj9y.html%22%2C%22custom_flowid%22%3A%221e10dd4592e3cc3f989ac882d9bfbb57%22%2C%22custom_errorCode%22%3A%22%22%2C%22custom_vid%22%3A%22v4100nqhj9y%22%2C%22custom_level%22%3A%22hd%22%2C%22custom_clientExperimentID%22%3A%2211892115%2310119966%23111689647%22%7D&serviceId=1521&pcHomeType=1');
}