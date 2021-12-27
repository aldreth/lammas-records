import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AllBySerialNumberIndex = ({ data, location }) => {
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <Seo title="All recordings" />
      <ol style={{ listStyle: `none` }}>
        {recordings.map(recording => {
          return (
            <li key={recording.frontmatter.slug}>
              <Link to={`/${recording.frontmatter.slug}`}>
                {recording.frontmatter.serialNumber}
              </Link>
              <p>{recording.frontmatter.title}</p>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___serialNumber], order: ASC }
    ) {
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
