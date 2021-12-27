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
        {recordings.map(recording => {
          return (
            <li key={recording.frontmatter.slug}>
              <Link to={`/${recording.frontmatter.slug}`}>
                {recording.frontmatter.title}
              </Link>
              <p>{recording.frontmatter.serialNumber}</p>
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
    allMarkdownRemark(sort: { fields: [frontmatter___slug], order: ASC }) {
      nodes {
        frontmatter {
          title
          serialNumber
          slug
        }
      }
    }
  }
`
