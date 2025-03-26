/**
 * BrandBoost Theme Guide
 * 
 * This file serves as documentation for the BrandBoost design system
 * and provides utilities for applying consistent styling across the site.
 */

import { type ClassValue } from "clsx";
import { cn } from "./utils";

// Brand Colors - Extracted from actual components
export const brandColors = {
  // Core brand colors
  primary: {
    blue: {
      light: "#93C5FD", // light blue
      default: "#3B82F6", // medium blue
      dark: "#1E40AF", // dark blue
    },
    purple: {
      light: "#C4B5FD", // light purple
      default: "#8B5CF6", // medium purple
      dark: "#6D28D9", // dark purple
    },
  },
  // Gradients
  gradients: {
    blueToPurple: "bg-gradient-to-r from-blue-600 to-purple-600",
    blueToPurpleHover: "hover:from-blue-700 hover:to-purple-700",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500",
    textGradientLight: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
    iconGradients: {
      reach: "from-blue-500 to-purple-600", // Target icon
      engagement: "from-purple-500 to-indigo-600", // BarChart2 icon
      conversion: "from-indigo-500 to-blue-600", // Users icon
    },
    cardTopBorders: {
      blue: "from-blue-600 to-purple-600",
      purple: "from-purple-600 to-indigo-600",
      indigo: "from-indigo-600 to-blue-600",
      cyan: "from-cyan-600 to-purple-600",
    }
  },
  // Theme colors
  theme: {
    dark: {
      text: {
        primary: "text-white",
        secondary: "text-slate-300",
        muted: "text-slate-400",
      },
      background: {
        primary: "bg-slate-900",
        secondary: "bg-slate-800/50",
        overlay: "bg-slate-900/70",
      },
      border: "border-slate-700",
    },
    light: {
      text: {
        primary: "text-slate-900",
        secondary: "text-slate-600",
        muted: "text-slate-500",
      },
      background: {
        primary: "bg-white",
        secondary: "bg-slate-50",
        overlay: "bg-white/90",
      },
      border: "border-slate-200",
    },
  },
  
  // Social media colors
  social: {
    instagram: 'text-rose-400',
    youtube: 'text-red-500',
    tiktok: 'text-slate-200',
  },
  
  // Various component special colors
  components: {
    statsCard: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100/50',
    sectionDivider: 'bg-blue-500',
    activeTab: 'text-blue-600 border-b-2 border-blue-600',
  }
};

// Typography - Extracted from components
export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl xl:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl font-bold',
    sectionTitleDark: 'text-3xl md:text-4xl font-bold text-white',
    sectionTitleLight: 'text-3xl md:text-4xl font-bold text-slate-900',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600',
    gradientLight: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500',
  },
  body: {
    regular: 'text-base',
    large: 'text-lg md:text-xl',
    small: 'text-sm',
    largeDark: 'text-xl md:text-2xl text-slate-300 leading-relaxed font-light',
  },
  label: {
    section: 'text-blue-600 font-semibold uppercase tracking-wider text-sm',
    sectionDark: 'text-blue-400 font-medium uppercase tracking-wider text-sm',
  }
};

// Spacing - Consistent with components
export const spacing = {
  container: 'container mx-auto px-4',
  section: 'py-16 md:py-24',
  verticalGap: {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },
  horizontalGap: {
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-8',
    xl: 'space-x-12',
  },
};

// Shadows - Extracted from components
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  primary: 'shadow-lg shadow-blue-900/20',
  highlight: 'shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30',
  borders: {
    light: 'border border-slate-200/50',
    dark: 'border border-slate-700',
    highlight: 'border border-blue-500/50',
    lightHighlight: 'border border-purple-100/50',
  },
};

// Borders - Extracted from components
export const borders = {
  sm: 'border border-gray-200 rounded-md',
  md: 'border border-gray-200 rounded-lg',
  lg: 'border border-gray-200 rounded-xl',
  dark: 'border border-slate-700 rounded-xl',
  gradient: 'bg-gradient-to-br from-blue-600 to-purple-600 p-[3px] rounded-full',
};

