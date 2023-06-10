let context

export default function toggleBetweenListAndTileView(appContext) {
	context = appContext
	$listModeToggle.addEventListener('click', toggleListMode)
	$tileModeToggle.addEventListener('click', toggleTileMode)
	updateDisplayMode()
}

let $listModeToggle = document.getElementById('list-mode')
let $tileModeToggle = document.getElementById('tile-mode')
let $list = document.getElementById('spritesheet')

function toggleListMode() {
	localStorage.displayMode = 'list'
	updateDisplayMode()
}

function toggleTileMode() {
	localStorage.displayMode = 'tiles'
	updateDisplayMode()
}

function updateDisplayMode() {
	let mode = localStorage.displayMode || $list.dataset.layout
	$listModeToggle.disabled = mode == 'list'
	$tileModeToggle.disabled = mode == 'tiles'
	$list.dataset.layout = mode
}
