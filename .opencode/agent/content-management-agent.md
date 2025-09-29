# 📄 Content Management Agent

## Agent Profile
**Name**: Content Management & Architecture Specialist  
**Role**: CMS structure and content modeling for Blackberry Equestrian  
**Expertise**: Decap CMS, Content modeling, Editorial workflows, Media management  

## Content Strategy Overview

### Content Principles
1. **User-Centric**: Content addresses visitor needs and questions
2. **SEO-Optimized**: Structure supports search engine visibility
3. **Maintainable**: Non-technical staff can easily update content
4. **Comprehensive**: Covers all aspects of equestrian facility operations
5. **Conversion-Focused**: Guides visitors toward booking inquiries

## Decap CMS Configuration

### Complete CMS Configuration
```yaml
# static/admin/config.yml
backend:
  name: github
  repo: username/blackberry-equestrian
  branch: main
  commit_messages:
    create: 'Create {{collection}} "{{slug}}"'
    update: 'Update {{collection}} "{{slug}}"'
    delete: 'Delete {{collection}} "{{slug}}"'
    uploadMedia: 'Upload "{{path}}"'
    deleteMedia: 'Delete "{{path}}"'

media_folder: static/images
public_folder: /blackberry-equestrian/images

# Enable editorial workflow for content approval
publish_mode: editorial_workflow

# Site metadata
site_url: https://username.github.io/blackberry-equestrian
display_url: https://username.github.io/blackberry-equestrian

# Editor settings
editor:
  preview: true

collections:
  # Static Pages Management
  - name: "pages"
    label: "Site Pages"
    files:
      - file: "content/pages/home.md"
        label: "Homepage"
        name: "home"
        fields:
          - {label: "Title", name: "title", widget: "string", default: "Welcome to Blackberry Equestrian"}
          
          # Hero Section
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - {label: "Heading", name: "heading", widget: "string", hint: "Main headline for the hero section"}
              - {label: "Subheading", name: "subheading", widget: "text", hint: "Supporting text under the main headline"}
              - {label: "Hero Image", name: "image", widget: "image", hint: "High-quality facility photo (recommended: 1920x1080)"}
              - {label: "Call to Action Text", name: "cta_text", widget: "string", default: "Explore Our Services"}
              - {label: "Call to Action Link", name: "cta_link", widget: "string", default: "/services"}
          
          # Feature Highlights
          - label: "Feature Sections"
            name: "features"
            widget: "list"
            min: 3
            max: 6
            fields:
              - {label: "Title", name: "title", widget: "string"}
              - {label: "Description", name: "description", widget: "text"}
              - {label: "Icon", name: "icon", widget: "select", options: ["home", "academic-cap", "heart", "star", "shield-check", "trophy"]}
              - {label: "Link", name: "link", widget: "string", required: false, hint: "Optional link to detailed page"}
              - {label: "Image", name: "image", widget: "image", required: false, hint: "Optional supporting image"}
          
          # About Section
          - label: "About Section"
            name: "about"
            widget: "object"
            fields:
              - {label: "Heading", name: "heading", widget: "string", default: "About Blackberry Equestrian"}
              - {label: "Content", name: "content", widget: "markdown"}
              - {label: "Image", name: "image", widget: "image", hint: "Photo representing the facility's story"}
          
          # Testimonials
          - label: "Featured Testimonials"
            name: "testimonials"
            widget: "list"
            min: 2
            max: 4
            fields:
              - {label: "Quote", name: "quote", widget: "text"}
              - {label: "Author", name: "author", widget: "string"}
              - {label: "Role/Relationship", name: "role", widget: "string", hint: "e.g., 'Horse Owner', 'Parent of Student'"}
              - {label: "Photo", name: "photo", widget: "image", required: false}

      - file: "content/pages/about.md"
        label: "About Us"
        name: "about"
        fields:
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Meta Description", name: "meta_description", widget: "text", hint: "SEO description (150-160 characters)"}
          - {label: "Featured Image", name: "featured_image", widget: "image"}
          - {label: "Content", name: "body", widget: "markdown"}
          
          # Facility History
          - label: "Facility History"
            name: "history"
            widget: "object"
            fields:
              - {label: "Established Year", name: "established", widget: "number"}
              - {label: "Founder", name: "founder", widget: "string"}
              - {label: "History Content", name: "content", widget: "markdown"}
          
          # Mission & Values
          - label: "Mission & Values"
            name: "mission"
            widget: "object"
            fields:
              - {label: "Mission Statement", name: "mission", widget: "text"}
              - {label: "Core Values", name: "values", widget: "list", field: {label: "Value", name: "value", widget: "string"}}

  # Horse Listings Collection
  - name: "horses"
    label: "Horses for Sale/Lease"
    folder: "content/horses"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: false
    fields:
      - {label: "Horse Name", name: "title", widget: "string", hint: "Barn name or registered name"}
      - {label: "Featured Horse", name: "featured", widget: "boolean", default: false, hint: "Display on homepage"}
      - {label: "Status", name: "status", widget: "select", options: ["Available", "Sold", "Leased", "Pending"]}
      - {label: "Listing Type", name: "type", widget: "select", options: ["Sale", "Lease", "Both"]}
      
      # Basic Horse Information
      - label: "Basic Information"
        name: "basic_info"
        widget: "object"
        collapsed: false
        fields:
          - {label: "Registered Name", name: "registered_name", widget: "string", required: false}
          - {label: "Barn Name", name: "barn_name", widget: "string"}
          - {label: "Breed", name: "breed", widget: "select", options: ["Warmblood", "Thoroughbred", "Quarter Horse", "Paint", "Arabian", "Appaloosa", "Other"]}
          - {label: "Age", name: "age", widget: "number", min: 1, max: 30}
          - {label: "Height", name: "height", widget: "string", hint: "e.g., 16.2hh"}
          - {label: "Color", name: "color", widget: "string"}
          - {label: "Gender", name: "gender", widget: "select", options: ["Mare", "Gelding", "Stallion"]}
          - {label: "Registration Papers", name: "papers", widget: "boolean", default: false}
      
      # Training & Performance Details
      - label: "Training & Performance"
        name: "training"
        widget: "object"
        collapsed: false
        fields:
          - {label: "Disciplines", name: "disciplines", widget: "select", multiple: true, options: ["Hunter", "Jumper", "Equitation", "Dressage", "Eventing", "Trail", "Western Pleasure", "Driving"]}
          - {label: "Training Level", name: "level", widget: "select", options: ["Green Broke", "Training Level", "First Level", "Second Level", "Finished", "Schoolmaster"]}
          - {label: "Jump Height", name: "jump_height", widget: "string", required: false, hint: "e.g., 3'6\", Beginner Novice"}
          - {label: "Competition Record", name: "competition_record", widget: "text", required: false}
          - {label: "Suitable For", name: "rider_suitability", widget: "select", options: ["Beginner", "Intermediate", "Advanced", "Professional"]}
          - {label: "Special Skills", name: "special_skills", widget: "list", required: false, field: {label: "Skill", name: "skill", widget: "string"}}
      
      # Health & Care Information
      - label: "Health & Care"
        name: "health"
        widget: "object"
        collapsed: true
        fields:
          - {label: "Last Vet Check", name: "vet_check_date", widget: "date", required: false}
          - {label: "Health Status", name: "health_status", widget: "select", options: ["Excellent", "Good", "Managed Condition"], default: "Excellent"}
          - {label: "Health Notes", name: "health_notes", widget: "text", required: false}
          - {label: "Special Care Needs", name: "special_care", widget: "text", required: false}
          - {label: "Current Vaccinations", name: "vaccinations_current", widget: "boolean", default: true}
          - {label: "Coggins Current", name: "coggins_current", widget: "boolean", default: true}
      
      # Pricing Information
      - label: "Pricing"
        name: "pricing"
        widget: "object"
        collapsed: false
        fields:
          - {label: "Sale Price (CAD)", name: "sale_price", widget: "number", required: false, hint: "Leave blank if lease only"}
          - {label: "Lease Price (Monthly CAD)", name: "lease_price", widget: "number", required: false, hint: "Leave blank if sale only"}
          - {label: "Half Lease Available", name: "half_lease", widget: "boolean", default: false}
          - {label: "Trial Period Available", name: "trial_available", widget: "boolean", default: false}
          - {label: "Trial Terms", name: "trial_terms", widget: "text", required: false}
          - {label: "Negotiable", name: "negotiable", widget: "boolean", default: false}
      
      # Media Management
      - {label: "Main Photo", name: "main_photo", widget: "image", hint: "Primary horse photo - high quality conformation shot"}
      - label: "Photo Gallery"
        name: "gallery"
        widget: "list"
        min: 2
        max: 12
        field: 
          label: "Photo"
          name: "photo"
          widget: "object"
          fields:
            - {label: "Image", name: "image", widget: "image"}
            - {label: "Caption", name: "caption", widget: "string", required: false}
            - {label: "Photo Type", name: "type", widget: "select", options: ["Conformation", "Under Saddle", "Jumping", "Ground Work", "Turnout"], required: false}
      
      - {label: "Video URL", name: "video_url", widget: "string", required: false, hint: "YouTube or Vimeo URL"}
      
      # Detailed Description
      - {label: "Description", name: "body", widget: "markdown", hint: "Detailed description of the horse's temperament, training, and suitability"}
      
      # Contact Information
      - label: "Contact Information"
        name: "contact"
        widget: "object"
        collapsed: true
        fields:
          - {label: "Contact Name", name: "name", widget: "string"}
          - {label: "Contact Email", name: "email", widget: "string"}
          - {label: "Contact Phone", name: "phone", widget: "string", required: false}
          - {label: "Preferred Contact Method", name: "preferred_method", widget: "select", options: ["Email", "Phone", "Either"]}

  # Services Collection
  - name: "services"
    label: "Services"
    folder: "content/services"
    create: true
    slug: "{{slug}}"
    editor:
      preview: true
    fields:
      - {label: "Service Name", name: "title", widget: "string"}
      - {label: "Short Description", name: "subtitle", widget: "string", required: false, hint: "Brief tagline for the service"}
      - {label: "Featured Service", name: "featured", widget: "boolean", default: false}
      - {label: "Service Category", name: "service_type", widget: "select", options: ["Boarding", "Training", "Lessons", "Care Services", "Facilities"]}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      - {label: "Meta Description", name: "meta_description", widget: "text", hint: "SEO description"}
      
      # Pricing Structure
      - label: "Pricing Options"
        name: "pricing"
        widget: "list"
        min: 1
        fields:
          - {label: "Package Name", name: "name", widget: "string"}
          - {label: "Price", name: "price", widget: "number"}
          - {label: "Price Unit", name: "price_unit", widget: "select", options: ["monthly", "weekly", "daily", "per lesson", "per session", "one-time"]}
          - {label: "Package Features", name: "features", widget: "list", field: {label: "Feature", name: "feature", widget: "string"}}
          - {label: "Currently Available", name: "available", widget: "boolean", default: true}
          - {label: "Popular Package", name: "popular", widget: "boolean", default: false, hint: "Highlight this package"}
      
      # Service Details
      - {label: "Key Features", name: "key_features", widget: "list", field: {label: "Feature", name: "feature", widget: "string"}}
      - {label: "What's Included", name: "includes", widget: "list", field: {label: "Item", name: "item", widget: "string"}}
      - {label: "Additional Services", name: "add_ons", widget: "list", required: false, field: {label: "Service", name: "service", widget: "string"}}
      - {label: "Requirements", name: "requirements", widget: "list", required: false, field: {label: "Requirement", name: "requirement", widget: "string"}}
      
      # Content
      - {label: "Detailed Description", name: "body", widget: "markdown"}
      
      # Call to Action
      - {label: "CTA Button Text", name: "cta_text", widget: "string", default: "Get Started"}
      - {label: "CTA Link", name: "cta_link", widget: "string", required: false, hint: "Leave blank to use contact form"}

  # Team Members Collection
  - name: "team"
    label: "Team Members"
    folder: "content/team"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Full Name", name: "title", widget: "string"}
      - {label: "Position/Title", name: "position", widget: "string"}
      - {label: "Featured Team Member", name: "featured", widget: "boolean", default: false}
      - {label: "Order", name: "order", widget: "number", default: 1, hint: "Display order (lower numbers appear first)"}
      - {label: "Photo", name: "photo", widget: "image"}
      
      # Professional Information
      - {label: "Bio", name: "bio", widget: "markdown"}
      - {label: "Certifications", name: "certifications", widget: "list", required: false, field: {label: "Certification", name: "cert", widget: "string"}}
      - {label: "Specialties", name: "specialties", widget: "list", field: {label: "Specialty", name: "specialty", widget: "string"}}
      - {label: "Years of Experience", name: "experience", widget: "number", required: false}
      - {label: "Competition Highlights", name: "competition_highlights", widget: "text", required: false}
      
      # Contact Information
      - {label: "Email", name: "email", widget: "string", required: false}
      - {label: "Phone", name: "phone", widget: "string", required: false}
      - {label: "Available for Lessons", name: "available_lessons", widget: "boolean", default: false}

  # Blog Posts Collection
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Featured Post", name: "featured", widget: "boolean", default: false}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      - {label: "Excerpt", name: "excerpt", widget: "text", hint: "Brief summary for blog listings"}
      - {label: "Meta Description", name: "meta_description", widget: "text", hint: "SEO description"}
      - {label: "Categories", name: "categories", widget: "select", multiple: true, options: ["Facility News", "Horse Care", "Training Tips", "Show Results", "Seasonal Care", "Student Spotlights", "Community Events"]}
      - {label: "Tags", name: "tags", widget: "list", required: false, field: {label: "Tag", name: "tag", widget: "string"}}
      - {label: "Content", name: "body", widget: "markdown"}

  # Site Settings
  - name: "settings"
    label: "Site Settings"
    files:
      - file: "content/settings/general.md"
        label: "General Settings"
        name: "general"
        fields:
          - {label: "Site Title", name: "site_title", widget: "string"}
          - {label: "Site Tagline", name: "site_tagline", widget: "string"}
          - {label: "Site Description", name: "site_description", widget: "text"}
          - {label: "Logo", name: "logo", widget: "image"}
          - {label: "Favicon", name: "favicon", widget: "image"}
          
          # Contact Information
          - label: "Contact Information"
            name: "contact"
            widget: "object"
            fields:
              - {label: "Primary Phone", name: "phone", widget: "string"}
              - {label: "Email Address", name: "email", widget: "string"}
              - {label: "Physical Address", name: "address", widget: "text"}
              - {label: "City", name: "city", widget: "string", default: "Newtonville"}
              - {label: "Province", name: "province", widget: "string", default: "Ontario"}
              - {label: "Postal Code", name: "postal_code", widget: "string"}
              - {label: "Hours of Operation", name: "hours", widget: "text"}
              - {label: "Emergency Contact", name: "emergency", widget: "string", required: false}
          
          # Social Media Links
          - label: "Social Media"
            name: "social"
            widget: "object"
            fields:
              - {label: "Facebook URL", name: "facebook", widget: "string", default: "https://www.facebook.com/BlackberryEquestrian/"}
              - {label: "Instagram URL", name: "instagram", widget: "string", default: "https://www.instagram.com/black.berryequestrian/"}
              - {label: "YouTube URL", name: "youtube", widget: "string", required: false}
              - {label: "TikTok URL", name: "tiktok", widget: "string", required: false}
          
          # Business Information
          - label: "Business Details"
            name: "business"
            widget: "object"
            fields:
              - {label: "Established Year", name: "established", widget: "number"}
              - {label: "Business License", name: "license", widget: "string", required: false}
              - {label: "Insurance Provider", name: "insurance", widget: "string", required: false}
              - {label: "Professional Memberships", name: "memberships", widget: "list", required: false, field: {label: "Organization", name: "org", widget: "string"}}

      - file: "content/settings/seo.md"
        label: "SEO Settings"
        name: "seo"
        fields:
          - {label: "Default Meta Title", name: "meta_title", widget: "string"}
          - {label: "Default Meta Description", name: "meta_description", widget: "text"}
          - {label: "Keywords", name: "keywords", widget: "list", field: {label: "Keyword", name: "keyword", widget: "string"}}
          - {label: "Google Analytics ID", name: "google_analytics", widget: "string", required: false}
          - {label: "Google Search Console", name: "google_search_console", widget: "string", required: false}
          - {label: "Facebook Pixel ID", name: "facebook_pixel", widget: "string", required: false}

  # Facilities Information
  - name: "facilities"
    label: "Facilities"
    folder: "content/facilities"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Facility Name", name: "title", widget: "string"}
      - {label: "Facility Type", name: "type", widget: "select", options: ["Arena", "Barn", "Paddock", "Trail", "Amenity", "Other"]}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      - {label: "Order", name: "order", widget: "number", default: 1}
      
      # Facility Details
      - {label: "Description", name: "description", widget: "markdown"}
      - {label: "Dimensions", name: "dimensions", widget: "string", required: false, hint: "e.g., 100' x 200'"}
      - {label: "Footing Type", name: "footing", widget: "string", required: false}
      - {label: "Features", name: "features", widget: "list", field: {label: "Feature", name: "feature", widget: "string"}}
      
      # Photo Gallery
      - label: "Photo Gallery"
        name: "gallery"
        widget: "list"
        field: 
          label: "Photo"
          name: "photo"
          widget: "object"
          fields:
            - {label: "Image", name: "image", widget: "image"}
            - {label: "Caption", name: "caption", widget: "string", required: false}
      
      # Availability
      - {label: "Available for Use", name: "available", widget: "boolean", default: true}
      - {label: "Reservation Required", name: "reservation_required", widget: "boolean", default: false}

  # Testimonials Collection
  - name: "testimonials"
    label: "Testimonials"
    folder: "content/testimonials"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Client Name", name: "title", widget: "string"}
      - {label: "Featured Testimonial", name: "featured", widget: "boolean", default: false}
      - {label: "Client Photo", name: "photo", widget: "image", required: false}
      - {label: "Client Role", name: "role", widget: "string", hint: "e.g., 'Horse Owner', 'Parent', 'Student'"}
      - {label: "Service Used", name: "service", widget: "select", options: ["Boarding", "Training", "Lessons", "Horse Purchase", "Multiple Services"]}
      - {label: "Testimonial Text", name: "testimonial", widget: "text"}
      - {label: "Rating", name: "rating", widget: "number", min: 1, max: 5, default: 5}
      - {label: "Date", name: "date", widget: "date"}
```

