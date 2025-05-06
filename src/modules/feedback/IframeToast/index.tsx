import './index.scss';
import Navigation from '../logic/navigation';
const IframeModal = () =>{
	const navigation = new Navigation();
	const close = () => {
		const container = document.querySelector('#feedbackModal');
		container?.classList.add('hide');
		setIframeUrl('about:blank');
	};
	const setIframeUrl = (url: string) => {
		const iframe = document.querySelector('#rightAiframe') as HTMLIFrameElement;
		iframe && (iframe.src = url);
	};
	const back = () => {
		if (!navigation.canGoBack()) return; 
		setIframeUrl(navigation.back() || 'about:blank');
	};
	const forward = () => {
		if (!navigation.canGoForward()) return;
		setIframeUrl(navigation.forward() || 'about:blank');
	};
	const refresh = () => {
		setIframeUrl(navigation.reload() || 'about:blank');
	};
	function updateNavigationControls() {
		const backButton = document.querySelector('#backforward') as HTMLAnchorElement;
		const forwardButton = document.querySelector('#forward') as HTMLAnchorElement;
		backButton.classList.toggle('disabled', !navigation.canGoBack());
		forwardButton.classList.toggle('disabled', !navigation.canGoForward());
	}
	function handleIframeMessage(event: any) {
		var origin = event.origin || event.originalEvent.origin;
		if (origin !== 'https://h5.dcl.qq.com') {
				return;
		}
		var feedbackContent = event.data.content || '';
		var submitSuccess = ['1', '2'].includes(event.data.type) && feedbackContent.length > 0;
		if (event.data.action === 'LOCATION_CHANGE') {
				var newUrl = origin + event.data.payload.path;
				if (navigation.getIsManualNavigation()) {
					navigation.resetManualNavigation();
				} else {
						var currentUrl = navigation.getCurrentUrl();
						// 处理faq内部带有的back按钮（仅存在于faq详情页 -> index页）
						if (newUrl === 'https://h5.dcl.qq.com/pc/index' && currentUrl && currentUrl.indexOf('https://h5.dcl.qq.com/pc/faqs/') === 0) {
							navigation.back();
							navigation.resetManualNavigation();
						} else {
							navigation.push(newUrl);
						}
				}
				updateNavigationControls();
		}
		if (submitSuccess) {
				setTimeout(function () {
						close();
				}, 2150);
		}
	}
	window.addEventListener('message', handleIframeMessage);
  return (
    <div id="feedbackModal">
      <div id="aiseeContainer">
			<div class="titleWrap">
				<a id="backforward" class="navigation_controls disabled" style="left: 16px;" onClick={back}>
					<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5 15.8333L6.66667 9.99999L12.5 4.16666" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a id="forward" class="navigation_controls disabled" style="left: 52px;" onClick={forward}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.5 15.8333L13.3333 9.99999L7.5 4.16666" stroke="currentColor" fill="none" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a id="refresh" class="navigation_controls" style="left: 88px;" onClick={refresh}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.45833 6.66667H2.29166V2.5" stroke="currentColor" stroke-width="1.66667" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M2.25909 11.6667C3.02446 15.2386 6.19949 17.9167 10 17.9167C14.3723 17.9167 17.9167 14.3723 17.9167 10C17.9167 5.62776 14.3723 2.08334 10 2.08334C7.15657 2.08334 4.66326 3.58241 3.26727 5.83334" stroke="currentColor" fill="none" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<span style="font-size:20px;color: #000;">问题反馈</span>
				<a class="navigation_controls" style="right: 20px;margin-top:2px;" onClick={close}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 5L15 15" stroke="#111111" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M5 15L15 5" stroke="#111111" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>
			<div class="iframeWrap">
				<iframe id="rightAiframe" frameborder="0" scrolling="auto" width="100%" height="740px" src="about:blank"></iframe>
			</div>
		</div>
    </div>
  );
}

export default IframeModal;