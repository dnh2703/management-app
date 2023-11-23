import { useEffect } from 'react'

const useScrollLock = (isActive: boolean) => {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (isActive) {
        event.preventDefault()
      }
    }

    if (isActive) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('scroll', handleScroll, { passive: false })
    }

    return () => {
      document.body.style.overflow = 'visible'
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isActive])
}

export default useScrollLock
