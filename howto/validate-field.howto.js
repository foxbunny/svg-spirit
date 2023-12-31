export default function validateField(validate, getMessage, $field) {
	if ($field.value == '' || validate($field.value)) {
		$field.setCustomValidity('')
		return true
	} else {
		$field.setCustomValidity(getMessage($field.value))
		$field.reportValidity()
		return false
	}
}