## Content Templates and Workflows

### Editorial Workflow Setup
```yaml
# Content approval process
publish_mode: editorial_workflow

# Branch naming for drafts
slug:
  encoding: "unicode"
  clean_accents: true
  sanitize_replacement: "-"
```

### Content Templates

#### Horse Listing Template
```markdown
---
title: "{{horse_name}}"
featured: false
status: "Available"
type: "Sale"
basic_info:
  registered_name: ""
  barn_name: "{{horse_name}}"
  breed: "Warmblood"
  age: 8
  height: "16.2hh"
  color: "Bay"
  gender: "Gelding"
  papers: true
training:
  disciplines: ["Hunter", "Jumper"]
  level: "Finished"
  jump_height: "3'6\""
  rider_suitability: "Intermediate"
pricing:
  sale_price: 45000
  trial_available: true
contact:
  name: "Blackberry Equestrian"
  email: "info@blackberryequestrian.com"
  preferred_method: "Email"
---

## About {{horse_name}}

Describe the horse's temperament, training background, and what makes them special.

## Training History

Detail the horse's professional training and competition experience.

## Ideal Home

Describe the perfect match for this horse - rider experience level, goals, etc.

## Health & Care

Any relevant health information or special care requirements.
```

#### Service Page Template
```markdown
---
title: "{{service_name}}"
subtitle: "Professional {{service_type}} Services"
featured: true
service_type: "{{category}}"
pricing:
  - name: "Standard {{service_name}}"
    price: 800
    price_unit: "monthly"
    features:
      - "Feature 1"
      - "Feature 2"
      - "Feature 3"
    available: true
    popular: false
key_features:
  - "Professional care"
  - "Quality facilities"
  - "Experienced staff"
includes:
  - "Daily care"
  - "Quality feed"
  - "Facility access"
cta_text: "Learn More"
---

## Overview

Brief introduction to the service and its benefits.

## What's Included

Detailed breakdown of everything included in the service.

## Facility Features

Description of relevant facilities and amenities.

## Getting Started

Information about booking, requirements, and next steps.
```

