export default function addIconToSpritesheet(spritesheet, icon) {
	let id = fileNameToId(icon.name)
	icon.symbol.id = id
	spritesheet.icons[id] = icon.symbol
}

function fileNameToId(name) {
	return name.split('.')[0]
		.replace(/^[^a-z]/, '-')
		.replace(/[^\w-]/g, '-')
}
