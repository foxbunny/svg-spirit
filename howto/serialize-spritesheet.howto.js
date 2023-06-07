export default function serializeSpritesheet(spritesheet) {
	return {
		icons: Object.values(spritesheet.icons)
			.map($symbol => $symbol.outerHTML)
	}
}