// Animations - Extracted from components
export const animations = {
  fadeInUp: {
    initial: 'opacity-0 translate-y-4',
    animate: 'opacity-100 translate-y-0',
    transition: 'transition-all duration-700 ease-out',
  },
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-all duration-700 ease-out',
  },
  scaleIn: {
    initial: 'opacity-0 scale-95',
    animate: 'opacity-100 scale-100',
    transition: 'transition-all duration-500 ease-out',
  },
  hoverLift: 'transition-all hover:-translate-y-1',
  hoverScale: 'transition-transform duration-300 hover:scale-105',
  hoverScaleSm: 'transition-transform duration-200 hover:scale-102',
  pulseBubbles: {
    small: 'y-[0px_-5px_0px_5px_0px]', 
    medium: 'y-[0px_-7px_0px_7px_0px]',
    large: 'y-[0px_-9px_0px_9px_0px]',
    opacitySequence: 'opacity-[0.85_0.9_0.85]',
    durations: {
      short: 'duration-7',
      medium: 'duration-8',
      long: 'duration-9'
    }
  },
  float: {
    slow: 'animate-float-slow',
    medium: 'animate-float-medium',
    fast: 'animate-float-fast',
  },
  shine: 'relative overflow-hidden after:absolute after:inset-0 after:w-8 after:h-full after:bg-white/20 after:blur-xl after:-translate-x-full hover:after:translate-x-[200%] after:transition-transform after:duration-[1.2s]',
  physicsBasedBubbles: {
    generateBubbleAnimation: (initialLeft: number, initialTop: number, duration: number = 3, delay: number = 0) => {
      return {
        initial: { 
          opacity: 0, 
          scale: 0.2,
          left: `${initialLeft}%`,
          top: `${initialTop}%`,
          x: 0,
          y: 0
        },
        animate: { 
          opacity: [0, 0.85, 0.9, 0.7, 0.5, 0.3, 0], 
          scale: [0.3, 0.8, 1, 1.1, 1.05, 0.9, 0.7],
          x: [0, 5, -5, 7, -7, 3, -3, 0],
          y: [0, -20, -50, -90, -140, -200, -270, -350]
        },
        transition: {
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 1.5 + 0.5,
          ease: [0.1, 0.3, 0.5, 0.7],
        }
      }
    },
    bubbleColors: {
      likes: 'bg-gradient-to-br from-pink-500 to-rose-500',
      comments: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      shares: 'bg-gradient-to-br from-green-500 to-emerald-400'
    }
  },
  platformIcons: {
    wrapperClasses: 'flex items-center justify-center h-16 w-16 rounded-full bg-slate-800/70 backdrop-blur-sm border border-slate-700 mb-2 shadow-lg',
    animation: {
      animate: { y: [0, -5, 0, 5, 0] },
      generateTransition: (index: number) => ({
        repeat: Infinity,
        duration: 4 + index,
        ease: 'easeInOut'
      })
    },
    platformColors: {
      instagram: 'text-rose-400',
      tiktok: 'text-slate-200',
      youtube: 'text-red-500'
    }
  },
  processSteps: {
    pathAnimation: {
      initial: { pathLength: 0 },
      animate: { pathLength: 1 },
      transition: { duration: 1.5, ease: 'easeInOut' }
    },
    stepAnimation: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      generateTransition: (index: number) => ({
        delay: 0.5 + (index * 0.2), 
        duration: 0.5
      })
    },
    glowRings: {
      generateAnimation: (index: number) => ({
        scale: [1, 2, 1],
        opacity: [0.4, 0, 0.4],
        transition: { 
          duration: 3, 
          repeat: Infinity,
          delay: index * 0.3,
          ease: 'easeInOut'
        }
      })
    }
  },
  morphingGradient: {
    animate: { backgroundPosition: ["0% 0%", "100% 100%"] },
    transition: { duration: 12, repeat: Infinity, repeatType: "mirror", ease: "linear" }
  },
  floatingParticle: {
    animate: { 
      y: [0, -100],
      x: [0, 10, -10, 10],
      opacity: [0, 0.5, 0],
      scale: [0, 1.5, 0]
    },
    transition: { 
      duration: 8, 
      repeat: Infinity,
      delay: 0,
      ease: "linear"
    }
  },
  twinklingStar: {
    animate: { 
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.3, 1]
    },
    transition: { 
      duration: 4, 
      repeat: Infinity,
      delay: 0,
      ease: "easeInOut"
    }
  }
};

