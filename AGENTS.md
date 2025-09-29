# AGENTS.md - Requirements-Based Agent System for Blackberry Equestrian

## Project Overview
Build a professional Hunter/Jumper boarding facility website for Blackberry Equestrian in Newtonville, Ontario using Vue.js 3, Decap CMS, and GitHub Pages deployment.

**Business Focus**: Indoor/outdoor boarding, training, lessons, horse sales/lease  
**Target Market**: Durham Region equestrian community, all skill levels  
**Technical Stack**: Vue.js 3 + Vite + Decap CMS + GitHub Pages  

## Agent Architecture

### 🏗️ Foundation Agent
**Responsibility**: Technical infrastructure and project setup  
**Key Tasks**:
- Vue.js 3 + Vite project initialization
- GitHub Pages deployment configuration
- Decap CMS integration with GitHub auth
- Core routing and state management (Pinia)
- Development environment setup

**Deliverables**:
```
- vite.config.js (GitHub Pages optimized)
- package.json with deployment scripts
- .github/workflows/deploy.yml
- src/main.js, App.vue, router/index.js
- Basic project structure and dependencies
```

**Success Criteria**:
- [ ] Project builds without errors
- [ ] Deploys successfully to GitHub Pages
- [ ] CMS admin accessible and functional
- [ ] Development server runs locally

---

### 🎨 Design System Agent
**Responsibility**: Visual design and user experience  
**Key Tasks**:
- Professional equestrian brand aesthetic
- Mobile-first responsive design
- WCAG 2.2 AA accessibility compliance
- Component library creation
- Performance-optimized styling

**Deliverables**:
```
- Tailwind config with equestrian color palette
- Base UI components (Button, Card, Form, Modal)
- Layout components (Header, Footer, Navigation)
- Typography and spacing systems
- Mobile-responsive breakpoints
```

**Success Criteria**:
- [ ] Lighthouse accessibility score > 95
- [ ] Mobile-friendly test passes
- [ ] Professional equestrian appearance
- [ ] Fast loading on rural connections

---

### 📄 Content Management Agent
**Responsibility**: CMS structure and content architecture  
**Key Tasks**:
- Decap CMS collections design
- Content modeling for equestrian business
- Editorial workflow setup
- Media management configuration
- Content template creation

**Deliverables**:
```
- static/admin/config.yml (complete CMS config)
- Content collections: horses, services, team, blog, pages
- Image upload and optimization workflow
- Content validation and preview templates
```

**Success Criteria**:
- [ ] All content types manageable via CMS
- [ ] Non-technical users can update content
- [ ] Image uploads work properly
- [ ] Content preview functions correctly

---

### 🐎 Horse Listings Agent
**Responsibility**: Horse sales/lease functionality  
**Key Tasks**:
- Dynamic horse profile system
- Search and filter implementation
- Photo gallery management
- Contact form integration
- Status management (Available/Sold/Leased)

**Deliverables**:
```
- HorseCard.vue component
- HorseDetail.vue page
- useHorses.js composable
- Search/filter functionality
- Horse inquiry forms
```

**Success Criteria**:
- [ ] Individual horse profiles display correctly
- [ ] Search/filter works on mobile
- [ ] Photo galleries load efficiently
- [ ] Contact forms submit successfully

---

### 🏢 Business Pages Agent
**Responsibility**: Core business pages and functionality  
**Key Tasks**:
- Homepage with hero section
- Services pages with pricing
- Facilities showcase
- About pages
- Contact and booking forms

**Deliverables**:
```
- HomePage.vue with facility hero
- ServicesPage.vue with pricing tables
- FacilitiesPage.vue with photo galleries
- AboutPage.vue with business information
- ContactPage.vue with forms and location
```

**Success Criteria**:
- [ ] All pages load under 3 seconds
- [ ] Contact forms work properly
- [ ] Pricing displays clearly
- [ ] Professional credibility conveyed

---

### 📱 Mobile Experience Agent
**Responsibility**: Mobile optimization and PWA features  
**Key Tasks**:
- Touch-friendly interface design
- Barn/outdoor usage optimization
- Progressive Web App implementation
- Offline functionality for key content
- Performance on slow connections

**Deliverables**:
```
- Mobile-optimized navigation
- Touch-friendly form inputs
- Service worker implementation
- Cached content strategy
- Connection-aware loading
```

**Success Criteria**:
- [ ] Touch targets minimum 44px
- [ ] One-handed operation friendly
- [ ] Works on 3G connections
- [ ] PWA installable on mobile devices

---

### 📍 Local SEO Agent
**Responsibility**: Durham Region search optimization  
**Key Tasks**:
- Local keyword targeting
- Google My Business integration
- Ontario-specific content
- Schema markup implementation
- Local directory submissions

**Deliverables**:
```
- SEO-optimized page titles and meta
- Local business schema markup
- Durham Region keyword integration
- Sitemap and robots.txt
- Local content calendar
```

