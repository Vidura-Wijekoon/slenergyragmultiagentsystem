
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    // Function to update state based on window size
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener with throttling to improve performance
    let resizeTimer: ReturnType<typeof setTimeout>
    const throttledResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', throttledResize)
    
    // Call once on mount to ensure accurate initial state
    handleResize()
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', throttledResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return isMobile
}
