import Events from '../data/events.js'
import getSelectionCount from '../howto/get-selection-count.howto.js'

let context

export default function selectIcons(appContext) {
  context = appContext
	context.bus.on(Events.iconsAdded, toggleSelectButtons)
	context.bus.on(Events.iconsDeleted, toggleSelectButtons)
	context.bus.on(Events.resetState, toggleSelectButtons)
  $list.addEventListener('change', () => {
		toggleSelectButtons()
		context.bus.send(Events.selectionChanged)
	})
	$selectAll.addEventListener('click', selectAll)
	$deselectAll.addEventListener('click', deselectAll)
	toggleSelectButtons()
}

let $list = document.getElementById('spritesheet')
let $selectAll = document.getElementById('select-all')
let $deselectAll = document.getElementById('deselect-all')

function toggleSelectButtons() {
	let {noInputs, allChecked, noChecked} = getSelectionCount($list)
	$selectAll.disabled = noInputs || allChecked
	$deselectAll.disabled = noInputs || noChecked
}

function selectAll() {
	$list.querySelectorAll('input[type=checkbox]:not(:checked)')
		.forEach($input => $input.checked = true)
	toggleSelectButtons()
	context.bus.send(Events.selectionChanged)
}

function deselectAll() {
	$list.querySelectorAll('input[type=checkbox]:checked')
		.forEach($input => $input.checked = false)
	toggleSelectButtons()
	context.bus.send(Events.selectionChanged)
}
