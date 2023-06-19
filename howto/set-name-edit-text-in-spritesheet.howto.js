export default function setNameEditTextInSpritesheet(spritesheet, index, newEditText) {
	let edit = spritesheet.nameEdits[index]
	if (!edit) return
	edit.text = newEditText
}
