export default function setNameEditTypeInSpritesheet(spritesheet, index, newEditType) {
	let edit = spritesheet.nameEdits[index]
	if (!edit) return
	edit.type = newEditType
}
