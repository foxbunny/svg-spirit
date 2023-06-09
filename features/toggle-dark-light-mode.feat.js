let context

let COLOR_MODE_TRANSITIONS = {
	light: 'dark',
	dark: 'light',
}
let LOCAL_STORAGE_KEY = 'colorMode'

export default function toggleDarkLightMode(appContext) {
	context = appContext
	document.body.dataset.mode = getDefaultColorMode()
	$trigger.addEventListener('click', () => {
		toggleColorMode()
	})
	updateLabel()
}

let $trigger = document.getElementById('dark-light')
let $label = $trigger.querySelector('span')

function getDefaultColorMode() {
	return localStorage[LOCAL_STORAGE_KEY] ?? (
		window.matchMedia?.('prefers-color-scheme: dark').matches
			? 'dark'
			: 'light'
	)
}

function toggleColorMode() {
	let nextMode = COLOR_MODE_TRANSITIONS[document.body.dataset.mode]
	document.body.dataset.mode = localStorage[LOCAL_STORAGE_KEY] = nextMode
	updateLabel()
}

function updateLabel() {
	let nextMode = COLOR_MODE_TRANSITIONS[document.body.dataset.mode]
	let label = nextMode[0].toUpperCase() + nextMode.slice(1)
	$label.textContent = label + ' mode'
}
