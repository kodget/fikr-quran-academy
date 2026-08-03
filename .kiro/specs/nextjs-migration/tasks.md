# Implementation Plan: Next.js Migration

## Overview

This implementation plan converts the existing Figma Make React + Vite + Tailwind CSS application to a Next.js-based architecture while preserving all functionality, styling, and user experience. The migration follows a systematic approach ensuring each component, asset, and configuration is properly transformed and optimized for the Next.js ecosystem.

The tasks are organized to build incrementally, starting with project setup, moving through component migration, styling transformation, and ending with optimization and deployment preparation. Each task includes specific requirements references and clear implementation objectives.

## Tasks

- [x] 1. Initialize Next.js project structure and configuration
  - Create new Next.js project with App Router architecture
  - Set up TypeScript configuration compatible with Next.js
  - Configure project directory structure following Next.js conventions
  - _Requirements: 1.1, 1.7_

- [x] 2. Migrate core project dependencies and tooling
  - [x] 2.1 Update package.json with Next.js dependencies
    - Remove Vite-specific dependencies (@vitejs/plugin-react, vite, @tailwindcss/vite)
    - Add Next.js core dependencies (next, @next/font, @types/node)
    - Update React and React-DOM to Next.js compatible versions
    - _Requirements: 7.1, 7.2, 7.6_
  - [x] 2.2 Configure Next.js and Tailwind CSS integration
    - Create next.config.js with image optimization and build settings
    - Configure Tailwind CSS for Next.js compatibility
    - Set up TypeScript configuration with Next.js types
    - _Requirements: 1.5, 3.1, 7.3_

- [ ] 3. Relocate and optimize static assets
  - [x] 3.1 Move images from src/imports/ to public/images/
    - Relocate F_1.jpeg, F_2.jpg, F_3.jpg, F_4.jpg, F_5.jpg to public/images/
    - Update file names for consistency (fikr-logo.jpeg, hero-background.jpg, students-class.jpg, mission-image.jpg, vision-image.jpg)
    - _Requirements: 4.1, 4.6_
  - [x] 3.2 Update image import statements throughout codebase
    - Replace all image imports with Next.js public path references
    - Update alt attributes and accessibility properties
    - Preserve all existing image display properties and aspect ratios
    - _Requirements: 4.2, 4.4, 4.5_

- [ ] 4. Transform styling system for Next.js compatibility
  - [ ] 4.1 Convert Tailwind CSS v4 configuration
    - Migrate @theme block custom variables to compatible format
    - Preserve all custom color palette and font definitions
    - Update CSS import structure for Next.js
    - _Requirements: 3.1, 3.6_
  - [ ] 4.2 Create app/globals.css from src/index.css
    - Preserve all custom CSS animations and keyframes
    - Maintain Google Fonts integration and font loading
    - Keep all utility classes and custom CSS patterns
    - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 5. Create Next.js App Router entry points
  - [ ] 5.1 Implement app/layout.tsx with metadata and providers
    - Set up root layout with HTML structure and metadata
    - Configure font loading and global styling imports
    - Add proper SEO and accessibility meta tags
    - _Requirements: 1.3, 8.4, 10.2_
  - [ ] 5.2 Transform src/App.tsx to app/page.tsx
    - Convert main App component to default page export
    - Preserve complete component structure and functionality
    - Maintain all scroll navigation and section targeting
    - _Requirements: 1.3, 2.1, 6.1, 6.4_

- [ ] 6. Extract and organize component architecture
  - [ ] 6.1 Create shared component library structure
    - Extract Icon system to components/ui/Icon.tsx
    - Create shared atoms (SectionLabel, OrnamentDivider, Stars, Btn)
    - Set up proper TypeScript interfaces and exports
    - _Requirements: 2.3, 2.6, 10.1_
  - [ ] 6.2 Extract navigation component
    - Move Nav component to components/Navigation.tsx
    - Preserve mobile menu functionality and state management
    - Maintain all navigation interactions and scroll behavior
    - _Requirements: 2.1, 2.2, 6.2, 9.3_
  - [ ] 6.3 Extract section components to organized structure
    - Move Hero to components/sections/Hero.tsx with mouse tracking
    - Move About to components/sections/About.tsx with reveal animations
    - Extract WhyChoose, Programmes, Testimonials, Admission, Fees, FAQ sections
    - _Requirements: 2.1, 2.4, 9.1, 9.4, 9.5_

- [ ] 7. Implement custom hooks and utilities
  - [ ] 7.1 Extract useReveal hook to hooks/useReveal.ts
    - Preserve intersection observer functionality
    - Maintain threshold configuration and visibility state
    - Ensure proper cleanup and performance optimization
    - _Requirements: 2.5, 9.4_
  - [ ] 7.2 Create utility functions in lib/utils.ts
    - Extract scrollTo navigation function
    - Add any shared helper functions
    - Maintain TypeScript type safety
    - _Requirements: 2.5, 2.7, 6.3_