// Buttons - Extracted from components
export const buttons = {
  primary: (extraClasses = '') => 
    `bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-4 px-6 font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 ${extraClasses}`,
  secondary: (extraClasses = '') => 
    `bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg py-4 px-6 font-medium shadow-sm transition-all hover:-translate-y-1 ${extraClasses}`,
  dark: (extraClasses = '') => 
    `bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/10 rounded-lg py-4 px-6 font-medium shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-1 ${extraClasses}`,
  link: (extraClasses = '') => 
    `text-blue-600 hover:text-blue-700 font-medium ${extraClasses}`,
  shine: (extraClasses = '') => 
    `group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-4 px-6 font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 ${extraClasses}`,
  tab: (isActive: boolean) => cn(
    'px-4 py-3 font-medium text-sm relative',
    isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-blue-600'
  ),
};

// Social Media Elements - Extracted from components
export const socialElements = {
  engagementBubble: (color: string) => `flex items-center gap-1.5 ${color} text-white rounded-full shadow-lg`,
  likesBubble: 'flex items-center gap-1.5 bg-gradient-to-br from-pink-500 to-rose-500 text-white',
  commentsBubble: 'flex items-center gap-1.5 bg-gradient-to-br from-blue-500 to-cyan-400 text-white',
  sharesBubble: 'flex items-center gap-1.5 bg-gradient-to-br from-green-500 to-emerald-400 text-white',
  platformBadge: 'flex flex-col items-center',
  socialProof: 'flex items-center gap-3 text-sm text-slate-400',
  resultCard: {
    wrapper: 'absolute overflow-hidden rounded-2xl p-[2px] aspect-[9/16]',
    content: 'relative h-full w-full overflow-hidden rounded-xl bg-slate-900',
    animation: {
      float: {
        animate: { 
          y: [0, -5, 0, 5, 0],
          rotate: [0, 1, 0, -1, 0],
        },
        transition: (index: number) => ({
          repeat: Infinity,
          duration: 6 + index,
          ease: 'easeInOut',
        })
      }
    },
    viewBadge: 'absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-purple-500/50',
  },
};

// Icons - Extracted from components
export const iconStyles = {
  featureIcon: 'w-12 h-12 rounded-lg flex items-center justify-center shadow-md',
  actionIcon: 'w-5 h-5 text-white',
  platformIcon: 'h-8 w-8',
  indicatorIcon: 'h-4 w-4 text-blue-500',
  sectionIcon: 'h-6 w-6 text-white',
};

// Card Styles - Extracted from components
export const cards = {
  primary: (extraClasses = '') => 
    `bg-white rounded-xl shadow-xl border border-slate-200/50 overflow-hidden ${extraClasses}`,
  secondary: (extraClasses = '') => 
    `bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-purple-100/50 shadow-md ${extraClasses}`,
  dark: (extraClasses = '') => 
    `bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden ${extraClasses}`,
  featureLight: (extraClasses = '') => 
    `bg-white rounded-xl shadow-lg border border-slate-200/70 overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200/50 ${extraClasses}`,
  featureDark: (extraClasses = '') => 
    `bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 transform transition-all hover:-translate-y-1 hover:border-blue-500/50 ${extraClasses}`,
  testimonial: (extraClasses = '') => 
    `relative bg-white rounded-xl shadow-xl border border-slate-200/50 overflow-hidden p-5 ${extraClasses}`,
  featureCardSizes: {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  },
  topBorder: {
    gradient: (colors: string) => `h-1.5 bg-gradient-to-r ${colors}`,
    blue: 'h-1.5 bg-gradient-to-r from-blue-600 to-purple-600',
    purple: 'h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600',
    indigo: 'h-1.5 bg-gradient-to-r from-indigo-600 to-blue-600'
  },
  processCard: 'flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-purple-100/80',
  teamMember: 'flex flex-col items-center',
  avatar: 'rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-white/80',
  avatarWrapper: 'rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[3px] flex items-center justify-center shadow-xl shadow-blue-500/10 hover:shadow-purple-500/20 transition-shadow duration-300'
};

