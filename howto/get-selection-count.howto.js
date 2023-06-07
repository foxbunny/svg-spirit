export default function getSelectionCount($list) {
	let nInputs = $list.querySelectorAll('input[type=checkbox]').length
	let nChecked = $list.querySelectorAll('input:checked').length
	return {
		total: nInputs,
		checked: nChecked,
		noInputs: !nInputs,
		allChecked: nInputs == nChecked,
		noChecked: !nChecked,
	}
}
