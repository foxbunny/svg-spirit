import Events from '../data/events.js'

let context

export default function seeIconList(appContext) {
  context = appContext
  context.bus.on(Events.spritesheetUpdated, updateSpritesheet)
  context.bus.on(Events.resetState, updateSpritesheet)
}

let $spritesheet = document.getElementById('spritesheet')

function updateSpritesheet() {
  let iconNames = Object.keys(context.spritesheet.icons)
  let $$icons = document.createDocumentFragment()
  iconNames.forEach(name => {
    let id = 'sprite-' + name
    let $icon = context.views.getOrCreateById('sprite', id)
    setCustomVariables($icon.querySelector('svg'), context.spritesheet.aliases)
    $icon.querySelector('use').setAttribute('href', `${context.spritesheet.url}#${name}`)
    $icon.querySelector('input').value = name
    $icon.querySelector('span').textContent = name
    $$icons.append($icon)
  })
  $spritesheet.replaceChildren($$icons)
}

function setCustomVariables($svg, aliases) {
  Object.entries(aliases)
    .forEach(([value, alias]) => $svg.style.setProperty(`--${alias}`, value))
}
