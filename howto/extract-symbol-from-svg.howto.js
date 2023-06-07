class ParseError extends Error {}

let RGB_RE = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/

export default function extractSymbolFromSvg(svgSource, options = {}) {
	let $svgDocument = new DOMParser().parseFromString(svgSource, 'image/svg+xml')
	if (isNotExtracted($svgDocument)) throw new ParseError()
	try {
		if (isSingleGroupSVG($svgDocument)) return extractSingleGroupSVG($svgDocument, options)
		else return extractGenericSVG($svgDocument, options)
	} catch (e) {
		console.error(`Error ${e} in ${svgSource}`, e)
		throw new ParseError()
	}
}

function isNotExtracted($svgDocument) {
	return $svgDocument.querySelector('svg') == null
}

function isSingleGroupSVG($svgDocument) {
	let $svg = $svgDocument.querySelector('svg')
	return $svg.children.length == 1 && $svg.children[0].matches('g')
}

function extractSingleGroupSVG($svgDocument) {
	let $group = $svgDocument.querySelector('svg > g')
	let $svg = $svgDocument.querySelector('svg')
	let $symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol')
	$symbol.innerHTML = $group.innerHTML
	commonFixes($svg, $symbol)
	return $symbol
}

function extractGenericSVG($svgDocument) {
	let $svg = $svgDocument.querySelector('svg')
	let $symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol')
	$symbol.innerHTML = $svg.innerHTML
	commonFixes($svg, $symbol)
	return $symbol
}

function commonFixes($svg, $symbol) {
	fixViewport($svg, $symbol)
	if ($svg.hasAttribute('style')) $symbol.setAttribute('style', $svg.getAttribute('style'))
	convertStyleToAttributes($symbol)
	$symbol.querySelectorAll('[style]').forEach(convertStyleToAttributes)
	stripTextNodes($symbol)
	stripNamespace($symbol)
}

function fixViewport($svg, $symbol) {
	if ($svg.hasAttribute('width') || $svg.hasAttribute('height')) {
		if (!$svg.hasAttribute('viewBox')) {
			let width = $svg.getAttribute('width') || $svg.getAttribute('height')
			let height = $svg.getAttribute('height') || $svg.getAttribute('width')
			let viewBox = `0 0 ${width} ${height}`
			$symbol.setAttribute('viewBox', viewBox)
		}
		else $symbol.setAttribute('viewBox', $svg.getAttribute('viewBox'))

		$svg.removeAttribute('width')
		$svg.removeAttribute('height')
	}
}

function convertStyleToAttributes($el) {
	for (let name of $el.style) {
		let value = $el.style.getPropertyValue(name)
		if (value.startsWith('url(')) continue
		if (name == 'stroke' && value == 'none') continue
		$el.setAttribute(name, normalizeValue(value))
	}
	$el.removeAttribute('style')
}

function stripTextNodes($symbol) {
	let iterator = document.createNodeIterator($symbol, NodeFilter.SHOW_TEXT)
	let text
	while (text = iterator.nextNode()) text.remove()
}

function stripNamespace($symbol) {
	let iterator = document.createNodeIterator($symbol, NodeFilter.SHOW_ELEMENT)
	let $el
	while ($el = iterator.nextNode()) $el.removeAttribute('xmlns')
}

function normalizeValue(value) {
	if (!RGB_RE.test(value)) return value
	let rgb = RGB_RE.exec(value).slice(1)
	return '#' + rgb.map(x => Number(x).toString(16).padStart(2, '0')).join('')
}
