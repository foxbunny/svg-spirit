let XML_PRELUDE = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'

export default function generateSpritesheetSVG(spritesheet) {
	if (spritesheet.url) {
		URL.revokeObjectURL(spritesheet.url)
		spritesheet.url = ''
	}
	spritesheet.svg = null
	let $$icons = Object.values(spritesheet.icons)
	if (!$$icons.length) return
	let $svg = new DOMParser()
		.parseFromString(
			`<svg xmlns="http://www.w3.org/2000/svg" fill="none"><defs></defs></svg>`,
			'image/svg+xml'
		)
		.querySelector('svg')
	let $defs = $svg.querySelector('defs')
	$$icons.forEach($symbol => $defs.append($symbol))
	spritesheet.svg = $svg
	spritesheet.url = URL.createObjectURL(new Blob([XML_PRELUDE, $svg.outerHTML], {type: 'image/svg+xml'}))
}
