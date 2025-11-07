# EXACT WIX TEMPLATE ANALYSIS

## Key Findings from Deep Analysis:

### Overall Structure:
- Page width: **1250px**
- Content containers: **1110px**
- All sections: **NO borders** (`border: 0px none`)
- All sections: **Fully transparent background** (`rgba(0, 0, 0, 0)`)

### CRITICAL DISCOVERY - Content Boxes:
The Wix template DOES use styled boxes, but they're INSIDE the transparent sections:

**Box Styling:**
- Background: `rgb(63, 67, 73)` - DARK GRAY, not transparent!
- Width: 1110px (narrower than 1250px sections)
- Position: relative inside section
- Border: 0px none
- No backdrop filter
- No box shadow visible

### Section with Image + Text (e.g., at scroll 1200px):
```
SECTION (1250px, transparent)
  └─ CONTAINER (1110px, dark gray background rgb(63, 67, 73))
      ├─ LEFT COLUMN (443px)
      │   └─ IMAGE (absolute positioned, 531px × 708px)
      │
      └─ RIGHT COLUMN
          └─ TEXT CONTENT
```

### Image Handling:
- Images use `<img>` tags, NOT background-image
- Position: absolute
- object-fit: cover
- Full opacity
- NO filters

### Layout:
- Uses CSS Grid: `display: grid`
- Uses Flexbox: `display: flex`
- Columns are positioned with relative/absolute positioning

## What I Got WRONG Before:

❌ Thought there were NO boxes at all
❌ Thought everything was 100% transparent
❌ Didn't see the `rgb(63, 67, 73)` dark boxes

## What's CORRECT:

✅ NO borders anywhere
✅ Outer sections are transparent
✅ INNER content boxes have dark gray background
✅ 1250px sections, 1110px content boxes
✅ Images as <img> tags with object-fit: cover
