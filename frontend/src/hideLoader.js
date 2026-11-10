import heroLg from './assets/HeroSections.webp'
import heroMd from './assets/mdHeroSection.webp'
import heroSm from './assets/smHeroSection.webp'

const MIN_SHOW_MS = 1200  // the loading screen stays at least this long, so it never just flashes
const MAX_WAIT_MS = 6000  // stop waiting for fonts and images after this

const pickHero = () => {
  const w = window.innerWidth
  return w < 640 ? heroSm : w < 1024 ? heroMd : heroLg
}

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () => (img.decode ? img.decode().catch(() => {}).then(resolve) : resolve())
    img.onerror = resolve
    img.src = src
  })

const loadFonts = async () => {
  if (!document.fonts) return
  await Promise.allSettled([...document.fonts].map((f) => f.load()))
  await document.fonts.ready
}

export async function hideLoader() {
  const loader = window.AWLoader
  if (!loader) return
  if (window.location.pathname !== '/') return
  if (sessionStorage.getItem('awchem-loader-seen') !== 'true') return

  if (document.readyState !== 'complete') {
    await new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
  }
  loader.set(0.45)

  const onHome = window.location.pathname === '/'

  const fonts = loadFonts().then(() => loader.set(onHome ? 0.7 : 0.9))
  const hero = onHome ? preloadImage(pickHero()).then(() => loader.set(0.95)) : Promise.resolve()

  await Promise.race([
    Promise.allSettled([fonts, hero]),
    new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS)),
  ])

  const wait = Math.max(0, MIN_SHOW_MS - performance.now())
  setTimeout(() => loader.finish(), wait)
}