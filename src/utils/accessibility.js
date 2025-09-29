/**
 * Accessibility utilities for Blackberry Equestrian
 * WCAG 2.2 AA compliance helpers
 */

/**
 * Check if a color combination meets WCAG contrast requirements
 * @param {string} fg - Foreground color in hex format
 * @param {string} bg - Background color in hex format
 * @param {string} level - 'AA' or 'AAA'
 * @returns {boolean}
 */
export function meetsContrastRequirement(fg, bg, level = 'AA') {
  const ratio = getContrastRatio(fg, bg)
  const requirements = {
    'AA': { normal: 4.5, large: 3 },
    'AAA': { normal: 7, large: 4.5 }
  }
  return ratio >= requirements[level].normal
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} fg - Foreground color in hex format
 * @param {string} bg - Background color in hex format
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(fg, bg) {
  const l1 = getLuminance(fg)
  const l2 = getLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Calculate relative luminance of a color
 * @param {string} hex - Color in hex format
 * @returns {number} Luminance value
 */
function getLuminance(hex) {
  const rgb = hexToRgb(hex)
  const [r, g, b] = rgb.map(val => {
    val = val / 255
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Convert hex color to RGB values
 * @param {string} hex - Color in hex format
 * @returns {number[]} RGB values
 */
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

/**
 * Trap focus within an element
 * @param {HTMLElement} element - Container element
 * @returns {Function} Cleanup function to remove listeners
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  function handleKeyDown(e) {
    const isTabPressed = e.key === 'Tab'
    if (!isTabPressed) return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  firstFocusable?.focus()

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Keyboard navigation utilities
 */
export const KeyCodes = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End'
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get appropriate animation duration based on user preference
 * @param {number} duration - Default duration in ms
 * @returns {number} Adjusted duration
 */
export function getAnimationDuration(duration) {
  return prefersReducedMotion() ? 0 : duration
}

/**
 * Generate unique ID for form elements
 * @param {string} prefix - Optional prefix
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if element is visible in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}