**Success Criteria**:
- [ ] Local search visibility improved
- [ ] Google My Business connected
- [ ] Schema markup validates
- [ ] Page speed score > 90

---

### 📊 Analytics & Conversion Agent
**Responsibility**: Performance tracking and optimization  
**Key Tasks**:
- Google Analytics 4 setup
- Conversion tracking implementation
- Form submission monitoring
- User behavior analysis
- A/B testing framework

**Deliverables**:
```
- GA4 implementation
- Conversion goal tracking
- Heat mapping setup (if needed)
- Performance monitoring dashboard
- Monthly reporting templates
```

**Success Criteria**:
- [ ] Analytics tracking all key actions
- [ ] Conversion rates measurable
- [ ] User flow insights available
- [ ] Performance metrics monitored

---

## Agent Collaboration Workflow

### Phase 1: Foundation (Week 1-2)
**Lead**: Foundation Agent  
**Support**: Design System Agent
- Set up development environment
- Create basic project structure  
- Establish design tokens and components
- Deploy initial version to GitHub Pages

### Phase 2: Content & CMS (Week 3-4)
**Lead**: Content Management Agent  
**Support**: Horse Listings Agent, Business Pages Agent
- Configure Decap CMS collections
- Build horse listing functionality
- Create core business pages
- Set up content workflows

### Phase 3: Experience & Optimization (Week 5-6)
**Lead**: Mobile Experience Agent  
**Support**: Local SEO Agent, Analytics Agent
- Optimize mobile experience
- Implement SEO improvements
- Add analytics and tracking
- Performance optimization

### Phase 4: Launch & Polish (Week 7-8)
**All Agents**: Final testing and optimization
- Content population and testing
- Cross-browser compatibility
- Performance final optimization
- Go-live preparation

## Success Metrics

### Technical Requirements
- **Performance**: Page load < 3 seconds, Lighthouse > 90
- **Accessibility**: WCAG 2.2 AA compliance
- **Mobile**: 100% mobile usability score
- **SEO**: Local search ranking improvements

### Business Requirements  
- **Conversion**: Contact form submissions tracking
- **Engagement**: Session duration > 2 minutes
- **Reach**: 50% organic traffic increase in 6 months
- **Usability**: Content manageable by non-technical staff

## Implementation Checklist

### Foundation Agent Tasks
- [ ] Vue.js 3 + Vite project setup
- [ ] GitHub repository with Actions
- [ ] GitHub Pages deployment working
- [ ] Decap CMS admin accessible
- [ ] Basic routing and navigation

### Design System Agent Tasks  
- [ ] Equestrian color palette defined
- [ ] Typography system implemented
- [ ] UI component library created
- [ ] Mobile-responsive layouts
- [ ] Accessibility compliance verified

### Content Management Agent Tasks
- [ ] CMS collections configured
- [ ] Editorial workflow enabled
- [ ] Image optimization pipeline
- [ ] Content preview templates
- [ ] User permissions set up

### Horse Listings Agent Tasks
- [ ] Horse profile templates
- [ ] Search/filter functionality
- [ ] Photo gallery system
- [ ] Inquiry form integration
- [ ] Status management system

### Business Pages Agent Tasks
- [ ] Homepage with hero section
- [ ] Services with pricing tables  
- [ ] Facilities photo galleries
- [ ] About page with business info
- [ ] Contact forms and location

### Mobile Experience Agent Tasks
- [ ] Touch-friendly navigation
- [ ] Mobile form optimization
- [ ] Progressive Web App setup
- [ ] Offline content caching
- [ ] Connection-aware features

### Local SEO Agent Tasks
- [ ] Local keyword research
- [ ] On-page SEO optimization
- [ ] Schema markup implementation
- [ ] Google My Business setup
- [ ] Local content creation

### Analytics Agent Tasks
- [ ] Google Analytics 4 setup
- [ ] Conversion goal configuration
- [ ] Form tracking implementation
- [ ] Performance monitoring
- [ ] Reporting dashboard

## Quality Gates

### Code Quality
- ESLint/Prettier compliance
- TypeScript type checking
- Component testing coverage
- Cross-browser compatibility

### Performance Standards
- Core Web Vitals all green
- Image optimization (WebP/AVIF)
- Bundle size optimization
- CDN and caching strategy

### Content Quality
- All content proofread and approved
- Images professionally optimized
- SEO metadata complete
- Legal pages (privacy, terms) included

### Launch Readiness
- All forms tested and working
- Analytics properly configured  
- Backup and recovery tested
- Staff training completed


## Rules
- Review docs in .prompt/doc to ensure best practices set by other agenst are followed

This agent system ensures systematic development with clear responsibilities, measurable outcomes, and collaborative workflows focused on delivering a professional equestrian website that meets all business and technical requirements.