import Events from '../data/events.js'

let context

export default function downloadSpritesheet(appContext) {
  context = appContext
  context.bus.on(Events.spritesheetUpdated, updateURL)
	context.bus.on(Events.resetState, updateURL)
	updateURL()
}

let $download = document.getElementById('sprite-url')

function updateURL() {
	let { url } = context.spritesheet
	$download.href = url
	$download.toggleAttribute('href', url)
}
