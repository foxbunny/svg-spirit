import getAllColors from '../howto/get-all-colors.howto.js'
import Events from '../data/events.js'
import _SeeStyleList from './_see-style-list.template.js'

export default function seeColorList(appContext) {
	_SeeStyleList(appContext, {
		listSelector: 'colors',
		getAllValues: getAllColors,
		toId: color => 'color-' + color.slice(1),
		populateListItem: populateColorListItem,
		itemTemplate: 'color',
		deletionEvent: Events.colorDeleted,
		editEvent: Events.colorEdited,
	})
}

function populateColorListItem($color, color) {
	Object.assign($color.querySelector('input'), {
		value: color,
		defaultValue: color,
	})
	$color.querySelector(':scope > span').textContent = color
	$color.querySelector('button').dataset.value = color
}
