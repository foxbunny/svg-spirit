import { COLOR_ATTRIBUTES, STROKE_WIDTH_ATTRIBUTES } from '../data/constants.js'

let XML_PRELUDE = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'

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
			'image/svg+xml',
		)
		.querySelector('svg')
	let $defs = $svg.querySelector('defs')
	$$icons.forEach($symbol => $defs.append($symbol.cloneNode(true)))
	applyAliases($svg, spritesheet.aliases)
	spritesheet.svg = $svg
	spritesheet.url = URL.createObjectURL(new Blob([XML_PRELUDE, $svg.outerHTML], {type: 'image/svg+xml'}))
}

function applyAliases($svg, aliases) {
	let aliasEntries = Object.entries(aliases)
	COLOR_ATTRIBUTES.concat(STROKE_WIDTH_ATTRIBUTES)
		.forEach(name => {
			aliasEntries
				.forEach(([value, alias]) => {
					$svg
						.querySelectorAll(`[${name}="${value}"]`)
						.forEach($el => {
							$el.setAttribute(name, `var(--${alias})`)
						})
				})
		})
}
