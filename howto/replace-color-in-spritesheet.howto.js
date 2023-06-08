import { COLOR_ATTRIBUTES } from '../data/constants.js'

export default function replaceColorInSpritesheet(spritesheet, deletedColor, replacement) {
	if (spritesheet.aliases.hasOwnProperty(deletedColor)) {
		let name = spritesheet.aliases[deletedColor]
		delete spritesheet.aliases[deletedColor]
		if (replacement != 'none') spritesheet.aliases[replacement] = name
	}
	COLOR_ATTRIBUTES.forEach(name => {
		Object.values(spritesheet.icons)
			.forEach($symbol => {
				$symbol
					.querySelectorAll(`[${name}="${deletedColor}"]`)
					.forEach($el => $el.setAttribute(name, replacement))
			})
	})
}
