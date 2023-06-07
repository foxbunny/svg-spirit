import Events from '../data/events.js'

let context

export default function selectIcons(appContext) {
  context = appContext
	context.bus.on(Events.iconsAdded, toggleSelectButtons)
	context.bus.on(Events.resetState, toggleSelectButtons)
  $list.addEventListener('change', toggleSelectButtons)
	$selectAll.addEventListener('click', selectAll)
	$deselectAll.addEventListener('click', deselectAll)
	toggleSelectButtons()
}

let $list = document.getElementById('spritesheet')
let $selectAll = document.getElementById('select-all')
let $deselectAll = document.getElementById('deselect-all')

function toggleSelectButtons() {
	let nInputs = $list.querySelectorAll('input[type=checkbox]').length
	let nChecked = $list.querySelectorAll('input:checked').length
	$selectAll.disabled = !nInputs || nChecked == nInputs
	$deselectAll.disabled = !nInputs || !nChecked
}

function selectAll() {
	$list.querySelectorAll('input[type=checkbox]:not(:checked)')
		.forEach($input => $input.checked = true)
	toggleSelectButtons()
}

function deselectAll() {
	$list.querySelectorAll('input[type=checkbox]:checked')
		.forEach($input => $input.checked = false)
	toggleSelectButtons()
}
