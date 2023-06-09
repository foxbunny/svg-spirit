import Events from '../data/events.js'

export default function _SeeStyleList(context, options) {
	let $list = document.getElementById(options.listSelector)
	let $section = $list.closest('section')

	context.bus.on(Events.iconsAdded, updateList)
	context.bus.on(Events.iconsDeleted, updateList)
	context.bus.on(Events.resetState, updateList)
	context.bus.on(options.deletionEvent, deleteListItem)
	context.bus.on(options.editEvent, updateListItem)

	function updateList() {
		let allValues = options.getAllValues(context.spritesheet)
		$section.hidden = !allValues.length
		let { aliases } = context.spritesheet
		let $$ = document.createDocumentFragment()
		allValues
			.filter(value => value != 'none')
			.sort()
			.forEach(value => {
				let id = options.toId(value)
				let $item = context.views.getOrCreateById(options.itemTemplate, id)
				options.populateListItem($item, value)
				let $aliasInput = $item.querySelector('[name=alias]')
				$aliasInput.value = aliases[value] || ''
				$aliasInput.dataset.value = value
				$$.append($item)
			})
		$list.replaceChildren($$)
	}

	function deleteListItem(deletedValue) {
		let id = options.toId(deletedValue)
		document.getElementById(id)?.remove()
	}

	function updateListItem({ prevValue, newValue }) {
		let id = options.toId(prevValue)
		let $item = document.getElementById(id)
		if (!$item) return
		options.populateListItem($item, newValue)
	}
}
