import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import setNameEditTextInSpritesheet from '../howto/set-name-edit-text-in-spritesheet.howto.js'
import setNameEditTypeInSpritesheet from '../howto/set-name-edit-type-in-spritesheet.howto.js'
import Events from '../data/events.js'

let context

export default function renameIcons(appContext) {
	context = appContext
	$list.addEventListener('change', ev => {
		if (!ev.target.matches('[name="edit-type"]')) return
		let $edit = ev.target.closest('.name-edit')
		updateEditType(findEditIndex($edit), ev.target.value)
	})
	$list.addEventListener('input', ev => {
		if (!ev.target.matches('[name="edit-text"]')) return
		let $edit = ev.target.closest('.name-edit')
		updateEditText(findEditIndex($edit), ev.target.value)
	})
	makeUndoable(context, Events.updatedNameEdit)
}

let $list = document.getElementById('name-edits')

function updateEditType(index, newEditType) {
	setNameEditTypeInSpritesheet(context.spritesheet, index, newEditType)
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.updatedNameEdit)
	context.bus.send(Events.spritesheetUpdated)
}

function updateEditText(editType, editText, newEditText) {
	setNameEditTextInSpritesheet(context.spritesheet, editType, editText, newEditText)
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.updatedNameEdit)
	context.bus.send(Events.spritesheetUpdated)
}

function findEditIndex($edit) {
	return [...$list.children].findIndex($el => $el == $edit)
}
