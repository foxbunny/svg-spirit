import deserializeSpritesheet from '../howto/deserialize-spritesheet.howto.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import serializeSpritesheet from '../howto/serialize-spritesheet.howto.js'
import Events from '../data/events.js'

let context

export default function undoAndRedo(appContext) {
	context = appContext
	context.bus.on(Events.registerUndoableEvent, addUndoableEvent)
	$undoTrigger.addEventListener('click', undo)
	$redoTrigger.addEventListener('click', redo)
	updateUndoRedoButtons()
}

let $undoTrigger = document.getElementById('undo')
let $redoTrigger = document.getElementById('redo')

function addUndoableEvent(eventType) {
	context.bus.on(eventType, addToUndoStack)
}

function addToUndoStack() {
	context.undo.stack.length = context.undo.index + 1
	context.undo.stack.push(serializeSpritesheet(context.spritesheet))
	context.undo.index++
	updateUndoRedoButtons()
}

function undo() {
	context.undo.index--
	applyDataAtCurrentIndex()
}

function redo() {
	context.undo.index++
	applyDataAtCurrentIndex()
}

function applyDataAtCurrentIndex() {
	let data = context.undo.stack[context.undo.index]
	Object.assign(context.spritesheet, deserializeSpritesheet(data))
	generateSpritesheetSVG(context.spritesheet)
	updateUndoRedoButtons()
	context.bus.send(Events.resetState)
}

function updateUndoRedoButtons() {
	$undoTrigger.disabled = context.undo.index <= 0
	$redoTrigger.disabled = context.undo.index >= context.undo.stack.length - 1
}