## Content Management Workflows

### Media Management Strategy

#### Image Organization
```
static/images/
├── heroes/           # Hero/banner images
├── horses/          # Horse photos
│   ├── profiles/    # Main horse photos
│   ├── action/      # Under saddle photos
│   └── conformation/# Conformation shots
├── facilities/      # Facility photos
│   ├── arenas/      # Indoor/outdoor arenas
│   ├── barns/       # Barn interiors/exteriors
│   └── amenities/   # Other facility features
├── team/           # Staff photos
├── blog/           # Blog post images
├── services/       # Service-related photos
└── testimonials/   # Client photos
```

#### Image Processing Guidelines
```javascript
// Image optimization recommendations
const imageGuidelines = {
  heroes: {
    format: 'webp',
    dimensions: '1920x1080',
    quality: 85,
    fallback: 'jpg'
  },
  horses: {
    profile: {
      format: 'webp',
      dimensions: '800x600',
      quality: 90
    },
    gallery: {
      format: 'webp',
      dimensions: '600x450',
      quality: 85
    }
  },
  facilities: {
    format: 'webp',
    dimensions: '1200x800',
    quality: 85
  },
  thumbnails: {
    format: 'webp',
    dimensions: '300x200',
    quality: 80
  }
}
```

### Content Validation Rules