- [ ] 8. Preserve complex interactive features
  - [ ] 8.1 Migrate testimonial carousel component
    - Preserve 3D carousel effects and animations
    - Maintain swipe gestures and keyboard navigation
    - Keep all transition timings and visual effects
    - _Requirements: 2.2, 9.1, 9.5, 9.6_
  - [ ] 8.2 Implement registration and contact forms
    - Move Registration and Contact components with form state
    - Preserve all form validation and user interactions
    - Maintain form submission handling and success states
    - _Requirements: 2.1, 2.2, 9.6_
  - [ ] 8.3 Preserve Hero section mouse tracking and animations
    - Maintain parallax mouse movement effects
    - Keep all floating geometric elements and animations
    - Preserve responsive behavior and mobile optimizations
    - _Requirements: 9.1, 9.2, 9.4_

- [ ] 9. Checkpoint - Ensure component functionality and styling
  - Verify all components render correctly with preserved styling
  - Test interactive elements (navigation, forms, animations)
  - Ensure responsive design works across device sizes
  - Confirm TypeScript compilation without errors

- [ ] 10. Configure development and build environment
  - [ ] 10.1 Set up Next.js development server configuration
    - Configure hot module replacement and fast refresh
    - Set up development environment variables and settings
    - Ensure equivalent development experience to Vite
    - _Requirements: 5.1, 5.2, 5.6_
  - [ ] 10.2 Configure ESLint and code quality tools
    - Set up ESLint configuration for Next.js
    - Add TypeScript checking and formatting capabilities
    - Preserve existing code style and formatting standards
    - _Requirements: 5.4, 7.7, 10.4_

- [ ] 11. Implement client-side navigation system
  - [ ] 11.1 Set up smooth scrolling navigation
    - Implement section targeting with smooth scroll behavior
    - Preserve all navigation states and interactive feedback
    - Maintain URL structure as single-page application
    - _Requirements: 6.1, 6.2, 6.5, 6.6_
  - [ ] 11.2 Optimize navigation performance and accessibility
    - Ensure keyboard navigation and screen reader compatibility
    - Maintain focus management and ARIA attributes
    - Add proper semantic markup and navigation structure
    - _Requirements: 10.6, 6.3_

- [ ] 12. Validate data structures and content management
  - [ ] 12.1 Preserve all static data arrays and structures
    - Maintain testimonials, programmes, whyCards, faqs, admissionSteps data
    - Keep all TypeScript interfaces and type definitions
    - Ensure data integrity and structure consistency
    - _Requirements: 2.3, 2.6, 2.7_
  - [ ] 12.2 Validate component prop interfaces and state management
    - Verify all component props and TypeScript interfaces
    - Test state management and event handler functionality
    - Ensure callback props and navigation coordination works
    - _Requirements: 2.1, 2.2, 2.4_

- [ ] 13. Optimize build configuration and performance
  - [ ] 13.1 Configure Next.js build optimization
    - Set up production build configuration in next.config.js
    - Enable image optimization and static asset handling
    - Configure CSS and JavaScript bundle optimization
    - _Requirements: 8.1, 8.3, 8.5_
  - [ ] 13.2 Implement metadata and SEO optimization
    - Add proper page metadata and Open Graph tags
    - Set up structured data and search engine optimization
    - Ensure accessibility compliance and semantic markup
    - _Requirements: 8.4, 10.2, 10.6_

- [ ] 14. Clean up legacy Vite configuration and files
  - [ ] 14.1 Remove Vite-specific files and dependencies
    - Delete vite.config.ts and index.html
    - Remove Figma Make specific plugins and configurations
    - Clean up package.json dependencies and scripts
    - _Requirements: 1.6, 7.4_
  - [ ] 14.2 Update development scripts and tooling
    - Replace Vite scripts with Next.js equivalents (dev, build, start)
    - Update any deployment or build pipeline configurations
    - Ensure all tooling references Next.js instead of Vite
    - _Requirements: 7.5, 8.2_

- [ ] 15. Final validation and deployment preparation
  - [ ] 15.1 Comprehensive testing and visual verification
    - Test all interactive elements and animations
    - Verify responsive design across all device sizes
    - Validate form functionality and error handling
    - _Requirements: 3.7, 9.1, 9.2, 9.3, 9.6_
  - [ ] 15.2 Performance and accessibility validation
    - Run performance audits and optimization checks
    - Validate accessibility compliance with screen readers
    - Test keyboard navigation and focus management
    - _Requirements: 8.5, 10.6, 10.7_
  - [ ] 15.3 Build and deployment readiness
    - Verify production build completes successfully
    - Test static export functionality if required
    - Ensure compatibility with standard deployment platforms
    - _Requirements: 8.1, 8.2, 8.6_

- [ ] 16. Final checkpoint - Complete migration validation
  - Ensure all tests pass, ask the user if questions arise
  - Verify visual parity between source and target applications
  - Confirm all functionality works identically to original application
  - Validate TypeScript compilation and build process

## Notes

- Each task builds incrementally on previous components and configurations
- The migration preserves all existing functionality while modernizing to Next.js architecture
- Interactive elements like animations, forms, and navigation receive special attention for preservation
- The final application maintains visual and functional parity with the source while gaining Next.js optimization benefits
- All components follow Next.js App Router conventions and TypeScript best practices
