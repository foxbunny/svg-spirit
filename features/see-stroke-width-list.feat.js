import getAllStrokeWidths from '../howto/get-all-stroke-widths.howto.js'
import Events from '../data/events.js'
import _SeeStyleList from './_see-style-list.template.js'

export default function seeStrokeWidthList(appContext) {
  _SeeStyleList(appContext, {
    listSelector: 'stroke-widths',
    getAllValues: getAllStrokeWidths,
    toId: width => 'stroke-width-' + width.replace(/[^\w]/g, ''),
    populateListItem: populateStrokeWidth,
    itemTemplate: 'stroke-width',
    deletionEvent: Events.strokeWidthDeleted,
    editEvent: Events.strokeWidthEdited,
  })
}

function populateStrokeWidth($strokeWidth, width) {
  Object.assign($strokeWidth.querySelector('input'), {
    value: width,
    defaultValue: width,
  })
  $strokeWidth.querySelector('button').dataset.value = width
}
