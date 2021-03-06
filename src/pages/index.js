import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SiteIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo />
      <p>
        Listen to the choirs, the treble and soprano soloists and the organ
        solos from Britain's historic cathedrals and churches at St Albans,
        Wells, Edinburgh, Chichester, Gloucester, St Edmundsbury, Northampton,
        Blackburn, Coventry, Sheffield, Lichfield, Cambridge, and more....
      </p>
      <h2>About Lammas Records</h2>
      <div>
        <StaticImage
          src="../images/lance.jpg"
          width={300}
          style={{ float: "right", marginLeft: 10 }}
          alt="Lance Andrews"
        />
        LAMMAS RECORDS was founded and run by Lance Andrews. Lance lives in
        York, UK and previously in St Albans, UK, where he had lived for thirty
        four years.
      </div>
      <p>
        Once a boy chorister at Ely Cathedral, he subsequently joined the Sound
        Department of BBC television, where he was one of their top Sound
        Engineers for many years.
      </p>
      <p>
        On retiring from the BBC he established Lammas Records - specialising in
        choral and organ music. Building on his reputation for recording
        excellence he has many titles to his credit, including commissions by
        other leading publishers. Dr. Barry Rose was associated with many of
        these.
      </p>
      <p>
        Lance used the latest digital sound equipment to create the best in
        professional sound recordings. He produced the master recording,
        designed the artwork and completed the typesetting on his own systems.
        Only the volume production was outsourced; while maintaining careful
        attention to quality of the finished product.
      </p>
    </Layout>
  )
}

export default SiteIndex
