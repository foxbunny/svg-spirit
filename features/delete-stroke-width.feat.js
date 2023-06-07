import getAllStrokeWidths from '../howto/get-all-stroke-widths.howto.js'
import replaceStrokeWidthInSpritesheet from '../howto/replace-stroke-width-in-spritesheet.howto.js'
import _DeleteStyleValue from './_delete-style-value.template.js'
import Events from '../data/events.js'

export default function deleteStrokeWidth(appContext) {
  _DeleteStyleValue(appContext, {
    listSelector: 'stroke-widths',
    dialogSelector: 'delete-stroke-width',
    deletionEvent: Events.strokeWidthDeleted,
    deleteOptionalLabel: 'delete stroke width',
    templateName: 'replacement-stroke-width',
    toId: width => 'replacement-stroke-width-' + width.replace(/[^\w]/g, '-'),
    getAllValues: getAllStrokeWidths,
    replaceValue: replaceStrokeWidthInSpritesheet,
    populateOption: populateReplacementOption,
  })
}

function populateReplacementOption($replacement, value, label = value) {
  $replacement.querySelector('input').value = value
  $replacement.querySelector('label > span').textContent = label
  return $replacement
}
