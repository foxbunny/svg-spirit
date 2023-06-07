import { STROKE_WIDTH_ATTRIBUTES } from '../data/constants.js'

export default function replaceStrokeWidthInSpritesheet(spritesheet, deletedStrokeWidth, replacement) {
	STROKE_WIDTH_ATTRIBUTES.forEach(name => {
		spritesheet.svg
			.querySelectorAll(`[${name}="${deletedStrokeWidth}"]`)
			.forEach($el => {
				$el.setAttribute(name, replacement)
			})
	})
}
