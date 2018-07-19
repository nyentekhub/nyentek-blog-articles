import React from 'react'
import PropTypes from 'prop-types'
import {Entries} from "../components/Entries";

export default class IndexPage extends React.Component {

	render() {
		const {data} = this.props
		const {allFile} = data
		const {edges: posts} = data.allMarkdownRemark
		let imagesArray = []
		allFile.edges.map(({node: file}) => imagesArray.push(file))

		return (
			<section>
				<div className="global-splash">
					<div className="splash-content">
						<h1 className="splash-heading">Nyentek Articles</h1>
						<p className="splash-subheading">Blah Blah Blah</p>
					</div>
				</div>
				<div className="container">
					<div className="content">
						<h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
					</div>
					{posts
						.map(({node: post}) => (
							<Entries {{post, imagesArray}}/>
						))}
				</div>
			</section>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            postimage
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    allFile(filter: { absolutePath: { regex: "/img/" } }) {
      edges {
        node {
          absolutePath
          relativePath
          childImageSharp {
            sizes(maxWidth: 630) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
