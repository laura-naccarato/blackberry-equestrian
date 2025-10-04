# Blackberry Equestrian Content Management Guide

## 📚 Table of Contents
- [Getting Started](#getting-started)
- [Editorial Workflow](#editorial-workflow)
- [Managing Horses](#managing-horses)
- [Managing Services](#managing-services)
- [Managing Team Members](#managing-team-members)
- [Managing Facilities](#managing-facilities)
- [Managing Testimonials](#managing-testimonials)
- [Managing Pages](#managing-pages)
- [Site Settings](#site-settings)
- [Best Practices](#best-practices)

## Getting Started

### Accessing the CMS

#### Local Development (Recommended for Testing)
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/`
3. No authentication required (uses test-repo backend)

#### Production Access
1. Navigate to `https://YOUR_USERNAME.github.io/blackberry-equestrian/admin/`
2. Log in with your GitHub credentials
3. You'll see the main dashboard with all content collections

### CMS Interface Overview
- **Collections**: Different types of content (Horses, Services, Team, Facilities, etc.)
- **Media Library**: Upload and manage images (currently configured for local storage)
- **Editorial Workflow**: Content approval process before publishing
- **Quick Add**: Create new content using the "New" button
- **Preview**: See how content will look on the live site

## Editorial Workflow

The CMS uses an editorial workflow for content quality control:

1. **Draft**: Save content for personal editing
2. **In Review**: Submit content for administrator approval
3. **Ready**: Content approved and ready to publish
4. **Published**: Content live on the website

### Workflow Process
- **Content Editors**: Create and edit content, save as drafts, submit for review
- **Administrators**: Review submitted content and approve for publication
- **Published Content**: Automatically goes live once approved

## Managing Horses 🐴

### Adding a New Horse
1. Click on "🐴 Horses for Sale/Lease" in the sidebar
2. Click "New Horse" button
3. Fill in the required fields:

#### Basic Information
- **Horse Name**: The horse's barn name or registered name
- **Featured Horse**: Check to display on homepage
- **Date Listed**: When the horse was listed (auto-populated)
- **Status**: Available, Pending, Sold, or Leased
- **Listing Type**: For Sale, For Lease, or Sale or Lease

#### Horse Details
- **Age**: Horse's age in years
- **Height**: Height in hands (e.g., 16.2 hands)
- **Gender**: Mare, Gelding, or Stallion
- **Breed**: Horse breed
- **Color**: Coat color
- **Registration**: Registration number (if applicable)

#### Training & Performance
- **Primary Discipline**: Hunter, Jumper, Hunter/Jumper, etc.
- **Suitable For Level**: Beginner, Intermediate, Advanced, or Professional
- **Show Experience**: Brief description of competition history
- **Training Notes**: Special training or skills

#### Pricing Information
- **Sale Price**: Price in CAD (leave blank if lease only)
- **Lease Price**: Monthly lease price in CAD
- **Price Note**: Additional pricing information

#### Media
- **Main Photo**: Primary photo (required, high quality)
- **Photo Gallery**: Additional photos with captions
- **Video URL**: YouTube or Vimeo link (optional)

#### Description
- **Short Description**: Brief description for listings (2-3 sentences)
- **Full Description**: Detailed description including temperament and ideal home

#### Contact Information
- **Contact Person**: Usually "Blackberry Equestrian"
- **Contact Email**: info@blackberryequestrian.com
- **Contact Phone**: Professional phone number

### Best Practices for Horse Listings
- Use high-quality photos (conformation shots, under saddle, jumping)
- Include detailed training history and show record
- Be specific about suitable rider level and discipline
- Update status promptly when horse is sold or leased
- Include recent vetting information if available
- Write compelling descriptions that highlight the horse's personality

### Photo Guidelines
- Main photo: Clear conformation shot, well-lit, high resolution
- Gallery: Include variety (ground work, under saddle, showing, turnout)
- Recommended size: 1200x800 pixels minimum
- Format: JPEG or WebP for best quality/size balance
- File size: Keep under 2MB per image for fast loading

## Managing Services 💼

### Service Categories
- **Boarding Services**: Full board, training board, etc.
- **Training Programs**: Professional training services
- **Lesson Programs**: Group and private lessons
- **Additional Services**: Clinics, camps, special programs

### Creating Service Pages
1. Navigate to "💼 Services" collection
2. Click "New Service"
3. Complete the fields:

#### Basic Information
- **Service Name**: Clear, descriptive title
- **Display Order**: Lower numbers appear first (1, 2, 3...)
- **Featured Service**: Check to highlight this service
- **Service Category**: Boarding, Training, Lessons, or Additional

#### Content
- **Featured Image**: High-quality image representing the service
- **Short Description**: Brief description for service cards
- **Full Description**: Detailed service information

#### Pricing Options
Add multiple pricing tiers with:
- **Option Name**: e.g., "Full Board", "Half Lease"
- **Price**: Price in CAD
- **Billing Period**: Monthly, Weekly, Per Lesson, One-time, or Custom
- **Price Note**: Additional pricing information
- **Included Features**: List what's included in this option

#### Service Details
- **Service Includes**: List all included features
- **Requirements**: Any prerequisites or requirements

#### Call to Action
- **CTA Button Text**: Button text (default: "Learn More")
- **Booking Available**: Check if this service can be booked

### Pricing Structure Tips
- Offer multiple options (e.g., monthly, weekly, per lesson)
- Clearly state what's included in each package
- Note any additional fees separately
- Update prices promptly when they change
- Use clear, descriptive package names

## Managing Team Members 👥

### Adding Staff Profiles
1. Go to "👥 Team Members" collection
2. Click "New Team Member"
3. Fill in:

#### Basic Information
- **Full Name**: Staff member's complete name
- **Position/Title**: Their role (e.g., Head Trainer, Barn Manager)
- **Display Order**: Lower numbers appear first
- **Featured**: Check to show on homepage
- **Profile Photo**: Professional headshot or action photo

#### Professional Information
- **Years of Experience**: Number of years in the industry
- **Specialties**: Areas of expertise (add multiple)
- **Certifications**: Professional qualifications with organization and year
- **Competition Achievements**: Notable competition results
- **Biography**: Full biography including background and philosophy

#### Contact & Availability
- **Available for Lessons**: Check if they offer lessons
- **Email**: Professional email (optional)
- **Phone**: Professional phone (optional)

#### Social Media (Optional)
- **Instagram**: Instagram profile URL
- **Facebook**: Facebook profile URL
- **LinkedIn**: LinkedIn profile URL

### Team Profile Best Practices
- Use professional, friendly photos that show personality
- Highlight relevant experience and achievements
- Include teaching philosophy or training approach
- Update certifications as they are renewed
- Feature key instructors prominently on the homepage
- Keep biographies engaging and informative

## Managing Facilities 🏛️

### Facility Types
- **Indoor Arena**: Covered riding arena
- **Outdoor Arena**: Outdoor riding rings
- **Barn/Stables**: Horse housing and stalls
- **Paddocks**: Turnout areas
- **Trails**: Riding trails
- **Amenity**: Other facility features

### Showcasing Facilities
1. Navigate to "🏛️ Facilities" collection
2. Click "New Facility"
3. Fill in:

#### Basic Information
- **Facility Name**: Name of the facility/feature
- **Display Order**: Lower numbers appear first
- **Facility Type**: Select appropriate category

#### Facility Details
- **Size/Dimensions**: e.g., "200ft x 80ft", "12 stalls"
- **Surface/Footing**: e.g., "Premium sand blend", "grass"
- **Features**: List key features (add multiple)

#### Media
- **Featured Image**: Main photo of the facility
- **Photo Gallery**: Additional photos with captions

#### Description
- **Description**: Detailed description of the facility

#### Availability
- **Available for Events**: Check if available for special events
- **Available for Lessons**: Check if available for lessons
- **Booking Required**: Check if advance booking is needed

### Facility Showcase Best Practices
- Include high-quality photos showing the facility in use
- Provide specific dimensions and specifications
- Highlight unique features and amenities
- Note availability for different types of use
- Keep descriptions informative and engaging

## Managing Testimonials ⭐

### Collecting Testimonials
1. Get written permission from clients before publishing
2. Include client photo if available (with permission)
3. Note service type and client relationship
4. Keep testimonials authentic and specific
5. Feature variety of client types (boarders, students, buyers)

### Adding Testimonials
1. Navigate to "⭐ Testimonials" collection
2. Click "New Testimonial"
3. Fill in:

#### Client Information
- **Client Name**: Full name of the client
- **Client Photo**: Photo (optional, requires permission)
- **Date**: When the testimonial was given
- **Featured**: Check to show on homepage

#### Client Details
- **Client Type**: Boarder, Student, Parent, Horse Buyer, Training Client, or Multiple
- **Service Type**: Boarding, Training, Lessons, Horse Purchase/Lease, or Multiple Services

#### Testimonial Content
- **Testimonial Text**: The actual testimonial
- **Rating**: 1-5 star rating

#### Permissions
- **Permission to Display**: Must be checked (client permission obtained)

### Testimonial Best Practices
- Always get written permission before publishing
- Feature best testimonials on homepage
- Rotate featured testimonials regularly
- Include mix of services and client types
- Update with recent testimonials
- Keep testimonials authentic and specific

## Managing Pages 📄

### Static Pages
- **Home Page**: Hero section, welcome content, features, call-to-action
- **About Page**: Facility story, mission & values, history timeline
- **Contact Page**: Contact information, location, contact form

### Updating Page Content

#### Home Page
1. Navigate to "📄 Pages" → "Home Page"
2. Update sections:

**Hero Section:**
- Hero Title, Subtitle, Image, CTA Button Text/Link

**Welcome Section:**
- Section Title, Content, Image (optional)

**Feature Highlights:**
- Add up to 6 features with title, description, icon, link

**Call to Action Section:**
- Title, Description, Button Text, Button Link, Background Image

#### About Page
1. Navigate to "📄 Pages" → "About Page"
2. Update sections:

**Our Story:**
- Title, Content, Image (optional)

**Mission & Values:**
- Mission Statement
- Core Values (add multiple with descriptions)

**History Timeline:**
- Add milestones with year, description

#### Contact Page
1. Navigate to "📄 Pages" → "Contact Page"
2. Update sections:

**Contact Details:**
- Phone, Email, Address, Hours, Emergency Contact

**Location:**
- Map Embed Code, Directions

**Contact Form:**
- Form Title, Success Message, Email Recipient

### Page Editing Best Practices
- Preview changes before saving
- Use the editorial workflow for major updates
- Test contact forms after changes
- Update meta descriptions for SEO
- Keep content current and accurate

## Site Settings ⚙️

### General Settings
1. Navigate to "⚙️ Settings" → "General Settings"
2. Update:

#### Site Information
- **Site Title**: Main site title
- **Site Description**: Brief site description
- **Logo**: Site logo image
- **Favicon**: Browser tab icon

#### Business Information
- **Business Name**: Official business name
- **Established Year**: Year business was founded
- **Registration Number**: Business registration
- **Tax ID**: Business tax ID

#### Contact Information
- **Primary Phone**: Main business phone
- **Secondary Phone**: Additional phone (optional)
- **Email**: Business email
- **Address**: Full business address
- **City**: Newtonville (default)
- **Province**: Ontario (default)
- **Postal Code**: Postal code
- **Country**: Canada (default)
- **Hours of Operation**: Business hours text

#### Social Media
- **Facebook URL**: Facebook page URL
- **Instagram URL**: Instagram profile URL
- **Twitter URL**: Twitter profile URL (optional)
- **YouTube URL**: YouTube channel URL (optional)
- **TikTok URL**: TikTok profile URL (optional)
- **LinkedIn URL**: LinkedIn profile URL (optional)

### SEO Settings
1. Navigate to "⚙️ Settings" → "SEO Settings"
2. Update:

#### Basic SEO
- **Default Meta Title**: Default page title
- **Default Meta Description**: Default page description
- **Site Keywords**: SEO keywords (add multiple)

#### Analytics
- **Google Analytics ID**: GA4 tracking ID
- **Google Tag Manager ID**: GTM container ID
- **Facebook Pixel ID**: Facebook tracking pixel

#### Open Graph / Social Sharing
- **Default OG Image**: Default social sharing image
- **Twitter Handle**: Twitter username
- **Facebook App ID**: Facebook app ID

#### Structured Data
- **Business Type**: Usually "LocalBusiness"
- **Price Range**: Business price range ($$)
- **Latitude/Longitude**: Business location coordinates

### Settings Best Practices
- Update contact information promptly when it changes
- Test social media links after updating
- Use high-quality images for logo and OG image
- Keep business information current and accurate
- Review SEO settings periodically for optimization

## Best Practices

### Content Writing
- Write in clear, friendly tone
- Use active voice
- Break up text with headings
- Include relevant keywords naturally
- Proofread before publishing

### Image Management
- Optimize images before uploading (max 2MB)
- Use descriptive filenames
- Add alt text for accessibility
- Maintain consistent style/quality
- Organize in appropriate folders

### SEO Optimization
- Write unique page titles (50-60 characters)
- Create compelling meta descriptions (150-160 characters)
- Use heading hierarchy (H1, H2, H3)
- Include local keywords (Durham Region, Newtonville)
- Update content regularly

### Editorial Workflow Best Practices
- Save work frequently as drafts during editing
- Submit content for review when ready for publication
- Include clear notes for reviewers when submitting
- Address reviewer feedback promptly
- Test content on different devices before submitting

### Regular Maintenance
- Review and update horse listings weekly
- Check for outdated contact information monthly
- Update testimonials quarterly
- Refresh facility photos seasonally
- Monitor broken links and update URLs
- Review and update pricing annually

### Content Calendar Suggestions
- **Weekly**: Horse status updates, facility maintenance
- **Bi-weekly**: Team updates, service information
- **Monthly**: Featured horses, client testimonials
- **Seasonal**: Facility updates, seasonal services
- **Annual**: About page updates, business information review

## Troubleshooting

### Common Issues
1. **Images not appearing**: Check file size (< 2MB) and format (JPEG/WebP)
2. **Content not saving**: Ensure all required fields are filled
3. **Preview not working**: Refresh browser or clear cache
4. **Cannot access CMS**: Check if dev server is running (`npm run dev`)
5. **Changes not persisting**: In test-repo mode, changes are temporary

### Editorial Workflow Issues
1. **Cannot submit for review**: Ensure content is saved as draft first
2. **Content stuck in review**: Contact administrator for approval
3. **Workflow status unclear**: Check the status indicator in CMS interface
4. **Permission errors**: Ensure you have proper access rights

### Getting Help
- Check this guide first
- Review CMS_ACCESS.md for setup issues
- Contact site administrator for technical issues
- Test changes in preview mode before submitting for review
- Use the editorial workflow for all content changes

## Content Approval Workflow

The CMS uses editorial workflow for quality control:

1. **Create/Edit Content**: Make your changes in the CMS
2. **Save as Draft**: Save work-in-progress without submitting
3. **Submit for Review**: Send content to administrator for approval
4. **Administrator Review**: Admin reviews and provides feedback if needed
5. **Approval & Publish**: Content is approved and goes live on site

### Workflow Tips
- Always save as draft while working
- Include notes for reviewers when submitting
- Address feedback promptly
- Test content thoroughly before submission
- Use preview mode to check appearance

## Security Best Practices

- Never share login credentials
- Log out when finished editing
- Review content before publishing
- Avoid publishing sensitive information
- Keep contact information up-to-date

---

## Additional Resources
- **CMS Access Guide**: See `CMS_ACCESS.md` for setup instructions
- **Decap CMS Documentation**: https://decapcms.org/docs/
- **Vue.js Content Loading**: Check `src/utils/contentLoader.js` for technical details

For technical support or questions about the CMS, contact your website administrator.