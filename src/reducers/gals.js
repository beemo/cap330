import * as actions from '../actions/index';
import * as modalTexts from '../modalText.js'
import _ from 'lodash'
const cl = ('console.log')
const initialState = {currentIndex: null, gals: [], layoutSlice: [], thumbIndex: 0, currentContent: null, stats: {wikiless: 0},
const reducer = (state=initialState, action) => {
  if (action.type === actions.UPDATE_LAYOUT_SLICE) {
    const galState = Object.assign({}, state, {layoutSlice: action.layoutSlice, currentContent: action.layoutSlice[0] });
    return galState
  }
  else if (action.type === actions.UPDATE_FULL_GALS) {
    const galState = Object.assign({}, state, {gals: action.gals});
    return galState
  }
  else if (action.type === actions.UPDATE_CURRENT_INDEX) {
    const galState = Object.assign({}, state, {currentIndex: action.currentIndex})
    return galState
  }
else if (action.type === actions.UPDATE_CURRENT_THUMBINDEX) {
  let c = state.layoutSlice[action.thumbIndex]
  const galState = Object.assign({}, state, {thumbIndex: action.thumbIndex, currentContent: c})
  return galState
}
else if (action.type === actions.UPDATE_STATS) {
  const galState =  Object.assign({}, state, {stats: action.stats})
  return galState
}
else if (action.type === actions.TOGGLE_STATS) {
  const galState = Object.assign({}, state, {statsBoolean: action.statsBoolean})
  return galState
}
else if (action.type === actions.SHOW_MODAL) {
  let blah = action.modalChoice
  const galState = Object.assign({}, state, {modalChoice: action.modalChoice}, {modalContent: modalTexts[blah]});
  return galState
}
else if (action.type === actions.SHOW_FULL_WIKI) {
  const galState =  _.set(state, 'fullWikiContent', action.fullWikiContent)
  return galState
}
else if (action.type === actions.SHOW_FULL_WIKI_ERROR) {
  const galState = Object.assign({}, state, {fullWikiError: action.fullWikiError});
  return galState
}
else if (action.type === actions.UPDATE_CURRENT_CONTENT) {
  const oldObj = _.cloneDeep(state.layoutSlice[action.idx])
  const newKey = action.key
  const newContent = action.newContent
  const newPair = _.set({}, newKey, newContent)
  const newObj =  Object.assign({}, oldObj, newPair)
  const stateLayOutSlice = state.layoutSlice
  const before = (action.idx == 0) ? null : _.take(stateLayOutSlice, action.idx)
  const after = (action.idx == 7) ? null : _.takeRight(stateLayOutSlice, (8 - (action.idx + 1)))
  if (before && after) {
    const newLayoutSlice = [...before, newObj, ...after];
    const galState =  Object.assign({}, state, {layoutSlice: newLayoutSlice, fullWikiContent: action.newContent} )
    return galState
  } else if (!before) {
    const newLayoutSlice = [newObj, ...after];
    const galState =  Object.assign({}, state, {layoutSlice: newLayoutSlice, fullWikiContent: action.newContent} )
    return galState
  } else if (!after) {
    const newLayoutSlice = [...before, newObj];
    const galState =  Object.assign({}, state, {layoutSlice: newLayoutSlice, fullWikiContent: action.newContent} )
    return galState
  } else {
    return state
  }
}
else if (action.type === actions.CLEAR_FULL_WIKI) {
  const galState = Object.assign({}, state, {fullWikiContent: null});
  return galState
}
else {
  return state
}
  };
  export default reducer;