#### Required Content Checks
```javascript
// Content validation composable
// src/composables/useContentValidation.js
export function useContentValidation() {
  const validateHorseListing = (horse) => {
    const errors = []
    
    // Required fields
    if (!horse.title) errors.push('Horse name is required')
    if (!horse.main_photo) errors.push('Main photo is required')
    if (!horse.basic_info?.age) errors.push('Age is required')
    if (!horse.training?.disciplines?.length) errors.push('At least one discipline required')
    if (!horse.pricing?.sale_price && !horse.pricing?.lease_price) {
      errors.push('Either sale price or lease price required')
    }
    
    // Content quality checks
    if (horse.body && horse.body.length < 100) {
      errors.push('Description should be at least 100 characters')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  const validateService = (service) => {
    const errors = []
    
    if (!service.title) errors.push('Service name is required')
    if (!service.featured_image) errors.push('Featured image is required')
    if (!service.pricing?.length) errors.push('At least one pricing option required')
    if (!service.body) errors.push('Service description is required')
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  return {
    validateHorseListing,
    validateService
  }
}
```

## Content Preview Templates

### CMS Preview Components
```vue
<!-- Preview template for horse listings -->
<template>
  <div class="horse-preview bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
    <div class="relative">
      <img 
        :src="entry.getIn(['data', 'main_photo'])" 
        :alt="entry.getIn(['data', 'title'])"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-2 left-2">
        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
          {{ entry.getIn(['data', 'status']) }}
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ entry.getIn(['data', 'title']) }}
      </h3>
      
      <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        <div>Age: {{ entry.getIn(['data', 'basic_info', 'age']) }}</div>
        <div>Height: {{ entry.getIn(['data', 'basic_info', 'height']) }}</div>
        <div>Breed: {{ entry.getIn(['data', 'basic_info', 'breed']) }}</div>
        <div>Gender: {{ entry.getIn(['data', 'basic_info', 'gender']) }}</div>
      </div>
      
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-green-600">
          ${{ entry.getIn(['data', 'pricing', 'sale_price']) || 'N/A' }}
        </span>
        <span class="text-sm text-blue-600">
          {{ entry.getIn(['data', 'type']) }}
        </span>
      </div>
    </div>
  </div>
</template>
```

