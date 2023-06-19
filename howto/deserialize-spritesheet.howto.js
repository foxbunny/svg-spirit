export default function deserializeSpritesheet(data) {
	let {icons = [], aliases = {}, nameEdits = []} = data
	return {
		icons: Object.fromEntries(icons.map(svg => {
				let $symbol = new DOMParser().parseFromString(svg, 'image/svg+xml')
					.querySelector('symbol')
				return [$symbol.id, $symbol]
			},
		)),
		aliases,
		nameEdits,
		svg: null,
		url: '',
	}
}
