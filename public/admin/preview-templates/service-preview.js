// Service Preview Template for Decap CMS
(function() {
  // Wait for CMS to be available
  if (typeof CMS === 'undefined') {
    console.warn('CMS not available yet for service preview');
    return;
  }

  // Check if we have the necessary React globals
  if (typeof h === 'undefined' && window.CMS) {
    window.h = window.CMS.h || function() { return null; };
  }

  try {
    const ServicePreview = ({ entry, widgetFor }) => {
      const service = entry.get('data').toJS();
      
      // Format price for display
      const formatPrice = (price, unit) => {
        if (!price) return 'Contact for pricing';
        const formatted = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          minimumFractionDigits: 0
        }).format(price);
        
        const unitLabel = {
          'monthly': '/month',
          'weekly': '/week',
          'daily': '/day',
          'per lesson': '/lesson',
          'per session': '/session',
          'one-time': ' one-time'
        }[unit] || '';
        
        return formatted + unitLabel;
      };

      const createElement = window.h || function() { return null; };

      return createElement('div', {
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }
      },
        // Header
        createElement('div', {
          style: {
            marginBottom: '20px'
          }
        },
          createElement('h1', {
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }
          }, service.title || 'Service Name'),
          service.subtitle && createElement('p', {
            style: {
              fontSize: '18px',
              color: '#6b7280',
              margin: '0'
            }
          }, service.subtitle)
        ),

        // Featured image
        service.featured_image && createElement('img', {
          src: service.featured_image,
          style: {
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '30px'
          }
        }),

        // Key Features
        service.key_features && service.key_features.length > 0 && createElement('div', {
          style: {
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
          }
        },
          createElement('h3', {
            style: {
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 15px 0'
            }
          }, 'Key Features'),
          createElement('ul', {
            style: {
              margin: '0',
              paddingLeft: '20px'
            }
          },
            service.key_features.map((feature, index) => 
              createElement('li', {
                key: index,
                style: {
                  marginBottom: '8px',
                  color: '#374151'
                }
              }, feature)
            )
          )
        ),

        // Pricing Options
        service.pricing && service.pricing.length > 0 && createElement('div', {
          style: {
            marginBottom: '30px'
          }
        },
          createElement('h3', {
            style: {
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px'
            }
          }, 'Pricing Options'),
          createElement('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: service.pricing.length > 2 ? 'repeat(auto-fit, minmax(250px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }
          },
            service.pricing.map((option, index) => 
              createElement('div', {
                key: index,
                style: {
                  border: option.popular ? '2px solid #065f46' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  position: 'relative'
                }
              },
                option.popular && createElement('span', {
                  style: {
                    position: 'absolute',
                    top: '-12px',
                    left: '20px',
                    backgroundColor: '#065f46',
                    color: 'white',
                    padding: '2px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }
                }, 'POPULAR'),
                createElement('h4', {
                  style: {
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 10px 0'
                  }
                }, option.name),
                createElement('p', {
                  style: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#065f46',
                    margin: '0 0 15px 0'
                  }
                }, formatPrice(option.price, option.price_unit)),
                option.features && createElement('ul', {
                  style: {
                    margin: '0',
                    paddingLeft: '20px',
                    fontSize: '14px'
                  }
                },
                  option.features.map((feature, fIndex) => 
                    createElement('li', {
                      key: fIndex,
                      style: {
                        marginBottom: '6px',
                        color: '#4b5563'
                      }
                    }, feature)
                  )
                ),
                !option.available && createElement('p', {
                  style: {
                    marginTop: '15px',
                    padding: '8px',
                    backgroundColor: '#fef2f2',
                    color: '#991b1b',
                    borderRadius: '4px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }
                }, 'Currently Unavailable')
              )
            )
          )
        ),

        // What's Included
        service.includes && service.includes.length > 0 && createElement('div', {
          style: {
            backgroundColor: '#f0fdf4',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
          }
        },
          createElement('h3', {
            style: {
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 15px 0',
              color: '#065f46'
            }
          }, 'What\'s Included'),
          createElement('ul', {
            style: {
              margin: '0',
              paddingLeft: '20px',
              color: '#064e3b'
            }
          },
            service.includes.map((item, index) => 
              createElement('li', {
                key: index,
                style: {
                  marginBottom: '8px'
                }
              }, item)
            )
          )
        ),

        // Body content
        widgetFor('body'),

        // Call to Action
        service.cta_text && createElement('div', {
          style: {
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            textAlign: 'center'
          }
        },
          createElement('a', {
            href: service.cta_link || '#',
            style: {
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#065f46',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px'
            }
          }, service.cta_text)
        )
      );
    };

    // Register the preview template
    CMS.registerPreviewTemplate("services", ServicePreview);
    console.log('Service preview template registered successfully');
  } catch (error) {
    console.error('Error registering service preview:', error);
  }
})();