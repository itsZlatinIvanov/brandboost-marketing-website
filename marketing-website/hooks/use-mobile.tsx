
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Function to check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkMobile()

    // Set up proper event listeners
    window.addEventListener("resize", checkMobile)
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Always return a boolean (defaulting to false if not yet determined)
  return isMobile === undefined ? false : isMobile
}
