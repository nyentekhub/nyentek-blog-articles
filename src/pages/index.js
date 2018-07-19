import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export default class IndexPage extends React.Component {

  renderPostImage (path, imagesArray) {
    console.log('renderPostImage')
    let comparePath = path.split('/img/')
    comparePath = comparePath.length == 2 ? comparePath[1] : ''
    return imagesArray
      .filter(
        item =>
          item.relativePath === comparePath
      )
      .map(
        (item, i) => {
          console.log(item)
          return <Img className="preview-image" key={i} sizes={item.childImageSharp.sizes}/>
        }
      )
  }

  render () {
    const { data } = this.props
    const { allFile } = data
    const { edges: posts } = data.allMarkdownRemark
    let imagesArray = []
    allFile.edges.map(({ node: file }) => imagesArray.push(file))
    console.log(allFile)
    console.log(posts)

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
            .map(({ node: post }) => (
              <div
                className="content card"
                style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
                key={post.id}
              >
                <p>
                  <Link className="has-text-primary" to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </p>
                {this.renderPostImage(post.frontmatter.postimage, imagesArray)}
                <p>
                  {post.excerpt}
                  <br/>
                  <br/>
                  <Link className="button is-small" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </div>
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
