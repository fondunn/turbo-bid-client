export const ROOT_URI_CONFIG = {
	home: {
		title: 'Home',
		uri: '/',
	},
	discover: {
		title: 'Discover',
		uri: '/discover',
	},
	about: {
		title: 'About',
		uri: '/about',
	},
}

export const HOME_URI = {
	title: ROOT_URI_CONFIG.home.title,
	uri: ROOT_URI_CONFIG.home.uri,
}

export const DISCOVER_URI = {
	title: ROOT_URI_CONFIG.discover.title,
	uri: ROOT_URI_CONFIG.discover.uri,
}

export const ABOUT_URI = {
	title: ROOT_URI_CONFIG.about.title,
	uri: ROOT_URI_CONFIG.about.uri,
}

export const HEADER_URIS = [
	{
		title: HOME_URI.title,
		uri: HOME_URI.uri,
	},
	{
		title: DISCOVER_URI.title,
		uri: DISCOVER_URI.uri,
	},
]
