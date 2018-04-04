import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import wiki from 'wikijs';
import store from '../store';
require('dotenv').config()
let BBPromise = require("bluebird");
const cl = (console.log)

export function getGals(gals = null) {
   return function(dispatch) {
     // console.log('getGals gals:', gals)
     const request = axios({
       method: 'GET',
       url: 'http://138.197.206.10:3000/api/imgurGal'
     });
     return request
       .then(response => {
         return response.data
       })
       .then(
         response => {

           if (_.isNull(gals)) {
             dispatch(makeLayoutSlice((_.take(response, 16)), 'init'))
           } else {

             dispatch(updateStats(_.last(response).stats))
             dispatch(updateFullGals(response))
           }
         },
         err => console.log('getGals2 ', err)
     )
 }
};

export function makeLayoutSlice(fullGals, idx) {
 return function action(dispatch) {
   const thumbLimit = 8


   if (idx == 'init') {
     idx = 0
     let layoutSlice = _.slice(fullGals, idx, (idx + 8))
     dispatch(updateLayoutSlice(layoutSlice))
     dispatch(getGals(fullGals))
   } else {
     let layoutSlice = _.slice(fullGals, idx, (idx + 8))
     dispatch(updateLayoutSlice(layoutSlice))
   }
 }
}

export function getCurrentThumbIndexFromGaliD(id, layoutSlice) {
 return function(dispatch) {


   let thumbIdx = layoutSlice.map(function(g) { return g.id; }).indexOf(id)
   dispatch(showFullWikiError(null))
   dispatch(clearFullWiki())
   dispatch(updateCurrentThumbIndex(thumbIdx))

 }
};


export function getFullWikiContent(idx, topTag) {
 return function(dispatch) {

   wiki().page(topTag).then(page => page.html())
   .then(val => {
     let currentContentWikiTextWithRedirects = _.replace(val, new RegExp('href=\"/wiki/','g'), 'href=\"https://en.wikipedia.org/wiki/')
     let hrefWikiContent = _.replace(currentContentWikiTextWithRedirects, new RegExp('/w/','g'), 'https://en.wikipedia.org/w/')
     let target_blank = _.replace(currentContentWikiTextWithRedirects, new RegExp(/(title=")/g), 'target="_blank" title="')

     dispatch(updateCurrentContent(idx, 'wikiContent', target_blank))
   })
   .catch(err => {
     dispatch(showFullWikiError('Full Wikipedia Content could not be found.'))
   })
 }
}

export const UPDATE_FULL_GALS = 'UPDATE_FULL_GALS';
export const updateFullGals = (gals) => ({
 type: UPDATE_FULL_GALS,
 gals
});

export const UPDATE_STATS = 'UPDATE_STATS';
export const updateStats = (stats) => ({
 type: UPDATE_STATS,
 stats
});


export const UPDATE_LAYOUT_SLICE = 'UPDATE_LAYOUT_SLICE';
export const updateLayoutSlice = (layoutSlice) => ({
 type: UPDATE_LAYOUT_SLICE,
 layoutSlice
});

export const UPDATE_CURRENT_INDEX = 'UPDATE_CURRENT_INDEX';
export const updateCurrentIndex = (currentIndex) => ({
 type: UPDATE_CURRENT_INDEX,
 currentIndex
});

export const UPDATE_CURRENT_THUMBINDEX = 'UPDATE_CURRENT_THUMBINDEX';
export const updateCurrentThumbIndex = (thumbIndex) => ({
 type: UPDATE_CURRENT_THUMBINDEX,
 thumbIndex
});

export const TOGGLE_STATS = 'TOGGLE_STATS';
export const toggleStats = (statsBoolean) => ({
 type: TOGGLE_STATS,
 statsBoolean
});

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (modalChoice) => ({
 type: SHOW_MODAL,
 modalChoice
});

export const SHOW_FULL_WIKI_ERROR = 'SHOW_FULL_WIKI_ERROR';
export const showFullWikiError = (fullWikiError) => ({
 type: SHOW_FULL_WIKI_ERROR,
 fullWikiError
});

export const SHOW_FULL_WIKI = 'SHOW_FULL_WIKI';
export const showFullWiki = (fullWikiContent) => ({
 type: SHOW_FULL_WIKI,
 fullWikiContent
});

export const CLEAR_FULL_WIKI = 'CLEAR_FULL_WIKI';
export const clearFullWiki = () => ({
 type: CLEAR_FULL_WIKI,
});

export const UPDATE_CURRENT_CONTENT = 'UPDATE_CURRENT_CONTENT';
export const updateCurrentContent = (idx, key, newContent) => ({
 type: UPDATE_CURRENT_CONTENT,
 idx,
 key,
 newContent
});
