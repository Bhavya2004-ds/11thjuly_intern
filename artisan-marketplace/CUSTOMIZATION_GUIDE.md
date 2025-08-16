# 🎨 Shilpkari Customization Guide

## Traditional Design & Icon/Image Replacement Guide

### 🏛️ Design Philosophy
Shilpkari embraces traditional Indian aesthetics while maintaining modern usability:
- **Traditional Colors**: Brass gold, earthy browns, temple reds
- **Cultural Typography**: Devanagari script combined with elegant serif fonts
- **Authentic Patterns**: Subtle traditional motifs and textures
- **Warm Atmosphere**: Handcrafted, artisanal feel throughout

---

## 🖼️ Image Replacement Locations

### 1. **Hero Section Images**
**File**: `src/pages/HomePage.tsx`
**Current**: `[REPLACE-WITH-HERO-IMAGE]`
**Recommended**:
- Artisan hands working on pottery wheel
- Traditional loom with colorful threads
- Close-up of intricate metalwork or jewelry making
- Workshop scene with natural lighting

### 2. **Product Images**
**Files**: Product components, ProductCard.tsx
**Current**: `[REPLACE-WITH-PRODUCT-IMAGE]`
**Recommended**:
- High-resolution product photos with warm lighting
- Multiple angles showing craftsmanship details
- Lifestyle shots showing products in use
- Traditional backgrounds (jute, wood, handmade paper)

### 3. **Category Images**
**Files**: HomePage.tsx, CategoriesPage.tsx
**Current**: Emoji placeholders (🧵, 🏺, etc.)
**Recommended**:
- Textiles: Close-up of silk threads or weaving
- Pottery: Clay vessels on potter's wheel
- Jewelry: Traditional silver/gold ornaments
- Wood Craft: Carved wooden artifacts
- Metal Work: Brass/copper items with engravings

### 4. **Artisan Profile Images**
**Files**: ArtisanCard.tsx, ArtisansPage.tsx
**Current**: `[REPLACE-WITH-ARTISAN-IMAGE]`
**Recommended**:
- Portrait photos in natural workshop settings
- Artisans working on their craft
- Traditional clothing preferred
- Authentic, candid expressions

---

## 🎨 Icon Replacement Guide

### Current Icon System
The website uses `IconPlaceholder` components that can be easily replaced:

```typescript
// Example: Replace search icon
<IconPlaceholder type="search" size={24} />

// Replace with your custom icon:
<YourCustomIcon size={24} />
```

### 📍 Icon Locations & Recommendations

#### **Header Icons** (`src/components/common/Header.tsx`)
- **Search**: Traditional magnifying glass with brass handle
- **Cart**: Woven basket or clay pot design  
- **User**: Classical Indian dancer silhouette
- **Menu**: Three horizontal lines with traditional styling
- **Heart**: Lotus petal heart shape

#### **Navigation Icons**
- **Home**: Traditional house with sloped roof
- **Products**: Marketplace/bazaar icon
- **Categories**: Grid with traditional patterns
- **Artisans**: Craftsperson with tools

#### **Product Icons**
- **Star Ratings**: 8-pointed traditional star design
- **Add to Cart**: Shopping basket with Indian design
- **Wishlist**: Ornate heart with traditional patterns
- **Share**: Traditional sharing/community symbol

---

## 🎨 Traditional Design Elements

### **Color Palette Implementation**
```scss
// Traditional Indian Colors (already implemented)
primary: '#C9A96E'     // Golden brass
secondary: '#8B4513'   // Earthy brown
accent: '#B22222'      // Temple red
saffron: '#FF9933'     // Auspicious saffron
turmeric: '#E4B429'    // Turmeric yellow
indigo: '#4B0082'      // Traditional indigo
```

### **Typography Stack**
```css
/* Hindi/Devanagari Text */
font-family: 'Noto Sans Devanagari', 'Kalam', sans-serif;

/* English Headers */
font-family: 'Cinzel', 'Cormorant Garamond', serif;

/* Body Text */
font-family: 'Noto Sans Devanagari', 'Mukti', sans-serif;
```

### **Traditional Patterns**
- **Background**: Subtle dot patterns (already implemented)
- **Borders**: Consider traditional borders around cards
- **Dividers**: Paisley or floral motifs
- **Headers**: Underlines with traditional flourishes

