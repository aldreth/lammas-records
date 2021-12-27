import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const OrganOtherIndex = ({ data, location }) => {
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <Seo title="Other Organ Recordings" />
      <div className="recordings">
        {recordings.map(recording => {
          return (
            <div className="recording" key={recording.frontmatter.slug}>
              <Link to={`/${recording.frontmatter.slug}`}>
                {recording.frontmatter.title}
              </Link>
              <br />
              <Link to={`/${recording.frontmatter.slug}`}>
                <GatsbyImage
                  image={getImage(recording.frontmatter.coverImage)}
                  alt={`${recording.frontmatter.title} cover picture`}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default OrganOtherIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "organ-other" } } }
      sort: { fields: [frontmatter___slug], order: ASC }
    ) {
      nodes {
        frontmatter {
          title
          performer
          slug
          coverImage {
            childImageSharp {
              gatsbyImageData(width: 100, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
