/**
 * Content Validation Composable
 * Validates content from Decap CMS to ensure data quality
 */

import { ref, computed } from 'vue'

export function useContentValidation() {
  const errors = ref([])
  const warnings = ref([])

  // Validate horse listing
  const validateHorseListing = (horse) => {
    errors.value = []
    warnings.value = []

    // Required fields
    if (!horse.name) {
      errors.value.push('Horse name is required')
    }
    
    if (!horse.status) {
      errors.value.push('Status is required')
    }
    
    if (!horse.type) {
      errors.value.push('Listing type (Sale/Lease/Both) is required')
    }
    
    if (!horse.main_image) {
      errors.value.push('Main photo is required')
    }
    
    // Basic info validation
    if (!horse.basic_info) {
      errors.value.push('Basic information is required')
    } else {
      if (!horse.basic_info.age || horse.basic_info.age < 0 || horse.basic_info.age > 40) {
        errors.value.push('Valid age is required (0-40 years)')
      }
      if (!horse.basic_info.height) {
        errors.value.push('Height is required')
      }
      if (!horse.basic_info.gender) {
        errors.value.push('Gender is required')
      }
      if (!horse.basic_info.breed) {
        errors.value.push('Breed is required')
      }
      if (!horse.basic_info.color) {
        errors.value.push('Color is required')
      }
    }
    
    // Performance validation
    if (!horse.performance) {
      errors.value.push('Performance information is required')
    } else {
      if (!horse.performance.discipline) {
        errors.value.push('Discipline is required')
      }
      if (!horse.performance.level) {
        errors.value.push('Suitable level is required')
      }
    }
    
    // Pricing validation
    if (!horse.pricing) {
      errors.value.push('Pricing information is required')
    } else {
      if (horse.type === 'Sale' && !horse.pricing.sale_price) {
        errors.value.push('Sale price is required for horses for sale')
      }
      if (horse.type === 'Lease' && !horse.pricing.lease_price) {
        errors.value.push('Lease price is required for horses for lease')
      }
      if (horse.type === 'Both' && !horse.pricing.sale_price && !horse.pricing.lease_price) {
        errors.value.push('At least one price (sale or lease) is required')
      }
    }
    
    // Description validation
    if (!horse.excerpt) {
      errors.value.push('Short description is required')
    } else if (horse.excerpt.length < 50) {
      warnings.value.push('Short description should be at least 50 characters')
    }
    
    if (!horse.body) {
      errors.value.push('Full description is required')
    } else if (horse.body.length < 200) {
      warnings.value.push('Full description should be at least 200 characters')
    }
    
    // Gallery validation
    if (!horse.gallery || horse.gallery.length < 2) {
      warnings.value.push('At least 2 gallery photos recommended')
    }
    
    // SEO validation
    if (horse.meta_description && (horse.meta_description.length < 50 || horse.meta_description.length > 160)) {
      warnings.value.push('Meta description should be between 50-160 characters')
    }
    
    return {
      isValid: errors.value.length === 0,
      errors: errors.value,
      warnings: warnings.value
    }
  }

  // Validate service
  const validateService = (service) => {
    errors.value = []
    warnings.value = []

    if (!service.title) {
      errors.value.push('Service name is required')
    }
    
    if (!service.service_category) {
      errors.value.push('Service category is required')
    }
    
    if (!service.image) {
      errors.value.push('Featured image is required')
    }
    
    if (!service.excerpt) {
      errors.value.push('Short description is required')
    }
    
    if (!service.pricing_options || service.pricing_options.length === 0) {
      warnings.value.push('At least one pricing option recommended')
    } else {
      service.pricing_options.forEach((option, index) => {
        if (!option.name) {
          errors.value.push(`Pricing option ${index + 1}: Name is required`)
        }
        if (!option.price) {
          warnings.value.push(`Pricing option ${index + 1}: Price is recommended`)
        }
      })
    }
    
    if (!service.body) {
      errors.value.push('Full description is required')
    }
    
    return {
      isValid: errors.value.length === 0,
      errors: errors.value,
      warnings: warnings.value
    }
  }

  // Validate team member
  const validateTeamMember = (member) => {
    errors.value = []
    warnings.value = []

    if (!member.name) {
      errors.value.push('Full name is required')
    }
    
    if (!member.position) {
      errors.value.push('Position/title is required')
    }
    
    if (!member.photo) {
      errors.value.push('Profile photo is required')
    }
    
    if (!member.bio) {
      errors.value.push('Biography is required')
    } else if (member.bio.length < 100) {
      warnings.value.push('Biography should be at least 100 characters')
    }
    
    if (!member.specialties || member.specialties.length === 0) {
      warnings.value.push('At least one specialty recommended')
    }
    
    return {
      isValid: errors.value.length === 0,
      errors: errors.value,
      warnings: warnings.value
    }
  }



  // Validate facility
  const validateFacility = (facility) => {
    errors.value = []
    warnings.value = []

    if (!facility.title) {
      errors.value.push('Facility name is required')
    }
    
    if (!facility.facility_type) {
      errors.value.push('Facility type is required')
    }
    
    if (!facility.main_image) {
      errors.value.push('Main image is required')
    }
    
    if (!facility.features || facility.features.length === 0) {
      warnings.value.push('At least one feature should be listed')
    }
    
    if (!facility.body) {
      errors.value.push('Description is required')
    }
    
    if (!facility.gallery || facility.gallery.length === 0) {
      warnings.value.push('Photo gallery recommended')
    }
    
    return {
      isValid: errors.value.length === 0,
      errors: errors.value,
      warnings: warnings.value
    }
  }

  // Validate testimonial
  const validateTestimonial = (testimonial) => {
    errors.value = []
    warnings.value = []

    if (!testimonial.client_name) {
      errors.value.push('Client name is required')
    }
    
    if (!testimonial.date) {
      errors.value.push('Date is required')
    }
    
    if (!testimonial.client_type) {
      errors.value.push('Client type is required')
    }
    
    if (!testimonial.service_type) {
      errors.value.push('Service type is required')
    }
    
    if (!testimonial.testimonial) {
      errors.value.push('Testimonial text is required')
    } else if (testimonial.testimonial.length < 50) {
      warnings.value.push('Testimonial should be at least 50 characters')
    }
    
    if (!testimonial.rating || testimonial.rating < 1 || testimonial.rating > 5) {
      errors.value.push('Valid rating (1-5) is required')
    }
    
    if (!testimonial.permission) {
      errors.value.push('Permission to display must be confirmed')
    }
    
    return {
      isValid: errors.value.length === 0,
      errors: errors.value,
      warnings: warnings.value
    }
  }

  // Generic validation
  const validateContent = (content, contentType) => {
    switch (contentType) {
      case 'horse':
        return validateHorseListing(content)
      case 'service':
        return validateService(content)
      case 'team':
        return validateTeamMember(content)

      case 'facility':
        return validateFacility(content)
      case 'testimonial':
        return validateTestimonial(content)
      default:
        return {
          isValid: true,
          errors: [],
          warnings: []
        }
    }
  }

  // Check if image exists and is valid
  const validateImage = (imagePath) => {
    if (!imagePath) return false
    
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const extension = imagePath.toLowerCase().substring(imagePath.lastIndexOf('.'))
    
    return validExtensions.includes(extension)
  }

  // Validate SEO fields
  const validateSEO = (content) => {
    const seoWarnings = []
    
    if (!content.meta_description) {
      seoWarnings.push('Meta description is recommended for SEO')
    } else if (content.meta_description.length < 50 || content.meta_description.length > 160) {
      seoWarnings.push('Meta description should be between 50-160 characters')
    }
    
    if (content.title && content.title.length > 60) {
      seoWarnings.push('Title should be under 60 characters for optimal SEO')
    }
    
    if (!content.keywords || content.keywords.length === 0) {
      seoWarnings.push('Keywords are recommended for SEO')
    }
    
    return seoWarnings
  }

  // Check content freshness
  const checkContentFreshness = (date) => {
    if (!date) return 'No date provided'
    
    const contentDate = new Date(date)
    const now = new Date()
    const daysDiff = Math.floor((now - contentDate) / (1000 * 60 * 60 * 24))
    
    if (daysDiff < 7) return 'fresh'
    if (daysDiff < 30) return 'recent'
    if (daysDiff < 90) return 'aging'
    return 'stale'
  }

  return {
    validateHorseListing,
    validateService,
    validateTeamMember,
    validateFacility,
    validateTestimonial,
    validateContent,
    validateImage,
    validateSEO,
    checkContentFreshness,
    errors: computed(() => errors.value),
    warnings: computed(() => warnings.value)
  }
}