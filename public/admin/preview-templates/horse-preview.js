// Horse Preview Template for Decap CMS
(function() {
  // Wait for CMS to be available
  if (typeof CMS === 'undefined') {
    console.warn('CMS not available yet for horse preview');
    return;
  }

  // Check if we have the necessary React globals
  if (typeof h === 'undefined' && window.CMS) {
    window.h = window.CMS.h || function() { return null; };
  }

  try {
    const HorsePreview = ({ entry, widgetFor }) => {
      const horse = entry.get('data').toJS();
      
      // Format price for display
      const formatPrice = (price) => {
        if (!price) return 'Contact for pricing';
        return new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          minimumFractionDigits: 0
        }).format(price);
      };

      // Get status badge color
      const getStatusColor = (status) => {
        switch(status) {
          case 'Available': return '#10b981';
          case 'Pending': return '#f59e0b';
          case 'Sold': return '#ef4444';
          case 'Leased': return '#6366f1';
          default: return '#6b7280';
        }
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
        // Header with status badge
        createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }
        },
          createElement('h1', {
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0'
            }
          }, horse.title || 'Horse Name'),
          createElement('span', {
            style: {
              backgroundColor: getStatusColor(horse.status),
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500'
            }
          }, horse.status || 'Status')
        ),

        // Main image
        horse.main_photo && createElement('img', {
          src: horse.main_photo,
          style: {
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '20px'
          }
        }),

        // Basic info grid
        createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }
        },
          createElement('div', {},
            createElement('strong', {}, 'Age: '),
            createElement('span', {}, (horse.basic_info?.age || 'N/A') + ' years')
          ),
          createElement('div', {},
            createElement('strong', {}, 'Height: '),
            createElement('span', {}, horse.basic_info?.height || 'N/A')
          ),
          createElement('div', {},
            createElement('strong', {}, 'Gender: '),
            createElement('span', {}, horse.basic_info?.gender || 'N/A')
          ),
          createElement('div', {},
            createElement('strong', {}, 'Breed: '),
            createElement('span', {}, horse.basic_info?.breed || 'N/A')
          ),
          createElement('div', {},
            createElement('strong', {}, 'Color: '),
            createElement('span', {}, horse.basic_info?.color || 'N/A')
          ),
          createElement('div', {},
            createElement('strong', {}, 'Disciplines: '),
            createElement('span', {}, horse.training?.disciplines?.join(', ') || 'N/A')
          )
        ),

        // Pricing
        createElement('div', {
          style: {
            backgroundColor: '#eff6ff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }
        },
          createElement('h3', {
            style: {
              margin: '0 0 10px 0',
              fontSize: '18px',
              fontWeight: '600'
            }
          }, 'Pricing'),
          createElement('div', {
            style: {
              display: 'flex',
              gap: '30px'
            }
          },
            horse.pricing?.sale_price && createElement('div', {},
              createElement('strong', {}, 'Sale Price: '),
              createElement('span', {
                style: {
                  fontSize: '20px',
                  color: '#059669'
                }
              }, formatPrice(horse.pricing.sale_price))
            ),
            horse.pricing?.lease_price && createElement('div', {},
              createElement('strong', {}, 'Lease Price: '),
              createElement('span', {
                style: {
                  fontSize: '20px',
                  color: '#059669'
                }
              }, formatPrice(horse.pricing.lease_price) + '/month')
            )
          )
        ),

        // Body content
        widgetFor('body')
      );
    };

    // Register the preview template
    CMS.registerPreviewTemplate("horses", HorsePreview);
    console.log('Horse preview template registered successfully');
  } catch (error) {
    console.error('Error registering horse preview:', error);
  }
})();