// Background Elements - Extracted from components
export const backgroundElements = {
  dark: {
    base: "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 bg-[length:200%_200%]",
    radialGradients: {
      blue: "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]",
      purple: "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.3),transparent_70%)]"
    },
    particlesEffect: {
      container: "absolute inset-0",
      particle: (left: number, top: number, scale: number) => 
        `absolute w-1 h-1 rounded-full bg-white opacity-20 left-[${left}%] top-[${top}%] scale-[${scale}]`,
      animation: {
        y: [0, -100],
        x: [0, 50],
        opacity: [0, 0.5, 0],
        scale: [0, 2, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },
    gridPattern: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjMDAwMDAwMDUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgZmlsbD0iIzAwMDAwMDA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30 bg-[size:30px_30px]"
  },
  light: {
    base: "bg-gradient-to-b from-white via-slate-50/90 to-purple-50/30",
    radialGradients: {
      overlay: "bg-gradient-to-br from-purple-200/60 via-transparent to-blue-100/40 bg-[length:200%_200%]",
      purple: "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.25),transparent_70%)]",
      blue: "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]"
    },
    starsEffect: {
      container: "absolute inset-0",
      star: (left: number, top: number, scale: number) => 
        `absolute w-[2px] h-[2px] rounded-full bg-gradient-to-br from-purple-300 to-blue-200 left-[${left}%] top-[${top}%] scale-[${scale}]`,
      animation: {
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.3, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    starTrailsEffect: {
      container: "absolute inset-0",
      trail: (left: number, top: number, width: number, rotation: number) => 
        `absolute h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent left-[${left}%] top-[${top}%] w-[${width}px] rotate-[${rotation}deg]`,
      animation: {
        opacity: [0, 0.4, 0],
        scale: [0.8, 1, 0.8],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    enhancedGradientOverlay: "absolute inset-0 bg-gradient-to-br from-purple-200/60 via-transparent to-blue-100/40 bg-[length:200%_200%]",
    gridPattern: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjNjE2MEZGMDgiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgZmlsbD0iIzYxNjBGRjA4Ii8+PC9nPjwvc3ZnPg==')] opacity-20 bg-[size:30px_30px]"
  },
  effects: {
    floatingParticles: {
      create: (count: number, color: string = "rgba(255,255,255,0.2)") => ({
        className: "absolute inset-0",
        particles: Array.from({ length: count }).map((_, i) => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${1 + Math.random() * 1.5}px`,
          color,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 5}s`
        }))
      }),
    },
    twinklingStars: {
      create: (count: number) => ({
        className: "absolute inset-0",
        stars: Array.from({ length: count }).map((_, i) => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${1 + Math.random() * 1}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }))
      }),
    }
  },
  decorativeCircle: {
    blue: 'absolute w-32 h-32 bg-blue-500 rounded-full opacity-30 filter blur-xl',
    purple: 'absolute w-32 h-32 bg-purple-500 rounded-full opacity-30 filter blur-xl',
    positions: {
      topRight: 'top-20 -right-10',
      topCenter: 'top-64 right-64',
      bottomLeft: 'bottom-40 -left-10',
      bottomRight: 'bottom-20 right-32'
    }
  },
  animations: {
    createBackgroundSection: (theme: 'dark' | 'light', padding = true) => {
      const baseClasses = theme === 'dark'
        ? 'relative overflow-hidden isolate' 
        : 'relative overflow-hidden';
      
      const paddingClasses = padding ? 'py-16 md:py-20' : '';
      
      return `${baseClasses} ${paddingClasses}`;
    }
  }
};

// Commonly used component patterns - Extracted from components
export const patterns = {
  heroSection: `
    ${spacing.section} 
    relative overflow-hidden
  `,
  sectionHeader: {
    light: `
      max-w-3xl mx-auto text-center mb-12
    `,
    dark: `
      max-w-3xl mx-auto text-center mb-12
    `,
  },
  sectionTitle: {
    light: `
      text-3xl md:text-4xl font-bold mb-3 text-slate-900
    `,
    dark: `
      text-3xl md:text-4xl font-bold mb-3 text-white
    `,
  },
  sectionDescription: {
    light: `
      text-slate-600 max-w-2xl mx-auto
    `,
    dark: `
      text-slate-300 max-w-2xl mx-auto
    `,
  },
  sectionDivider: `
    flex items-center justify-center gap-2 mb-4
  `,
  dividerLine: 'h-px w-12 bg-blue-500',
  teamMember: `
    w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[3px] flex items-center justify-center shadow-xl shadow-blue-500/10 mb-4 hover:shadow-purple-500/20 transition-shadow duration-300
  `,
  featureIcon: `
    flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br shadow-md
  `,
  trustIndicator: 'flex items-center gap-3 text-sm text-slate-400',
  starRating: 'flex',
  roadmap: 'relative max-w-5xl mx-auto',
  codeExample: 'bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden',
  codeHeader: 'border-b border-slate-700 px-6 py-3',
  codeContent: 'p-6'
};

// Export common combinations for convenience
export const common = {
  pageWrapper: "min-h-screen bg-white",
  mainContentWrapper: "pt-20", // Account for fixed header
  sectionContainer: "container mx-auto px-4 py-16 relative z-10",
  grid: {
    cols2: "grid md:grid-cols-2 gap-6",
    cols3: "grid md:grid-cols-3 gap-6",
    cols4: "grid md:grid-cols-4 gap-6",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    column: "flex flex-col",
    wrap: "flex flex-wrap",
  },
  responsive: {
    hidden: {
      sm: "sm:hidden",
      md: "md:hidden",
      lg: "lg:hidden",
    },
    show: {
      sm: "hidden sm:block",
      md: "hidden md:block",
      lg: "hidden lg:block",
    },
  },
  createBackgroundSection: (theme: 'dark' | 'light', padding = true) => {
    const baseClasses = theme === 'dark'
      ? 'relative overflow-hidden isolate' 
      : 'relative overflow-hidden';
    
    const paddingClasses = padding ? 'py-16 md:py-20' : '';
    
    return `${baseClasses} ${paddingClasses}`;
  }
};

// Add new sections for advanced animations and Instagram UI patterns

// Add HD Text Rendering styles from TestimonialsSection
export const hdTextRendering = {
  // Define global styles for HD text rendering
  base: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontKerning: 'normal',
    textSizeAdjust: '100%',
  },
  
  // Button style optimization for crisp rendering
  crispButton: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontKerning: 'normal',
    textSizeAdjust: '100%',
    fontSmooth: 'always',
    letterSpacing: '0.025em',
    transform: 'translateZ(0)', // Force GPU acceleration
    backfaceVisibility: 'hidden',
    fontWeight: 500,
  },
  
  // Optimized small text style for bios and tiny text
  crispSmallText: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontKerning: 'normal',
    textSizeAdjust: '100%',
    fontSmooth: 'always',
    letterSpacing: '0.01em',
    transform: 'translateZ(0)',
    fontWeight: 400,
    lineHeight: 1.2,
    wordSpacing: '0.02em',
    fontOpticalSizing: 'auto',
    fontSynthesis: 'none',
  },
  
  // Ultra crisp style for very small text with enhanced readability
  ultraCrispSmallText: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontKerning: 'normal',
    textSizeAdjust: '100%',
    fontSmooth: 'always',
    letterSpacing: '0.01em',
    transform: 'translateZ(0)',
    lineHeight: 1.2,
    wordSpacing: '0.02em',
    fontOpticalSizing: 'auto',
    fontSynthesis: 'none',
    textShadow: '0 0 0.01px rgba(255, 255, 255, 0.4)',
    fontFeatureSettings: '"tnum", "lnum", "calt" off',
    fontVariantNumeric: 'lining-nums tabular-nums',
    WebkitTextStroke: '0.01px rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.98)',
    fontWeight: 500,
  }
};

