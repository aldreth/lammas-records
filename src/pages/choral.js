import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ChoralIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Choral Recordings" />
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

export default ChoralIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "choral" } } }
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
