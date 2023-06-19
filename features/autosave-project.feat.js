import Events from '../data/events.js'
import deserializeSpritesheet from '../howto/deserialize-spritesheet.howto.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'

let context
let STORAGE_KEY = 'currentProject'

export default function autosaveProject(appContext) {
	context = appContext
	context.bus.on(Events.stateUpdated, autosave)
	requestIdleCallback(autoload)
}

function autosave() {
	let lastState = context.undo.stack[context.undo.stack.length - 1]
	localStorage[STORAGE_KEY] = JSON.stringify(lastState)
}

function autoload() {
	let data = JSON.parse(localStorage[STORAGE_KEY] ?? null)
	if (!data) return
	Object.assign(context.spritesheet, deserializeSpritesheet(data))
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.resetState)
}
