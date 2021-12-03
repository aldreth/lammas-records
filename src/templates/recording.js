import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const RecordingTemplate = ({ data, location }) => {
  const recording = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={recording.frontmatter.title}
        description={recording.frontmatter.description || recording.excerpt}
      />

      <header>
        <h1>{recording.frontmatter.title}</h1>
        <p>{recording.frontmatter.performer}</p>
        {recording.frontmatter.directors.map((director, idx) => (
          <div key={`director-${idx}`}>
            {director.title}: {director.name}
          </div>
        ))}
      </header>
      <div dangerouslySetInnerHTML={{ __html: recording.html }} />
      <h2>{recording.frontmatter.title}</h2>
      <div className="content">
        {recording.frontmatter.content.map((para, idx) => (
          <p key={`content-para-${idx}`}>{para}</p>
        ))}
      </div>
      <div className="details">
        {recording.frontmatter.details.map((detail, idx) => (
          <div key={`detail-${idx}`}>
            <h3 key={`detail-title-${idx}`}>{detail.title}</h3>
            {recording.frontmatter.content.map((para, index) => (
              <p key={`detail-para-${idx}-${index}`}>{para}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="recording-details">
        {recording.frontmatter.recordingDetails.map((para, idx) => (
          <p key={`recording-detail-para-${idx}`}>{para}</p>
        ))}
      </div>
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        performer
        directors {
          name
          title
        }
        content
        details {
          title
          content
        }
        recordingDetails
      }
    }
  }
`
