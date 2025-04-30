const Top = () =>{
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }) 
  }
  return (
    <div class="toolbar-item" onClick={scrollToTop}>
      <svg class="svg-icon" viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L0 10h4v10h12V10h4L10 0z"></path>
      </svg>
    </div>
  )
}

export default Top;