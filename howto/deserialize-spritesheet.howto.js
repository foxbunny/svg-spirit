export default function deserializeSpritesheet(data) {
	return {
		icons: Object.fromEntries(data.icons
			.map(svg => {
					let $symbol = new DOMParser().parseFromString(svg, 'image/svg+xml')
						.querySelector('symbol')
					return [$symbol.id, $symbol]
				},
			),
		),
		alases: data.aliases,
		svg: null,
		url: '',
	}
}
