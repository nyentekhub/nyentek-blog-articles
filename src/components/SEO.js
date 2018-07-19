import React from 'react'
import Helmet from 'react-helmet'
import { siteConfig } from '../utils/util'

const SEO = props => {
	const { postNode, postPath, postSEO } = props
	let title
	let description
	let image
	let postURL
	const realPrefix = siteConfig.pathPrefix === '/' ? '' : siteConfig.pathPrefix
	if (postSEO) {
		const postMeta = postNode.frontmatter
		title = postMeta.title // eslint-disable-line prefer-destructuring
		description = postNode.excerpt
		image = postMeta.cover.childImageSharp.resize.src
		postURL = siteConfig.siteUrl + realPrefix + postPath
	} else {
		title = siteConfig.siteTitleAlt
		description = siteConfig.siteDescription
		image = siteConfig.siteLogo
	}
	image = siteConfig.siteUrl + realPrefix + image
	const blogURL = siteConfig.siteUrl + siteConfig.pathPrefix
	const schemaOrgJSONLD = [
		{
			'@context': 'http://schema.org',
			'@type': 'WebSite',
			url: blogURL,
			name: title,
			alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : ''
		}
	]
	if (postSEO) {
		schemaOrgJSONLD.push(
			{
				'@context': 'http://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: {
							'@id': postURL,
							name: title,
							image
						}
					}
				]
			},
			{
				'@context': 'http://schema.org',
				'@type': 'BlogPosting',
				url: blogURL,
				name: title,
				alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
				headline: title,
				image: {
					'@type': 'ImageObject',
					url: image
				},
				description
			}
		)
	}
	return (
		<Helmet>
			<html lang={siteConfig.siteLanguage}/>
			<title>{title}</title>
			<meta charSet="utf-8"/>
			<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale = 1.0, maximum-scale=1.0"
			/>
			<meta name="description" content={description}/>
			<meta name="image" content={image}/>
			<script type="application/ld+json">
				{JSON.stringify(schemaOrgJSONLD)}
			</script>
			<meta property="og:locale" content={siteConfig.ogLanguage}/>
			<meta property="og:site_name" content={siteConfig.ogSiteName}/>
			<meta property="og:url" content={postSEO ? postURL : blogURL}/>
			{postSEO ? <meta property="og:type" content="article"/> : null}
			<meta property="og:title" content={title}/>
			<meta property="og:description" content={description}/>
			<meta property="og:image" content={image}/>
			<meta
				property="fb:app_id"
				content={siteConfig.siteFBAppID ? siteConfig.siteFBAppID : ''}
			/>
		</Helmet>
	)
}

export default SEO
