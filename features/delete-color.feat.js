import getAllColors from '../howto/get-all-colors.howto.js'
import replaceColorInSpritesheet from '../howto/replace-color-in-spritesheet.howto.js'
import Events from '../data/events.js'
import _DeleteStyleValue from './_delete-style-value.template.js'


export default function deleteColor(appContext) {
	_DeleteStyleValue(appContext, {
		listSelector: 'colors',
		dialogSelector: 'delete-color',
		deletionEvent: Events.colorDeleted,
		deleteOptionLabel: 'delete color',
		templateName: 'replacement-color',
		toId: color => 'replacement-color-' + color.slice(1),
		getAllValues: getAllColors,
		replaceValue: replaceColorInSpritesheet,
		populateOption: populateReplacementOption,
	})
}

function populateReplacementOption($replacement, value, label = value) {
	$replacement.style.setProperty('--color', value)
	$replacement.querySelector('input').value = value
	$replacement.querySelector('label > span').textContent = label
	return $replacement
}
