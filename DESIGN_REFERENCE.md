# 🎨 Frontend Design Color & Component Reference

## Color Palette

### Primary Colors
```
Cyan/Turquoise (Primary Accent)
  Light:  #00fffc
  Medium: #00d4d4
  Dark:   #00b8b0
  
Purple/Blue (Secondary Accent)
  Light:  #7c8ff4
  Medium: #667eea
  Dark:   #5a6fd8
  
Dark Purple (Tertiary)
  Light:  #764ba2
  Medium: #6b5b99
```

### Background Colors
```
Very Dark (Base)
  Primary:   #0a0a0a
  Secondary: #1a1a2e
  Tertiary:  #16213e
  
Text/Foreground
  Primary:   #e4e4e7 (Light Gray)
  Secondary: #a1a1a1 (Medium Gray)
  Tertiary:  rgba(255,255,255,0.6) (Muted)
```

## Component Style Reference

### Buttons

**Primary Button (Cyan)**
```
Background: linear-gradient(135deg, #00fffc, #00d4d4)
Color: #0a0a0a
Hover: linear-gradient(135deg, #00e5e0, #00b8b0)
Shadow: 0 10px 30px rgba(0,255,252,0.3)
```

**Secondary Button (Purple)**
```
Background: linear-gradient(135deg, #667eea, #764ba2)
Color: white
Hover: linear-gradient(135deg, #5a6fd8, #6b5b99)
Shadow: 0 10px 30px rgba(102,126,234,0.2)
```

**Danger Button (Red)**
```
Background: linear-gradient(135deg, #ff6b6b, #ff5252)
Color: white
Shadow: 0 8px 20px rgba(255,107,107,0.2)
```

### Input Fields
```
Background: rgba(255,255,255,0.05)
Border: 1px solid rgba(255,255,255,0.15)
Focus Border: 1px solid #00fffc
Focus Shadow: 0 0 30px rgba(0,255,252,0.2)
Text Color: #e4e4e7
Placeholder: rgba(255,255,255,0.5)
```

### Cards/Containers
```
Background: rgba(20, 20, 35, 0.6)
Backdrop Filter: blur(20px)
Border: 1px solid rgba(0,255,252,0.1)
Shadow: 0 20px 60px rgba(0,0,0,0.4)
```

### Message Bubbles

**AI/Assistant Message**
```
Background: rgba(255,255,255,0.06)
Border: 1px solid rgba(0,255,252,0.15)
Shadow: 0 4px 20px rgba(0,0,0,0.2)
Text: rgba(255,255,255,0.95)
```

**User Message**
```
Background: linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))
Border: 1px solid rgba(102,126,234,0.3)
Shadow: 0 8px 30px rgba(102,126,234,0.25)
Text: rgba(255,255,255,0.98)
```

## Animation Speeds

```
Fade-in:    0.8s ease-out
Slide-up:   0.6s cubic-bezier(0.34, 1.56, 0.64, 1)
Scale-in:   0.5s cubic-bezier(0.34, 1.56, 0.64, 1)
Pulse:      2s cubic-bezier(0.4, 0, 0.6, 1) infinite
Glow:       2s ease-in-out infinite
Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

## Typography

### Font Family
- **Primary**: Poppins
- **Secondary**: Inter
- **Fallback**: sans-serif

### Weight & Sizes
```
Hero Title:        36px / 800
Section Header:    28px / 800
Heading:          18px / 700
Body:             14-16px / 400-500
Caption:          12-13px / 400
```

## Spacing Standards

```
XS: 4px
S:  8px
M:  16px
L:  24px
XL: 32px
2XL: 48px
3XL: 64px
```

## Border Radius

```
Sharp:    0px (rare)
Subtle:   2px
Small:    8px
Medium:   12px
Large:    16px
Full:     50% / 999px (pills)
```

## Elevation/Shadows

```
Level 1 (subtle):    0 4px 20px rgba(0,0,0,0.2)
Level 2 (medium):    0 8px 30px rgba(0,0,0,0.25)
Level 3 (strong):    0 12px 40px rgba(0,0,0,0.3)
Level 4 (prominent): 0 20px 50px rgba(0,0,0,0.4)

With Accent Glow:    
  Cyan:   + 0 0 30px rgba(0,255,252,0.3)
  Purple: + 0 0 30px rgba(102,126,234,0.3)
  Red:    + 0 0 30px rgba(255,107,107,0.3)
```

## Responsive Breakpoints

```
Mobile:   xs (0px - 600px)
Tablet:   md (600px - 960px)
Desktop:  lg (960px+)
Wide:     xl (1280px+)
```

## Accessibility

- ✅ Contrast ratio: 7:1+ for text
- ✅ Focus states visible
- ✅ Touch target size: 44px minimum
- ✅ Animation respects prefers-reduced-motion
- ✅ Color not sole indicator of status

---

Generated: February 2026
Theme: Professional Black with Cyan/Purple Accents
