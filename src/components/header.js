import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const Header = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  //   const rootPath = `${__PATH_PREFIX__}/`
  //   TODO: on root path render bigger header
  //   const isRootPath = location.pathname === rootPath
  return (
    <header className="header" data-style-header="">
      <AnchorLink className="header__skip hide-screens button" to="#content">
        Skip to content
      </AnchorLink>

      <nav className="header__nav">
        <Link href="/" className="header__title" style={{ color: "black" }}>
          {site.siteMetadata?.title}
        </Link>

        <input
          type="checkbox"
          role="button"
          aria-label="Menu"
          id="hamburger"
          className="header__checkbox"
        />
        <label
          className="header__toggle"
          htmlFor="hamburger"
          aria-hidden="true"
        >
          <span className="header__toggle-icon"></span> Menu
        </label>

        <div className="header__links">
          <Link className="header__link" to="/choral">
            Choral Recordings
          </Link>
          <Link className="header__link" to="/solo">
            Solo Recordings
          </Link>

          <Link className="header__link" to="/organ-sounds">
            Sounds Series
          </Link>
          <Link className="header__link" to="/organ-other">
            Other Organ Recordings
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