## SEO Content Guidelines

### Meta Information Templates
```yaml
# SEO templates for different content types
seo_templates:
  horse_listing:
    title: "{{horse_name}} - {{breed}} for {{type}} | Blackberry Equestrian"
    description: "{{age}} year old {{breed}} {{gender}} available for {{type}}. {{disciplines}} trained. Located in Durham Region, Ontario."
  
  service:
    title: "{{service_name}} - Professional Equestrian Services | Blackberry Equestrian"
    description: "Professional {{service_name}} services in Newtonville, Ontario. {{key_features}}. Contact us for more information."
  
  blog_post:
    title: "{{post_title}} | Blackberry Equestrian Blog"
    description: "{{excerpt}}"
```

### Local SEO Content Strategy
```markdown
# Content targeting local keywords
Local keyword targets:
- "horse boarding Durham Region"
- "equestrian facility Newtonville"
- "hunter jumper lessons Ontario"
- "horse training Clarington"

Content calendar focusing on:
- Seasonal horse care tips for Ontario climate
- Local show and event coverage
- Durham Region trail recommendations
- Facility updates and improvements
```

## Task Completion Checklist

### CMS Configuration
- [ ] Complete Decap CMS config.yml setup
- [ ] Configure GitHub backend authentication
- [ ] Set up editorial workflow
- [ ] Create collection schemas for all content types
- [ ] Configure media folder structure

