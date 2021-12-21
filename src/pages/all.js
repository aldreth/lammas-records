import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AllIndex = ({ data, location }) => {
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
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
