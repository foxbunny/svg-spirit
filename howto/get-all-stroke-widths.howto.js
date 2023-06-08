import { STROKE_WIDTH_ATTRIBUTES } from '../data/constants.js'

export default function getAllStrokeWidths(spritesheet) {
	let strokeWidths = new Set()
	STROKE_WIDTH_ATTRIBUTES.forEach(name => {
		Object.values(spritesheet.icons).forEach($symbol => {
			$symbol.querySelectorAll(`[${name}]`)
				.forEach($el => {
					strokeWidths.add($el.getAttribute(name))
				})
		})
	})
	return Array.from(strokeWidths)
}
