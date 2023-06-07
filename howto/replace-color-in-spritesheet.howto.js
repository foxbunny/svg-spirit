import { COLOR_ATTRIBUTES } from '../data/constants.js'

export default function replaceColorInSpritesheet(spritesheet, deletedColor, replacement) {
	COLOR_ATTRIBUTES.forEach(name => {
		spritesheet.svg.querySelectorAll(`[${name}="${deletedColor}"]`)
			.forEach($el => $el.setAttribute(name, replacement))
	})
}
