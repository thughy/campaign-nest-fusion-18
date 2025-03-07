import { Campaign } from '../types/campaign.types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Milagros Tour',
    description: 'Campaña principal para el tour de Milagros',
    status: 'active',
    created: '2024-01-15T09:00:00.000Z',
    publishDate: '2024-02-01T09:00:00.000Z',
    createdBy: 'Juan Pérez',
    years: [
      {
        id: 'y2024',
        year: 2024,
        cities: [
          {
            id: 'la2024',
            name: 'Los Angeles',
            sources: [
              {
                id: 'fb-la-2024',
                name: 'Facebook',
                platform: 'social',
                adTags: [
                  {
                    id: 'fb-la-tag1',
                    name: 'Ad - Tag',
                    type: 'conversion'
                  }
                ]
              },
              {
                id: 'ig-la-2024',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-la-tag1',
                    name: 'Ad - Tag',
                    type: 'awareness'
                  }
                ]
              },
              {
                id: 'google-la-2024',
                name: 'Google',
                platform: 'search',
                adTags: [
                  {
                    id: 'google-la-tag1',
                    name: 'Ad - Tag',
                    type: 'search'
                  }
                ]
              }
            ]
          },
          {
            id: 'slc2024',
            name: 'Salt Lake City',
            sources: [
              {
                id: 'fb-slc-2024',
                name: 'Facebook',
                platform: 'social',
                adTags: [
                  {
                    id: 'fb-slc-tag1',
                    name: 'Ad - Tag',
                    type: 'conversion'
                  }
                ]
              },
              {
                id: 'ig-slc-2024',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-slc-tag1',
                    name: 'Ad - Tag',
                    type: 'awareness'
                  }
                ]
              },
              {
                id: 'tiktok-slc-2024',
                name: 'Tik Tok',
                platform: 'social',
                adTags: [
                  {
                    id: 'tiktok-slc-tag1',
                    name: 'Ad - Tag',
                    type: 'video'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'y2025',
        year: 2025,
        cities: [
          {
            id: 'col2025',
            name: 'Columbus',
            sources: [
              {
                id: 'google-col-2025',
                name: 'Google',
                platform: 'search',
                adTags: [
                  {
                    id: 'google-col-tag1',
                    name: 'Ad - Tag',
                    type: 'search'
                  }
                ]
              },
              {
                id: 'ig-col-2025',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-col-tag1',
                    name: 'Ad - Tag',
                    type: 'awareness'
                  }
                ]
              },
              {
                id: 'carwrap-col-2025',
                name: 'Car Wrap',
                platform: 'outdoor',
                adTags: [
                  {
                    id: 'carwrap-col-tag1',
                    name: 'Ad - Tag',
                    type: 'outdoor'
                  }
                ]
              }
            ]
          },
          {
            id: 'ind2025',
            name: 'Indianapolis',
            sources: [
              {
                id: 'fb-ind-2025',
                name: 'Facebook',
                platform: 'social',
                adTags: [
                  {
                    id: 'fb-ind-tag1',
                    name: 'Ad - Tag',
                    type: 'conversion'
                  }
                ]
              },
              {
                id: 'ig-ind-2025',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-ind-tag1',
                    name: 'Ad - Tag',
                    type: 'awareness'
                  }
                ]
              },
              {
                id: 'google-ind-2025',
                name: 'Google',
                platform: 'search',
                adTags: [
                  {
                    id: 'google-ind-tag1',
                    name: 'Ad - Tag',
                    type: 'search'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    stats: {
      impressions: 98750,
      clicks: 8234,
      conversions: 823,
      ctr: 8.34,
      conversionRate: 10.0,
      spend: 4325.5,
      leadsRegistered: 376
    }
  },
  {
    id: '2',
    name: 'Lanzamiento Producto Nuevo',
    description: 'Campaña para el lanzamiento del nuevo producto',
    status: 'scheduled',
    created: '2024-02-20T14:30:00.000Z',
    publishDate: '2024-04-15T10:00:00.000Z',
    createdBy: 'Ana Martínez',
    years: [
      {
        id: 'y2024-2',
        year: 2024,
        cities: [
          {
            id: 'ny2024',
            name: 'New York',
            sources: [
              {
                id: 'fb-ny-2024',
                name: 'Facebook',
                platform: 'social',
                adTags: [
                  {
                    id: 'fb-ny-tag1',
                    name: 'Ad - Tag',
                    type: 'conversion'
                  }
                ]
              },
              {
                id: 'ig-ny-2024',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-ny-tag1',
                    name: 'Ad - Tag',
                    type: 'story'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    stats: {
      impressions: 12300,
      clicks: 1520,
      conversions: 215,
      ctr: 12.36,
      conversionRate: 14.14,
      spend: 2150.25,
      leadsRegistered: 98
    }
  },
  {
    id: '3',
    name: 'Campaña de Verano',
    description: 'Promociones especiales de verano',
    status: 'inactive',
    created: '2023-12-10T11:15:00.000Z',
    publishDate: '2024-06-01T09:00:00.000Z',
    createdBy: 'Carlos Rodríguez',
    years: [
      {
        id: 'y2024-3',
        year: 2024,
        cities: [
          {
            id: 'mia2024',
            name: 'Miami',
            sources: [
              {
                id: 'fb-mia-2024',
                name: 'Facebook',
                platform: 'social',
                adTags: [
                  {
                    id: 'fb-mia-tag1',
                    name: 'Ad - Tag',
                    type: 'conversion'
                  }
                ]
              }
            ]
          },
          {
            id: 'orl2024',
            name: 'Orlando',
            sources: [
              {
                id: 'ig-orl-2024',
                name: 'Instagram',
                platform: 'social',
                adTags: [
                  {
                    id: 'ig-orl-tag1',
                    name: 'Ad - Tag',
                    type: 'story'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    stats: {
      impressions: 45670,
      clicks: 3211,
      conversions: 421,
      ctr: 7.03,
      conversionRate: 13.11,
      spend: 3120.75,
      leadsRegistered: 189
    }
  }
];
