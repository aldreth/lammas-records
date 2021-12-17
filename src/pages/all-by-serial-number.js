import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AllBySerialNumberIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All recordings" />
      <ol style={{ listStyle: `none` }}>
        {recordings.map(post => {
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug}>{post.frontmatter.serialNumber}</Link>
              <p>{post.frontmatter.title}</p>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default AllBySerialNumberIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___serialNumber], order: ASC }
    ) {
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
