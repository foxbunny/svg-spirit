import generateSprite from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import replaceColorInSpritesheet from '../howto/replace-color-in-spritesheet.howto.js'
import Events from '../data/events.js'

let context

export default function editColor(appContext) {
  context = appContext
  $colors.addEventListener('change', ev => {
		if (!ev.target.matches('[name=value]')) return
		let prevValue = ev.target.defaultValue
		let newValue = ev.target.value
		ev.target.defaultValue = newValue
		updateColors(prevValue, newValue)
	})
	makeUndoable(context, 'colorEdited')
}

let $colors = document.getElementById('colors')

function updateColors(prevValue, newValue) {
	replaceColorInSpritesheet(context.spritesheet, prevValue, newValue)
	generateSprite(context.spritesheet)
	context.bus.send(Events.spritesheetUpdated)
	context.bus.send(Events.colorEdited, {prevValue, newValue})
}
