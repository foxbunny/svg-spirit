import { STROKE_WIDTH_ATTRIBUTES } from '../data/constants.js'

export default function replaceStrokeWidthInSpritesheet(spritesheet, deletedStrokeWidth, replacement) {
	if (spritesheet.aliases.hasOwnProperty(deletedStrokeWidth)) {
		let name = spritesheet.aliases[deletedStrokeWidth]
		delete spritesheet.aliases[deletedStrokeWidth]
		if (replacement != 'none') spritesheet.aliases[replacement] = name
	}
	STROKE_WIDTH_ATTRIBUTES.forEach(name => {
		Object.values(spritesheet.icons)
			.forEach($symbol => {
				$symbol
					.querySelectorAll(`[${name}="${deletedStrokeWidth}"]`)
					.forEach($el => {
						$el.setAttribute(name, replacement)
					})
			})
	})
}
