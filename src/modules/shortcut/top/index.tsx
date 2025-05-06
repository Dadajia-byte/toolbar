const Top = () =>{
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }) 
  }
  return (
    <div class="shortcut-item" onClick={scrollToTop}>
      <svg class="svg-icon" viewbox="0 0 20 20" width="20" height="20">
        <path d="M17 14.463a.996.996 0 0 1-.724-.313l-6.275-6.695-6.275 6.695c-.381.406-1.014.418-1.414.034s-.415-1.021-.034-1.424L9.277 5.3c.378-.4 1.071-.4 1.448 0l7 7.46c.38.403.365 1.04-.035 1.424a.992.992 0 0 1-.69.279z"></path>
      </svg>
    </div>
  )
}

export default Top;