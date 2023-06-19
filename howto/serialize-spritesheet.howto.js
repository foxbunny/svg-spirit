export default function serializeSpritesheet(spritesheet) {
	let serializer = new XMLSerializer()
	return {
		icons: Object.values(spritesheet.icons)
			.map($symbol => serializer.serializeToString($symbol)),
		aliases: spritesheet.aliases,
		nameEdits: spritesheet.nameEdits,
	}
}
