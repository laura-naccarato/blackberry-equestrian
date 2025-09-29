<template>
  <div class="about-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">About Blackberry Equestrian</h1>
        <p class="page-subtitle">
          Over 20 years of excellence in equestrian care and training
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="content-grid">
          <div class="text-content">
            <h2 class="section-title">Our Story</h2>
            <p class="lead-text">
              Founded in 2000, Blackberry Equestrian has grown from a small family farm 
              into one of Durham Region's premier hunter/jumper facilities.
            </p>
            <p>
              What started as a passion for horses has evolved into a comprehensive 
              equestrian center serving riders of all ages and skill levels. Our commitment 
              to excellence in horse care, professional instruction, and fostering a supportive 
              community has made us a trusted name in Ontario's equestrian scene.
            </p>
            <p>
              Located on 45 acres of beautiful countryside in Newtonville, our facility 
              combines modern amenities with the charm of traditional horsemanship. We take 
              pride in maintaining the highest standards while creating an environment where 
              both horses and riders can reach their full potential.
            </p>
          </div>
          <div class="image-content">
            <img 
              :src="facilityImage" 
              alt="Blackberry Equestrian Facility"
              class="featured-image"
              @error="handleImageError"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values -->
    <section class="values-section">
      <div class="container">
        <h2 class="section-title text-center">Our Mission & Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <HeartIcon class="icon" />
            </div>
            <h3>Horse Welfare First</h3>
            <p>The health, happiness, and well-being of our horses is our top priority in everything we do.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <AcademicCapIcon class="icon" />
            </div>
            <h3>Excellence in Education</h3>
            <p>We provide professional instruction that builds confidence, skill, and a lifelong love of riding.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <UsersIcon class="icon" />
            </div>
            <h3>Community & Support</h3>
            <p>Creating a welcoming environment where riders support and encourage each other's growth.</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <ShieldCheckIcon class="icon" />
            </div>
            <h3>Safety & Professionalism</h3>
            <p>Maintaining the highest standards of safety, facility management, and professional conduct.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What Sets Us Apart -->
    <section class="differentiators-section">
      <div class="container">
        <h2 class="section-title">What Sets Us Apart</h2>
        <div class="features-list">
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Experienced Leadership</h4>
              <p>Our head trainer brings over 25 years of experience in hunter/jumper competition and coaching.</p>
            </div>
          </div>
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Comprehensive Programs</h4>
              <p>From beginner lessons to Grand Prix training, we offer programs for every level and aspiration.</p>
            </div>
          </div>
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Premium Facilities</h4>
              <p>Indoor and outdoor arenas, quality footing, spacious stalls, and well-maintained grounds.</p>
            </div>
          </div>
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Personalized Care</h4>
              <p>Each horse receives individual attention with customized feeding and turnout schedules.</p>
            </div>
          </div>
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Competition Success</h4>
              <p>Proud home to provincial champions and national competitors in hunter, jumper, and equitation.</p>
            </div>
          </div>
          <div class="feature-item">
            <CheckIcon class="check-icon" />
            <div class="feature-content">
              <h4>Family Atmosphere</h4>
              <p>A supportive community where riders of all ages feel welcome and encouraged.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title text-center">Meet Our Team</h2>
        <p class="section-subtitle text-center">
          Dedicated professionals committed to your equestrian journey
        </p>
        
        <div class="team-highlight">
          <img 
            :src="teamLeadImage" 
            alt="Lead Instructor"
            class="team-photo"
            @error="handleTeamImageError"
          >
          <div class="team-info">
            <h3>Sarah Mitchell</h3>
            <p class="role">Owner & Head Trainer</p>
            <p class="bio">
              With over 25 years of experience in the hunter/jumper discipline, Sarah has 
              trained numerous horses and riders to success at provincial and national levels. 
              Her philosophy centers on building strong foundations, developing confidence, 
              and creating positive partnerships between horses and riders.
            </p>
            <div class="credentials">
              <span class="credential">Equine Canada Certified</span>
              <span class="credential">NCCP Level 2 Coach</span>
              <span class="credential">First Aid Certified</span>
            </div>
          </div>
        </div>
        
        <p class="team-note">
          Our team also includes experienced barn staff, grooms, and assistant instructors 
          who share our commitment to excellence in horse care and rider education.
        </p>
      </div>
    </section>

    <!-- Awards & Recognition -->
    <section class="awards-section">
      <div class="container">
        <h2 class="section-title text-center">Awards & Recognition</h2>
        <div class="awards-grid">
          <div class="award-item">
            <TrophyIcon class="award-icon" />
            <h4>Provincial Championships</h4>
            <p>Multiple titles in Hunter & Jumper divisions</p>
          </div>
          <div class="award-item">
            <StarIcon class="award-icon" />
            <h4>Excellence in Care</h4>
            <p>Recognized for outstanding facility management</p>
          </div>
          <div class="award-item">
            <AwardIcon class="award-icon" />
            <h4>Community Service</h4>
            <p>Supporting local equestrian programs</p>
          </div>
          <div class="award-item">
            <RibbonIcon class="award-icon" />
            <h4>Coaching Excellence</h4>
            <p>Developing successful riders at all levels</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="cta-title">Experience the Blackberry Difference</h2>
        <p class="cta-subtitle">
          Join our community and discover why riders choose Blackberry Equestrian
        </p>
        <div class="cta-buttons">
          <RouterLink to="/contact?subject=Facility Tour" class="btn btn-primary">
            Schedule a Tour
          </RouterLink>
          <RouterLink to="/services" class="btn btn-secondary">
            View Our Services
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { PLACEHOLDER_IMAGE, handleImageError as handleImgError } from '@/utils/images'
import { 
  HeartIcon, 
  AcademicCapIcon, 
  UsersIcon, 
  ShieldCheckIcon,
  CheckIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/vue/24/outline'

// Using placeholder icons for awards
const AwardIcon = StarIcon
const RibbonIcon = TrophyIcon

// Image handling - using placeholders to avoid build issues
const facilityImage = ref(PLACEHOLDER_IMAGE)
const teamLeadImage = ref(PLACEHOLDER_IMAGE)

const handleImageError = (event) => {
  handleImgError(event)
}

const handleTeamImageError = (event) => {
  handleImgError(event)
}
</script>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(rgba(44, 85, 48, 0.9), rgba(44, 85, 48, 0.9)),
              url('/images/about-hero.jpg') center/cover;
  padding: 6rem 0;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: serif;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Story Section */
.story-section {
  padding: 4rem 0;
  background: white;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  color: #2c5530;
  margin-bottom: 1.5rem;
  font-family: serif;
  font-weight: 600;
}

.lead-text {
  font-size: 1.25rem;
  color: #444;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.text-content p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.featured-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Values Section */
.values-section {
  padding: 4rem 0;
  background: #f9f9f9;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #8B4513, #D2691E);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-icon .icon {
  width: 30px;
  height: 30px;
  color: white;
}

.value-card h3 {
  color: #2c5530;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

/* Differentiators Section */
.differentiators-section {
  padding: 4rem 0;
  background: white;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.check-icon {
  width: 24px;
  height: 24px;
  color: #4CAF50;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-content h4 {
  color: #2c5530;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.feature-content p {
  color: #666;
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: 4rem 0;
  background: #f9f9f9;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.team-highlight {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
  max-width: 900px;
  margin: 0 auto 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.team-photo {
  width: 100%;
  border-radius: 8px;
}

.team-info h3 {
  color: #2c5530;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.role {
  color: #8B4513;
  font-weight: 600;
  margin-bottom: 1rem;
}

.bio {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.credentials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.credential {
  padding: 0.375rem 0.75rem;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #444;
}

.team-note {
  text-align: center;
  color: #666;
  font-style: italic;
}

/* Awards Section */
.awards-section {
  padding: 4rem 0;
  background: white;
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.award-item {
  text-align: center;
}

.award-icon {
  width: 48px;
  height: 48px;
  color: #D2691E;
  margin: 0 auto 1rem;
}

.award-item h4 {
  color: #2c5530;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.award-item p {
  color: #666;
  font-size: 0.875rem;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #2c5530, #3a6b3e);
  color: white;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: serif;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-primary {
  background: #8B4513;
  color: white;
}

.btn-primary:hover {
  background: #6B3410;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #2c5530;
}

.text-center {
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .team-highlight {
    grid-template-columns: 1fr;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>