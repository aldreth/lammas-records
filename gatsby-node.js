const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const recordingTemplate = path.resolve(`./src/templates/recording.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your data`, result.errors)
    return
  }

  const recordings = result.data.allMarkdownRemark.nodes

  if (recordings.length > 0) {
    recordings.forEach((recording, index) => {
      createPage({
        path: recording.fields.slug,
        component: recordingTemplate,
        context: {
          id: recording.id,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    const parent = getNode(node.parent)

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `collection`,
      node,
      value: parent.sourceInstanceName,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      siteUrl: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      performer: String
      directors: [Director]
      content: [String]
      details: [Detail]
      recordingDetails: [String]
    }

    type Director {
      name: String
      title: String
    }

    type Detail {
      title: String
      content: [String]
    }

    type Fields {
      slug: String
      collection: String
    }
  `)
}
