import Events from '../data/events.js'
import applyNameEdits from '../howto/apply-name-edits.howto.js'

let context

export default function seeIconList(appContext) {
  context = appContext
  context.bus.on(Events.spritesheetUpdated, updateSpritesheet)
  context.bus.on(Events.resetState, updateSpritesheet)
}

let $spritesheet = document.getElementById('spritesheet')

function updateSpritesheet() {
  let iconNames = Object.keys(context.spritesheet.icons)
  let editName = applyNameEdits(context.spritesheet.nameEdits)
  let $$icons = document.createDocumentFragment()
  iconNames.forEach(name => {
    let editedName = editName(name)
    let id = 'sprite-' + name
    let inputId = 'select-' + name
    let $icon = context.views.getOrCreateById('sprite', id)
    setCustomVariables($icon.querySelector('svg'), context.spritesheet.aliases)
    $icon.querySelector('use').setAttribute('href', `${context.spritesheet.url}#${editedName}`)
    Object.assign($icon.querySelector('input'), {
      value: name,
      id: inputId,
    })
    $icon.querySelector('label').htmlFor = inputId
    $icon.querySelector('span').textContent = editedName
    $$icons.append($icon)
  })
  $spritesheet.replaceChildren($$icons)
}

function setCustomVariables($svg, aliases) {
  Object.entries(aliases)
    .forEach(([value, alias]) => $svg.style.setProperty(`--${alias}`, value))
}
