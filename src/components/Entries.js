import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

export const Entries = ({ post, imagesArray }) => {
	function renderPostImage (path, imagesArray) {
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
					return <Img className="preview-image" key={i}
					            sizes={item.childImageSharp.sizes}/>
				}
			)
	}

	return (
		<div
			className="content card"
			style={{ border: '20px solid #eaecee', padding: '2em 4em' }}
			key={post.id}
		>
			<p>
				<Link className="has-text-primary" to={post.fields.slug}>
					{post.frontmatter.title}
				</Link>
				<span> &bull; </span>
				<small>{post.frontmatter.date}</small>
			</p>
			{renderPostImage(post.frontmatter.postimage, imagesArray)}
			<p>
				{post.excerpt}
				<br/>
				<br/>
				<Link className="button is-small" to={post.fields.slug}>
					Keep Reading →
				</Link>
			</p>
		</div>
	)
}