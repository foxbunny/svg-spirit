import deleteIconFromSpritesheet from '../howto/delete-icon-from-spritesheet.howto.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import Events from '../data/events.js'

let context

export default function deleteIcons(appContext) {
	context = appContext
	$trigger.addEventListener('click', deleteSelectedIcons)
	context.bus.on(Events.selectionChanged, toggleDelete)
	context.bus.on(Events.iconsDeleted, toggleDelete)
	toggleDelete()
	makeUndoable(context, Events.iconsDeleted)
}

let $trigger = document.getElementById('delete-selection')
let $list = document.getElementById('spritesheet')

function toggleDelete() {
	$trigger.disabled = !Object.keys(context.spritesheet.icons).length || !$list.querySelectorAll('input:checked').length
}

function deleteSelectedIcons() {
	let icons = []
	$list.querySelectorAll('input:checked')
		.forEach($input => icons.push($input.value))
	icons.forEach(iconName => deleteIconFromSpritesheet(context.spritesheet, iconName))
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.spritesheetUpdated)
	context.bus.send(Events.iconsDeleted)
}
