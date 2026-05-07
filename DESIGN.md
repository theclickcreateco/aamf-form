---
name: Estate & Equity System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#44474e'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f84'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#001b3d'
  on-primary-container: '#6f84ac'
  inverse-primary: '#b1c7f2'
  secondary: '#0059bb'
  on-secondary: '#ffffff'
  secondary-container: '#0070ea'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b1c7f2'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#31476b'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc7ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

This design system is built on the pillars of stability, clarity, and fiscal confidence. It targets home buyers, real estate investors, and mortgage brokers who require a high-reliability environment for significant financial decision-making. 

The aesthetic is **Corporate / Modern**, prioritizing a structured hierarchy that feels institutional yet accessible. It avoids unnecessary ornamentation in favor of crisp edges, generous whitespace, and a high-contrast palette. The goal is to evoke a sense of "digital architecture"—sturdy, well-planned, and permanent. Every interface element must reinforce the user's trust through alignment, precision, and a lack of visual clutter.

## Colors

The palette is anchored by **Deep Navy Blue**, providing an authoritative foundation for headers and primary backgrounds. **Bright Blue** serves as the functional accent, utilized exclusively for interactive elements and critical call-to-actions to ensure high visibility against white and navy surfaces.

**White** is the primary canvas color, used extensively to maintain a clean, "paper-like" professional feel. Neutral tones are strictly cool-gray to maintain a modern, clinical edge, ensuring that data-heavy mortgage tables and real estate listings remain legible and unbiased.

## Typography

This design system utilizes a dual-font strategy to balance impact with readability. **Inter** is reserved for headlines and UI labels, leveraging its tight apertures and bold weights to create a sense of strength and modern precision. Headlines should always use a heavier weight (700+) to establish a clear information hierarchy.

**Work Sans** is used for body copy and data-heavy blocks. Its slightly wider character set and optimized legibility at smaller scales make it ideal for reading long-form mortgage disclosures and property descriptions. All labels should be uppercase with slight letter-spacing to distinguish them from narrative text.

## Layout & Spacing

The system follows a **Fixed Grid** model on desktop, centering content within a 1280px container to maintain focus. A 12-column grid is standard, utilizing 24px gutters to provide ample "breathing room" between complex data sets.

Spacing is based on a 4px baseline grid. Large sections should be separated by significant vertical padding (80px–120px) to prevent the professional aesthetic from feeling "cramped" or "budget." Internal component spacing should prioritize alignment; elements like form fields and list items must be perfectly vertically aligned to reinforce the feeling of a disciplined financial institution.

## Elevation & Depth

To maintain a corporate and trustworthy feel, this design system avoids aggressive shadows or trendy glass effects. Instead, it utilizes **Tonal Layers** and **Low-Contrast Outlines**.

Depth is created by placing white cards onto a very light gray (Tertiary) background. Shadows, when necessary for floating elements like dropdowns or modals, are "Ambient Shadows"—highly diffused, low-opacity (8-10%), and using a Navy-tinted hex rather than pure black. This creates a subtle lift that feels integrated into the layout rather than slapped on. Primary containers should use a 1px border in a soft neutral shade to define boundaries without adding visual weight.

## Shapes

The shape language is conservative and disciplined. A **Soft** (0.25rem) corner radius is the standard for almost all elements, including buttons, input fields, and cards. This slight rounding takes the "edge" off the corporate feel without making the UI look playful or informal. 

Interactive elements like buttons should never be pill-shaped; they must remain rectangular with soft corners to maintain the architectural theme. Icons should follow a "Line Art" style with a 2px stroke weight and slightly rounded terminal ends to match the UI's radius.

## Components

### Buttons
Primary CTAs are solid Bright Blue with white text, utilizing bold Inter labels. Secondary buttons use a Navy-blue outline with no fill. Always use a hover state that slightly darkens the background color to provide tactile feedback.

### Input Fields
Forms are critical for mortgage applications. Use a 1px neutral border that turns Bright Blue on focus. Labels must always be visible (never use placeholder-only labels) and positioned above the field in the Label-MD style.

### Cards
Property and loan cards use a white background with a subtle 1px border. They should not have a shadow until hovered; upon hover, a soft ambient shadow is applied to indicate interactivity.

### Data Tables
For mortgage amortization or interest rate comparisons, use clean, borderless tables with subtle zebra-striping in the Tertiary color. Headers must be Navy Blue with white text or bold Navy text on a light gray background.

### Status Chips
Use high-contrast pills for "Approved," "Pending," or "Sold." These should use low-saturation background tints (e.g., pale green background for "Approved") with high-saturation text to ensure professional legibility.