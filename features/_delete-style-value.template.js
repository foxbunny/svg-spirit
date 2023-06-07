import Events from '../data/events.js'
import generateSprite from '../howto/generate-spritesheet-svg.howto.js'
import makeUndoable from '../howto/make-undoable.howto.js'

export default function _DeleteStyleValue(context, options) {
	let $list = document.getElementById(options.listSelector)
	let $dialog = document.getElementById(options.dialogSelector)
	let $form = $dialog.querySelector('form')
	let $deletedValue = $form.querySelector('input[type=hidden]')
	let $cancelButton = $form.querySelector('button[type=button]')
	let $submitButton = $form.querySelector('button:not([type=button])')
	let $replacementList = $dialog.querySelector('ul')

	$list.addEventListener('click', ev => {
		let realTarget = ev.target.closest('button')
		if (realTarget && ev.currentTarget.contains(realTarget) && !realTarget.disabled)
			openDeleteOrReplaceDialog(realTarget.dataset.value)
	})
	$replacementList.addEventListener('change', () => {
		updateSubmitButton(new FormData($form).get('replacement') || 'none')
	})
	$cancelButton.addEventListener('click', () => {
		$dialog.close()
	})
	$form.addEventListener('submit', ev => {
		ev.preventDefault()
		let formData = new FormData($form)
		let replacement = formData.get('replacement') || 'none'
		let deletedValue = formData.get('deleted')
		replaceValue(deletedValue, replacement)
		$dialog.close()
	})
	makeUndoable(context, options.deletionEvent)

	function openDeleteOrReplaceDialog(deletedValue) {
		$deletedValue.value = deletedValue
		updateReplacementList(deletedValue)
		openDialog()
	}

	function openDialog() {
		$form.reset()
		$dialog.showModal()
	}

	function updateReplacementList(valueBeingDeleted) {
		let $$ = document.createDocumentFragment()
		options.getAllValues(context.spritesheet)
			.filter(value => value != valueBeingDeleted && value != 'none')
			.sort()
			.forEach(value => {
				let id = options.toId(value)
				$$.append(options.populateOption(
					context.views.getOrCreateById(options.templateName, id),
					value,
				))
			})
		$$.append(options.populateOption(
			context.views.getOrCreateById(options.templateName),
			'none',
			options.deleteOptionLabel,
		))
		$replacementList.replaceChildren($$)
	}

	function updateSubmitButton(selectedReplacement) {
		$submitButton.textContent = selectedReplacement == 'none' ? 'Delete' : 'Replace'
	}

	function replaceValue(deletedValue, replacement) {
		options.replaceValue(context.spritesheet, deletedValue, replacement)
		generateSprite(context.spritesheet)
		context.bus.send(Events.spritesheetUpdated)
		context.bus.send(options.deletionEvent, deletedValue)
	}
}
