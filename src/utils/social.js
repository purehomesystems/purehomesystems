const INSTAGRAM_WEB = 'https://www.instagram.com/getpurehomesystems/'
const INSTAGRAM_APP  = 'instagram://user?username=getpurehomesystems'

/**
 * Opens the Instagram profile.
 * - Desktop: lets the default <a href target="_blank"> behavior work unchanged.
 * - Mobile:  tries the native app deep link first (instagram://user?username=...),
 *            cancels the web fallback if the app actually opens (page becomes hidden),
 *            and falls back to the web profile URL after 1.2s if the app is not installed.
 */
export function openInstagram(e) {
  if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return
  e.preventDefault()

  let timer = setTimeout(() => {
    window.location.href = INSTAGRAM_WEB
  }, 1200)

  function cancelIfAppOpened() {
    if (document.hidden) {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', cancelIfAppOpened)
    }
  }
  document.addEventListener('visibilitychange', cancelIfAppOpened)

  window.location.href = INSTAGRAM_APP
}

export { INSTAGRAM_WEB }
