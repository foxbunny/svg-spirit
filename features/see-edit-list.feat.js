import addBlankEditToSpritesheet from '../howto/add-blank-edit-to-spritesheet.howto.js'
import deleteNameEditFromSpritesheet from '../howto/delete-name-edit-from-spritesheet.howto.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import Events from '../data/events.js'

let context

export default function seeEditList(appContext) {
	context = appContext
	context.bus.on(Events.resetState, updateList)
	$trigger.addEventListener('click', addNameEdit)
	$list.addEventListener('click', ev => {
		let $realTarget = ev.target.closest('[value="delete edit"]')
		if (!$realTarget || !ev.currentTarget.contains($realTarget)) return
		deleteEdit($realTarget.closest('li'))
	})
	makeUndoable(context, Events.addedEdit)
	makeUndoable(context, Events.deletedNameEdit)
}

let $list = document.getElementById('name-edits')
let $trigger = document.getElementById('add-edit')

function updateList() {
	let $$ = document.createDocumentFragment()
	context.spritesheet.nameEdits.forEach(edit => {
		let $edit = createEdit()
		updateNameEdit($edit, edit)
		$$.append($edit)
	})
	$list.replaceChildren($$)
}

function addNameEdit() {
	addBlankEditToSpritesheet(context.spritesheet)
	let $edit = createEdit()
	$list.append($edit)
	context.bus.send(Events.addedEdit)
}

function deleteEdit($edit) {
	let index = [...$list.children].findIndex($el => $el == $edit)
	$edit.remove()
	deleteNameEditFromSpritesheet(context.spritesheet, index)
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.deletedNameEdit)
	context.bus.send(Events.spritesheetUpdated)
}

function createEdit() {
	let $edit = context.views.getOrCreateById('name-edit')
	let $editType = $edit.querySelector('[name="edit-type"]')
	let $editText = $edit.querySelector('[name="edit-text"]')
	$edit.elements = {
		editType: $editType,
		editText: $editText,
	}
	return $edit
}

function updateNameEdit($edit, edit) {
	$edit.elements.editType.value = edit.type
	$edit.elements.editText.value = edit.text
}
