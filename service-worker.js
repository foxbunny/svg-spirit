import { manifest, version } from '@parcel/service-worker'

let CACHE_ID = 'svg-spirit-' + version

function invalidateStaleCaches() {
	return caches.keys()
		.then(keys => Promise.all(
			keys.map(key => key != CACHE_ID && caches.delete(key))),
		)
}

function populateAssetCache() {
	return caches.open(CACHE_ID)
		.then(cache => cache.addAll([
			new Request('/', {cache: 'reload'}),
			...manifest,
		]))
}

function proxyAssetFetch(req) {
	return caches.match(req, {ignoreSearch: true})
		.then(res => res || fetch(req))
}

self.oninstall = ev => ev.waitUntil(populateAssetCache())
self.onactivate = ev => ev.waitUntil(invalidateStaleCaches())
self.onfetch = ev => ev.respondWith(proxyAssetFetch(ev.request))
