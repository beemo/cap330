import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import '../wiki.css';
import * as actions from '../actions/index'
import store from '../store'

import { BeatLoader } from 'react-spinners';
import { CircleLoader } from 'react-spinners';

class WikiPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }


  render() {


    let mobileStyle = {
       margin: '0 auto',
       margin: '5%',
       padding: '20%',
       alignContent: 'center'

    }

    let spinnerStyle = {
       height: (window.screen.availWidth/5),
       width: (window.screen.availWidth/5),
       margin:".5em"
    }


    let wikiPicStyle = {
       height: '40%',
       maxWidth: (window.screen.availWidth/3),
       margin:".5em",
       padding: ".25em",
       border: 'solid lightgrey 1px'
    }


    if (this.props.layoutSlice.length > 0) {
    //console.log('in WikiPane render', this.props.thumbIndex)
      let currentContent = this.props.layoutSlice && this.props.layoutSlice ? this.props.layoutSlice[this.props.thumbIndex] : null

      let currentContentWikiTextWithwRedirects = _.has(this.props.layoutSlice[this.props.thumbIndex], 'wikiContent') ? this.props.layoutSlice[this.props.thumbIndex].wikiContent : null
      let currentContentWikiPic = _.has(this.props.layoutSlice[this.props.thumbIndex], 'wikiPic') ? this.props.layoutSlice[this.props.thumbIndex].wikiPic : 'https://upload.wikimedia.org/wikipedia/en/5/5f/Disambig_gray.svg'

      this.showFullWikiContent = () => {
        this.props.getFullWikiContent(this.props.thumbIndex, currentContent.topTag)
      }

      const wikiStyle = {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 400,
        lineHeight: '20px'
      }

      if (currentContent && currentContentWikiTextWithwRedirects) {
        return (
          <div className="wiki-html">

          <h1>{_.replace(currentContent.topTag, '_', ' ')}</h1>
          {
            _.includes(this.props.layoutSlice[this.props.thumbIndex].wikiPic, "Disambig")
            ? <p>(This is a <a href="https://en.wikipedia.org/wiki/Wikipedia:Disambiguation">disambiguation article</a>.)</p>
              : null
          }
          {
            _.includes(this.props.layoutSlice[this.props.thumbIndex].wikiContent, "mw-parser-output")
            ? null
              : (
                <img src={currentContentWikiPic} style={wikiPicStyle} alt={currentContent.topTag} width="60%" />
              )
          }

              <div style={wikiStyle} dangerouslySetInnerHTML={{__html: currentContentWikiTextWithwRedirects}}></div>

              {
                _.includes(this.props.layoutSlice[this.props.thumbIndex].wikiContent, "mw-parser-output") || this.props.fullWikiError
                ? null
                  : (
                    <center><br /><b><button onClick={() => this.showFullWikiContent()}> Get Full Wikipedia Article </button></b></center>
                  )
              }
              {
                this.props.fullWikiError
                ? <center><br /><b>{this.props.fullWikiError}</b></center>
                  : (
                    null
                  )
              }


          </div>

      )}
    }
    return (
      <div style={mobileStyle}><h4> Loading Imgur Content...</h4>
        <CircleLoader style={spinnerStyle}
          color={'#C0C0C0'}
          loading={this.state.loading}
        />
      </div>
    )
    }
};

const mapStateToProps = (state) => {
  return {layoutSlice: state.galleries.layoutSlice, thumbIndex: state.galleries.thumbIndex, fullWikiError: state.galleries.fullWikiError}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullWikiContent: (idx, topTag) => { dispatch(actions.getFullWikiContent(idx, topTag)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiPane)
