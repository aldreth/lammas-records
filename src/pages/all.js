import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AllIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const recordings = data.allMarkdownRemark.nodes

  if (recordings.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All Recordsings" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All recordings" />
      <ol style={{ listStyle: `none` }}>
        {recordings.map(post => {
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              <p>{post.frontmatter.serialNumber}</p>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default AllIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___new_slug], order: ASC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          serialNumber
        }
      }
    }
  }
`
