import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const OrganSoundsIndex = ({ data, location }) => {
  const recordings = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <Seo title="Sounds Series - Organ Recordings" />
      <div className="recordings">
        {recordings.map(recording => {
          return (
            <div className="recording" key={recording.fields.slug}>
              <Link to={recording.fields.slug}>
                {recording.frontmatter.title}
              </Link>
              <br />
              <Link to={recording.fields.slug}>
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

export default OrganSoundsIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "organ-sounds" } } }
      sort: { fields: [frontmatter___new_slug], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          performer
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