// Add Instagram UI patterns from TestimonialsSection
export const instagramUI = {
  // Frame styling
  frame: {
    wrapper: "rounded-b-2xl shadow-xl overflow-hidden border-4 border-t-0 flex flex-col bg-black text-white rounded-b-2xl",
    statusBar: "flex justify-between items-center px-2 py-1 text-[10px]",
    header: "flex items-center justify-between px-2 py-1 border-b border-gray-800",
    content: "flex-none",
    navTabs: "flex mt-3 border-t border-gray-800",
  },
  
  // Instagram profile elements
  profile: {
    imageContainer: {
      before: "rounded-full overflow-hidden border border-gray-700 ring-1 ring-gray-800",
      after: "rounded-full overflow-hidden border-2 border-blue-500 ring-1 ring-blue-600",
    },
    statsContainer: "flex justify-between",
    stats: {
      wrapper: "text-center",
      value: "text-sm font-semibold",
      label: "text-[10px]"
    },
    bio: "text-[10px] leading-snug px-[0.5px]",
    website: "text-[10px] text-blue-400 mt-0.5 px-[0.5px]",
  },
  
  // Instagram button styles
  buttons: {
    follow: "flex-1 bg-blue-600 text-white text-[10px] font-medium py-1 rounded text-center",
    message: "flex-1 bg-gray-800 text-white text-[10px] font-medium py-1 rounded text-center",
    iconButton: "bg-gray-800 text-white px-1 py-1 rounded flex items-center justify-center"
  },
  
  // Before/After labels
  labels: {
    before: "bg-red-100 text-red-800 p-2 text-center font-bold text-sm rounded-t-2xl",
    after: "bg-emerald-100 text-emerald-800 p-2 text-center font-bold text-sm rounded-t-2xl"
  },
  
  // Instagram Grid Layout
  grid: {
    container: "grid grid-cols-3 gap-[1px]",
    item: "bg-gray-800 relative overflow-hidden",
    viewCount: "absolute bottom-1 left-1 text-white text-[8px] flex items-center",
    overlay: "absolute inset-0 flex items-center justify-center",
    captionOverlay: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1 px-2"
  },
  
  // Engagement banners
  engagementBanner: {
    before: "bg-red-900/20 py-1 px-2 text-center mt-auto",
    beforeText: "text-[10px] font-medium text-red-400",
    after: "bg-green-900/20 py-1 px-2 text-center mt-auto",
    afterText: "text-[10px] font-medium text-green-400"
  },
  
  // Create simulated profile with metrics
  createProfileSimulation: (options: {
    name: string;
    title: string;
    avatarUrl: string;
    beforeMetrics?: {
      followers: string;
      following: string;
      posts: string;
      engagement: string;
    };
    afterMetrics?: {
      followers: string;
      following: string;
      posts: string;
      engagement: string;
    };
    afterBio?: string;
    industry?: string;
  }) => {
    // Implementation would typically be in component but added here as reference
    return {
      before: {
        username: options.name.toLowerCase().replace(/\s+/g, ''),
        displayName: options.name,
        bio: `${options.title}. Опитвам се да развия онлайн присъствие.`,
        followers: options.beforeMetrics?.followers || "850",
        following: options.beforeMetrics?.following || "827",
        posts: options.beforeMetrics?.posts || "24",
        engagement: options.beforeMetrics?.engagement || "0.9%",
        profileImage: options.avatarUrl || "/default-avatar.png",
      },
      after: {
        username: options.name.toLowerCase().replace(/\s+/g, ''),
        displayName: options.name,
        bio: options.afterBio || `${options.title} | Професионални решения и експертиза`,
        followers: options.afterMetrics?.followers || "18.5K",
        following: options.afterMetrics?.following || "903",
        posts: options.afterMetrics?.posts || "62",
        engagement: options.afterMetrics?.engagement || "3.8%",
        profileImage: options.avatarUrl || "/default-avatar.png",
      }
    };
  }
};

