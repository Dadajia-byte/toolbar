import './index.scss';
const IframeModal = () =>{
	const closeIframeModal = () => {
		const container = document.querySelector('#feedbackModal');
		container?.classList.add('hide');
	}
  return (
    <div id="feedbackModal">
      <div id="aiseeContainer">
			<div class="titleWrap">
				<a id="backforward" class="navigation_controls disabled" style="left: 16px;">
					<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5 15.8333L6.66667 9.99999L12.5 4.16666" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a id="forward" class="navigation_controls disabled" style="left: 52px;">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.5 15.8333L13.3333 9.99999L7.5 4.16666" stroke="currentColor" fill="none" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a id="refresh" class="navigation_controls" style="left: 88px;">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.45833 6.66667H2.29166V2.5" stroke="currentColor" stroke-width="1.66667" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M2.25909 11.6667C3.02446 15.2386 6.19949 17.9167 10 17.9167C14.3723 17.9167 17.9167 14.3723 17.9167 10C17.9167 5.62776 14.3723 2.08334 10 2.08334C7.15657 2.08334 4.66326 3.58241 3.26727 5.83334" stroke="currentColor" fill="none" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<span style="font-size:20px;color: #000;">问题反馈</span>
				<a class="navigation_controls" style="right: 20px;margin-top:2px;" onClick={closeIframeModal}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 5L15 15" stroke="#111111" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M5 15L15 5" stroke="#111111" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>
			<div class="iframeWrap">
				<iframe id="rightAiframe" frameborder="0" scrolling="auto" width="100%" height="740px" src="https://h5.dcl.qq.com/pc/index?data=SZ6wGdUZk82mFYkORyuDsj9lxy8aniJRcnNHCA+aDz1bjfEmkZPenDYOVyHRXh80sczptlCxual5qeDM0l1R8PjNCbsPz1+QsHtCKLQghdX8HCuvn/wEgzo3iS+LV1Grk2UWzsWJfrGy+1w+R7HMB7B3qVWxdZ5X59KvIMXqK2EZP9Ru5UA4vxDdHl1pUfjbsbOEm9RoM9L6Mk2MVEWMK/9T8pq9vMtH/6tzel/U1HMUJraK6JBimfSaF3lMYV1958wLE1Yc6093pNZ/KjjI35vXrRhZm1cJHIf7oGo3sEZE/ki2082ugvXzCcKKVF8xz6d0h2Aeu4xyDx2S/nL4fw==&appid=843a3ae2a1&pid=1&customField=%7B%22custom_vuid%22%3A%22c495c0c79457b9f2%22%2C%22custom_url%22%3A%22test.v.qq.com%2Fx%2Fcover%2Fmzc00200102dx2m%2Fv4100nqhj9y.html%22%2C%22custom_flowid%22%3A%221e10dd4592e3cc3f989ac882d9bfbb57%22%2C%22custom_errorCode%22%3A%22%22%2C%22custom_vid%22%3A%22v4100nqhj9y%22%2C%22custom_level%22%3A%22hd%22%2C%22custom_clientExperimentID%22%3A%2211892115%2310119966%23111689647%22%7D&serviceId=1521&pcHomeType=1"></iframe>
			</div>
		</div>
    </div>
  );
}

export default IframeModal;