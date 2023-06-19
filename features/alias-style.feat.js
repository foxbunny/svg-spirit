import Events from '../data/events.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import { setStyleAlias } from '../howto/set-style-alias.howto.js'
import validateField from '../howto/validate-field.howto.js'

let context
let DEBOUNCE_DELAY = 500
let ALIAS_RE = /[a-z][\w-]+/i

export default function aliasStyle(appContext) {
	context = appContext
	document.body.addEventListener('input', ev => {
		if (!ev.target.matches('[name=alias]')) return
		clearTimeout(ev.target[debounce])
		ev.target[debounce] = setTimeout(() => {
			if (validateAlias(ev.target))
				updateAlias(ev.target.dataset.value, ev.target.value)
		}, DEBOUNCE_DELAY)
	})
	makeUndoable(context, Events.aliasChanged)
}

let debounce = Symbol('debounce')

function validateAlias($field) {
	return validateField(
		alias => ALIAS_RE.test(alias),
		() => 'Alias name must start with a letter, and contain only letters, numbers, underscore and dashes.',
		$field,
	)
}

function updateAlias(value, alias) {
	setStyleAlias(context.spritesheet, value, alias)
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.spritesheetUpdated)
	context.bus.send(Events.aliasChanged)
}