// Enhance animations with ProcessSection patterns
export const processAnimations = {
  // SVG path animation
  path: {
    styles: {
      base: "absolute inset-0 w-full h-full overflow-visible pointer-events-none",
      path: {
        wavyPath: "M10,15 C20,5 30,25 50,15 C70,5 80,25 90,15", // Wavy path as in ProcessSection
        straightPath: "M10,50 L90,50", // Simple straight path
      },
      gradient: {
        id: "roadmapGradient",
        colors: [
          { offset: "0%", color: "#8B5CF6" },
          { offset: "33%", color: "#6366F1" },
          { offset: "66%", color: "#4F46E5" },
          { offset: "100%", color: "#3B82F6" }
        ]
      }
    },
    animation: {
      initial: { pathLength: 0 },
      animate: { pathLength: 1 },
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  },
  
  // Animated process step
  step: {
    nodeCircle: {
      base: "relative z-20",
      animation: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: (index: number) => ({ 
          delay: 0.5 + (index * 0.2), 
          duration: 0.5 
        })
      }
    },
    glowRing: {
      base: "absolute inset-0 rounded-full",
      background: (i: number) => 
        `linear-gradient(to right bottom, ${i === 0 ? '#8B5CF6' : '#4F46E5'}, transparent)`,
      animation: {
        animate: { 
          scale: [1, 2, 1],
          opacity: [0.4, 0, 0.4],
        },
        transition: (index: number, ringIndex: number) => ({ 
          duration: 3, 
          repeat: Infinity,
          delay: index * 0.3 + ringIndex * 1.5,
          ease: "easeInOut"
        })
      }
    },
    mainNode: {
      container: "relative",
      circle: (colorStart: string, colorEnd: string) => 
        `w-16 h-16 rounded-full bg-gradient-to-br from-${colorStart} to-${colorEnd} shadow-lg flex items-center justify-center`,
      content: (isTop: boolean) => 
        `absolute ${isTop ? 'bottom-full mb-3' : 'top-full mt-3'} left-1/2 -translate-x-1/2 w-[140px] text-center`,
      title: "font-semibold text-white text-sm",
      highlight: "inline-block mt-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20"
    }
  },
  
  // Background grid with animated particles
  backgroundEffects: {
    grid: "absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700",
    radialDots: "absolute inset-0",
    radialDotsStyle: { 
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)',
      backgroundSize: '20px 20px' 
    },
    floatingCircle: {
      base: (i: number) => ({
        cx: 10 + (i * 5.5),
        cy: "50%",
        r: 1 + Math.random() * 1.5,
        fill: `rgba(${139 - (i * 3)}, ${92 + (i * 5)}, 246, ${0.2 + (Math.random() * 0.15)})`
      }),
      animation: {
        animate: (i: number) => ({
          y: [-(3 + Math.random() * 8), (3 + Math.random() * 8), -(3 + Math.random() * 8)],
          opacity: [0.2, 0.5, 0.2]
        }),
        transition: (i: number) => ({
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 1
        })
      }
    }
  },
  
  // Create full roadmap section
  createRoadmap: (steps: Array<{
    id: string;
    title: string;
    highlight: string;
    icon: React.ReactNode;
    iconColor: string;
  }>) => {
    return {
      // Would typically contain component creation logic
      // Added here as reference for implementation
      container: "relative max-w-5xl mx-auto h-[300px] md:h-[320px]",
      steps: steps.map((step, index) => ({
        id: step.id,
        title: step.title,
        highlight: step.highlight,
        position: 10 + (index * (80 / (steps.length - 1))),
        isTop: index % 2 === 0,
        iconColor: step.iconColor,
        icon: step.icon
      }))
    };
  }
};

// Usage example:
/*
import { buttons, typography, brandColors } from '@/lib/themeGuide';

function MyComponent() {
  return (
    <div className={common.pageWrapper}>
      <Header />
      <main className={common.mainContentWrapper}>
        <section className={common.sectionContainer}>
          <div className={patterns.sectionHeader.dark}>
            <h2 className={typography.heading.gradientLight}>
              Welcome to BrandBoost
            </h2>
            <button className={buttons.primary()}>
              Get Started
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
*/ 