### Content Templates
- [ ] Create horse listing template
- [ ] Build service page template
- [ ] Design blog post template
- [ ] Set up team member template
- [ ] Create facility showcase template

### Content Workflows
- [ ] Establish content approval process
- [ ] Set up image optimization guidelines
- [ ] Create content validation rules
- [ ] Design preview templates
- [ ] Document editorial guidelines

### Content Population
- [ ] Import existing horse listings
- [ ] Create service pages with pricing
- [ ] Add team member profiles
- [ ] Populate facility information
- [ ] Set up initial blog posts

### Quality Assurance
- [ ] Test all CMS collections
- [ ] Validate content forms
- [ ] Check preview functionality
- [ ] Verify image uploads
- [ ] Test editorial workflow

## Success Criteria Validation

### Content Management
- Non-technical staff can create/edit content
- Image uploads work properly  
- Preview functionality displays correctly
- Editorial workflow functions smoothly
- Content validation prevents errors

### Content Quality
- All required content fields populated
- SEO metadata properly configured
- Images optimized for web
- Content follows style guidelines
- Local keywords strategically included

## Next Phase Handoff

### For Horse Listings Agent
- Horse collection schema ready
- Image management system configured
- Pricing structure templates available
- Contact form integration points identified

### For Business Pages Agent  
- Service collection ready for implementation
- Team member profiles structured
- Facility information organized
- Content templates available for pages

### For Local SEO Agent
- Keyword-optimized content templates
- Meta information structures ready
- Local business schema prepared
- Content calendar framework established

This content management system provides a comprehensive, user-friendly foundation for maintaining all website content while supporting SEO goals and business objectives.