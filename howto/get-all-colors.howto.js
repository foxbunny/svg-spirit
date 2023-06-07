import { COLOR_ATTRIBUTES } from '../data/constants.js'

export default function getAllColors(spritesheet) {
	let colors = new Set()
	COLOR_ATTRIBUTES.forEach(name => {
		spritesheet.svg?.querySelectorAll(`[${name}]`)
			.forEach($el => {
				colors.add($el.getAttribute(name))
			})
	})
	return Array.from(colors)
}
