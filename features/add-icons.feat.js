import getSvgFromFiles from '../howto/get-svg-from-files.howto.js'
import extractSymbolFromSvg from '../howto/extract-symbol-from-svg.howto.js'
import addIconToSpritesheet from '../howto/add-icon-to-spritesheet.howto.js'
import generateSprite from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'
import Events from '../data/events.js'

let context

export default function addIcons(appContext) {
	context = appContext
	$input.addEventListener('change', addIconsFromFile)
	makeUndoable(context, 'iconsAdded')
}

let $trigger = document.getElementById('add-icon')
let $input = $trigger.querySelector('input[type=file]')

function addIconsFromFile() {
	let files = Array.from($input.files)
	$input.value = ''
	getSvgFromFiles(files)
		.then(sourceFiles => {
			let icons = sourceFiles
				.map(({name, svg}) => {
					try {
						return {name, symbol: extractSymbolFromSvg(svg)}
					} catch (e) {
						alert(`Cannot extract icon ${name}. Will skip it.`)
					}
				})
				.filter($icon => $icon != null)
			icons.forEach(icon => addIconToSpritesheet(context.spritesheet, icon))
			generateSprite(context.spritesheet)
			context.bus.send(Events.spritesheetUpdated)
			context.bus.send(Events.iconsAdded)
		})
}
