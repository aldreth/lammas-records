import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const RecordingTemplate = ({ data, location }) => {
  const recording = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const image = getImage(recording.frontmatter.coverImage)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={recording.frontmatter.title}
        description={recording.frontmatter.description || recording.excerpt}
      />

      <header>
        <h1>{recording.frontmatter.title}</h1>
        <GatsbyImage
          image={image}
          alt={`${recording.frontmatter.title} cover picture`}
        />
        <p>{recording.frontmatter.performer}</p>
        {recording.frontmatter.directors.map((director, idx) => (
          <div key={`director-${idx}`}>{director}</div>
        ))}
        <div
          dangerouslySetInnerHTML={{
            __html: recording.frontmatter.serialNumber,
          }}
        />
      </header>
      <div className="tracks">
        {recording.frontmatter.trackListingsHtml.map((tlHtlm, index) => (
          <div
            key={`tracks-inner-${index}`}
            dangerouslySetInnerHTML={{
              __html: tlHtlm,
            }}
          />
        ))}
      </div>
      <h2>{recording.frontmatter.title}</h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: recording.frontmatter.contentHtml,
        }}
      />
      <div
        className="recording-details"
        dangerouslySetInnerHTML={{
          __html: recording.frontmatter.recordingDetailsHtml,
        }}
      />
    </Layout>
  )
}

export default RecordingTemplate

export const pageQuery = graphql`
  query RecordingBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        serialNumber
        performer
        directors
        contentHtml
        recordingDetailsHtml
        trackListingsHtml
        new_slug
        coverImage {
          childImageSharp {
            gatsbyImageData(width: 300, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
