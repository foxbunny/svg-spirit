import { COLOR_ATTRIBUTES } from '../data/constants.js'

export default function getAllColors(spritesheet) {
	let colors = new Set()
	COLOR_ATTRIBUTES.forEach(name => {
		Object.values(spritesheet.icons)
			.forEach($symbol => {
				$symbol
					.querySelectorAll(`[${name}]`)
					.forEach($el => {
						colors.add($el.getAttribute(name))
					})
			})
	})
	return Array.from(colors)
}
