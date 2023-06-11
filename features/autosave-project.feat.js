import Events from '../data/events.js'
import deserializeSpritesheet from '../howto/deserialize-spritesheet.howto.js'
import generateSpritesheetSVG from '../howto/generate-spritesheet-svg.howto.js'
import serializeSpritesheet from '../howto/serialize-spritesheet.howto.js'

let context
let STORAGE_KEY = 'currentProject'

export default function autosaveProject(appContext) {
	context = appContext
	context.bus.on(Events.stateUpdated, autosave)
	requestIdleCallback(autoload)
}

function autosave() {
	localStorage[STORAGE_KEY] = JSON.stringify(serializeSpritesheet(context.spritesheet))
}

function autoload() {
	let data = JSON.parse(localStorage[STORAGE_KEY] ?? null)
	if (!data) return
	Object.assign(context.spritesheet, deserializeSpritesheet(data))
	generateSpritesheetSVG(context.spritesheet)
	context.bus.send(Events.resetState)
}
