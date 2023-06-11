let context

export default function toggleOpenSettings(appContext) {
	context = appContext
	$toggle.addEventListener('click', () => {
		document.body.toggleAttribute('data-settings-open')
	})
}

let $toggle = document.getElementById('settings')
