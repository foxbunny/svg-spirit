import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import replaceStrokeWidthInSpritesheet from '../howto/replace-stroke-width-in-spritesheet.howto.js'
import validateField from '../howto/validate-field.howto.js'
import Events from '../data/events.js'

let context

let VALID_STROKE_WIDTH = /(\d+(?:\.\d+)?(?:px|%)|none)/
let DEBOUNCE_DELAY = 500

export default function editStrokeWidth(appContext) {
	context = appContext
	$list.addEventListener('input', ev => {
		if (!ev.target.matches('[name=value]')) return
		clearTimeout(ev.target[debounce])
		ev.target[debounce] = setTimeout(() => {
			let prevValue = ev.target.defaultValue
			let newValue = ev.target.value
			if (validateStrokeWidth(ev.target)) {
				ev.target.defaultValue = newValue
				replaceStrokeWidth(prevValue, newValue)
			}
		}, DEBOUNCE_DELAY)
	})
	makeUndoable(context, Events.strokeWidthEdited)
}

let debounce = Symbol('debounce')
let $list = document.getElementById('stroke-widths')

function validateStrokeWidth($field) {
	return validateField(
		v => VALID_STROKE_WIDTH.test(v),
		() => 'Please use a valid length like 2px, 0.3px, 5%',
		$field,
	)
}

function replaceStrokeWidth(prevValue, newValue) {
	replaceStrokeWidthInSpritesheet(context.spritesheet, prevValue, newValue)
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.strokeWidthEdited, {prevValue, newValue})
	context.bus.send(Events.spritesheetUpdated)
}
