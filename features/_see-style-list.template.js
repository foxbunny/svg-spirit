import Events from '../data/events.js'

export default function _SeeStyleList(context, options) {
	let $list = document.getElementById(options.listSelector)

	context.bus.on(Events.iconsAdded, updateList)
	context.bus.on(Events.resetState, updateList)
	context.bus.on(options.deletionEvent, deleteListItem)
	context.bus.on(options.editEvent, updateListItem)

	function updateList() {
		let colors = options.getAllValues(context.spritesheet)
		let $$ = document.createDocumentFragment()
		colors
			.filter(value => value != 'none')
			.sort()
			.forEach(value => {
				let id = options.toId(value)
				let $item = context.views.getOrCreateById(options.itemTemplate, id)
				options.populateListItem($item, value)
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
