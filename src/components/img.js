import React from 'react'
import {connect} from 'react-redux'
import store from '../store';
import * as actions from '../actions/index';
import _ from 'lodash'
import * as modalText from '../modalText.js'
import { CircleLoader } from 'react-spinners';
import '../layout.css';
class ImgPane extends React.Component {
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
    if (this.props.layoutSlice[this.props.thumbIndex]) {
        let currentContent = this.props.layoutSlice[this.props.thumbIndex]
        let currentContentlink = `https://i.imgur.com/${currentContent.cover}.jpg`
        let currentContentvid = `https://i.imgur.com/${currentContent.cover}.mp4`
        let galTitle = currentContent.title
          if (_.includes(currentContent.images[0].link, '.mp4')) {
            return (
            <div className="imgurHeader">
                <h1> {galTitle} </h1>
              <div>
              <video autoPlay="true" loop width="80%">
                <source src={currentContentvid} type="video/mp4" />
              </video>
              <p> View on <b><a href={currentContent.link}>Imgur</a></b>.         <b
            </div>
          </div>
        )} else {
          return (
            <div className="imgurHeader">
                <h1> {galTitle} </h1>
              <div className="imgur-img-container" >
                <img className="imgur-img" alt={currentContent.images[0].title} src={currentContentlink} width="80%" />
                <p> View on <b><a href={currentContent.link} target="_blank">Imgur</a></b>.         <b
              </div>
            </div>
      )
    }
        } else { return (
          <div style={mobileStyle}><h4> Loading Imgur Content...</h4>
            <CircleLoader style={spinnerStyle}
              color={'#C0C0C0'}
              loading={this.state.loading}
            />
          </div>) }
  }
};
const mapStateToProps = (state) => {
  return {layoutSlice: state.galleries.layoutSlice, currentIndex: state.galleries.currentIndex, thumbIndex:
}
export default connect(mapStateToProps)(ImgPane)
