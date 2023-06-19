export default function deleteNameEditFromSpritesheet(spritesheet, index) {
	if (index < 0) return
	spritesheet.nameEdits.splice(index, 1)
}
