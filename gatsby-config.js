module.exports = {
  siteMetadata: {
    url: 'https://blog.iseevizz.es/',
    title: 'Blog by Robin Cottiss',
    subtitle: 'I am an Enterprise Architect in the Customer Consulting organization at Tableau.',
    copyright: '© All rights reserved.',
    disqusShortname: 'iseevizz-es',
    menu: [
      {
        label: 'Articles',
        path: '/'
      },
      {
        label: 'About me',
        path: '/about/'
      },
      {
        label: 'Contact me',
        path: '/contact/'
      }
    ],
    author: {
      name: 'Robin Cottiss',
      email: 'rcottiss@tableau.com',
      telegram: '#',
      twitter: '@geordielad',
      github: 'geordielad',
      rss: '#',
      vk: '#',
      linkedin: 'robincottiss'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => (
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                }))
            ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960
            }
          },
          'gatsby-remark-embed-youtube',
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: '' }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto\:400,400i,500,700`]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  url
                }
              }
              allSitePage(
                filter: {
                  path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => {
            return {
              url: site.siteMetadata.url + edge.node.path,
              changefreq: 'daily',
              priority: 0.7
            };
          })
      }
    },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss-sass',
    {
      resolve: 'gatsby-plugin-netlify-headers',
      options: {
        headers: { '/posts/example-tableau-viz-embed/': 
          [
            // matching headers (by type) are replaced by netlify with more specific routes
            'X-Frame-Options: ALLOW',
          ]
        },                                  // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [],                           // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true,                   // boolean to turn off the default security headers
        mergeLinkHeaders: false,                      // boolean to turn off the default gatsby js headers (disabled by default, until gzip is fixed for server push)
        mergeCachingHeaders: true,                    // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      }
    }
  ]
};
