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
          <div key={`director-${idx}`}>{director}</div>
        ))}
      </header>
      <div dangerouslySetInnerHTML={{ __html: recording.html }} />
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        performer
        directors
        contentHtml
        recordingDetailsHtml
      }
    }
  }
`