---

## 📂 File Structure for Assets

```
src/assets/
├── images/
│   ├── hero/
│   │   ├── artisan-working.jpg
│   │   ├── traditional-loom.jpg
│   │   └── workshop-scene.jpg
│   ├── products/
│   │   ├── textiles/
│   │   ├── pottery/
│   │   ├── jewelry/
│   │   ├── woodcraft/
│   │   └── metalwork/
│   ├── artisans/
│   │   ├── portraits/
│   │   └── workshops/
│   ├── categories/
│   │   ├── category-textiles.jpg
│   │   ├── category-pottery.jpg
│   │   └── ...
│   └── patterns/
│       ├── paisley-bg.svg
│       ├── mandala-border.svg
│       └── rangoli-pattern.svg
├── icons/
│   ├── traditional/
│   │   ├── lotus-heart.svg
│   │   ├── traditional-cart.svg
│   │   ├── dancer-user.svg
│   │   └── ...
│   └── custom/
└── fonts/
    ├── hindi/
    └── english/
```

---

## 🔄 Step-by-Step Replacement Process

### **1. Prepare Your Assets**
- **Images**: Minimum 1920x1080 for hero, 400x300 for products
- **Icons**: SVG format preferred, 24x24px minimum
- **Format**: JPEG for photos, PNG for graphics, SVG for icons

### **2. Replace Image Placeholders**
```typescript
// Find this in components:
images: ['[REPLACE-WITH-PRODUCT-IMAGE]']

// Replace with:
images: ['/src/assets/images/products/textiles/silk-saree.jpg']
```

### **3. Replace Icon Components**
```typescript
// Find IconPlaceholder components:
<IconPlaceholder type="search" size={24} />

// Replace with your icon library:
import { Search } from 'your-icon-library';
<Search size={24} />

// Or custom SVG:
<img src="/src/assets/icons/traditional/search.svg" alt="Search" />
```

### **4. Update Image Imports**
```typescript
// Add to top of component files:
import heroImage from '../assets/images/hero/artisan-working.jpg';
import productImage1 from '../assets/images/products/silk-saree.jpg';

// Use in component:
<img src={heroImage} alt="Artisan at work" />
```

---

## 🎯 Traditional Motif Suggestions

### **For Categories**
- **Textiles**: Spinning wheel (charkha), silk threads
- **Pottery**: Potter's wheel, clay vessels
- **Jewelry**: Traditional ornaments, gemstones
- **Wood Craft**: Carved elephants, decorative panels
- **Metal Work**: Brass lamps, copper vessels

### **For Decorative Elements**
- **Borders**: Paisley patterns, floral vines
- **Backgrounds**: Subtle mandala patterns
- **Dividers**: Traditional geometric designs
- **Buttons**: Ornate frames with traditional corners

### **For Icons**
- **Navigation**: Temple architecture elements
- **Actions**: Traditional tools and instruments
- **Status**: Lotus petals for different states
- **Social**: Traditional sharing/community symbols

---

## 🚀 Implementation Priority

### **Phase 1: Essential Images**
1. Hero section background
2. Logo/branding elements  
3. Main navigation icons
4. Featured product images

### **Phase 2: Content Images**
1. Category representative images
2. Artisan profile photos
3. Product gallery images
4. Testimonial backgrounds

### **Phase 3: Decorative Elements**
1. Traditional patterns and borders
2. Loading animations with Indian motifs
3. Custom illustrations
4. Seasonal/festival decorations

---

## 📞 Resource Recommendations

### **Stock Photo Sources for Indian Crafts**
- Unsplash (search: "Indian handicrafts", "artisan", "traditional craft")
- Pexels (Indian craftspeople, traditional art)
- Shutterstock (premium traditional Indian imagery)

### **Icon Libraries**
- Feather Icons (clean, customizable)
- Heroicons (modern, scalable)
- Indian Cultural Icons (custom traditional sets)
- Flaticon (search for Indian/traditional themes)

### **Traditional Pattern Resources**
- The Noun Project (traditional Indian patterns)
- Freepik (mandala and paisley patterns)
- Indian art museums (authentic historical patterns)

---

**Remember**: The goal is to maintain authenticity while ensuring modern usability. Every visual element should tell the story of Indian craftsmanship and cultural heritage! 🇮🇳✨