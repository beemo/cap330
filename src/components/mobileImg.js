import React from 'react'
import {connect} from 'react-redux'
import store from '../store';
import * as actions from '../actions/index';
import _ from 'lodash'
import * as modalText from '../modalText.js'
import Swipeable from 'react-swipeable'
import { CircleLoader } from 'react-spinners';
class MobileImgPane extends React.Component {
  constructor(props) {
      super(props);
      this.swipingUp = this.swipingUp.bind(this)
      this.swipedRight = this.swipedRight.bind(this)
      this.swipedLeft = this.swipedLeft.bind(this)
      this.state = {
        loading: true
      }
  }
  componentWillMount() {
      this.props.getGals()
  };
  swipingUp(e, absX) {
  }
  swipedRight(e) {
    var newIndex = (this.props.currentIndex == 0) ? this.props.gals.length : (this.props.currentIndex - 1)
    this.props.updateCurrentIndex(newIndex)
  }
  swipedLeft(e) {
    var newIndex = (this.props.currentIndex != this.props.gals.length) ? (this.props.currentIndex + 1) : 0
    this.props.updateCurrentIndex(newIndex)
  }
    render() {
          let mobileStyle = {
             margin: '0 auto',
             margin: '5%',
             padding: '5%',
             alignContent: 'center'
          }
          let spinnerStyle = {
             height: (window.innerHeight/5),
             width: (window.innerWidth/5),
             margin:".5em"
          }
          let imgurContainerStyle = {
            height: '50%',
            width: (window.innerWidth/1.10),
            margin:".5em",
            textAlign: 'center',
            margin: '0 auto',
            padding: '2px'
          }
      if (_.isNull(this.props.currentIndex)) {this.props.updateCurrentIndex(1)}
      if (_.has(this.props.gals[this.props.currentIndex], 'cover', 'link', 'topTag', 'title', 'images')) {
          let currentContent = this.props.gals[this.props.currentIndex]
          let currentContentlink = `https://i.imgur.com/${this.props.gals[this.props.currentIndex].cover}.jpg`
          let currentContentvid = `https://i.imgur.com/${this.props.gals[this.props.currentIndex].cover}.mp4`
          let galTitle = this.props.gals[this.props.currentIndex].title
            if (_.includes(this.props.gals[this.props.currentIndex].images[0].link, '.mp4')) {
              return (
                <div style={imgurContainerStyle}>
                  <div className="imgurHeader">
                      <h1> {galTitle} </h1>
                  </div>
                  <Swipeable
                    onSwipedLeft={this.swipedLeft}
                    onSwipedRight={this.swipedRight}
                    onSwipingUp={this.swipingUp} >
                    <div className="mobile-imgur-container">
                      <div className="mobile-imgur-header">
                        <h1> {galTitle} </h1>
                        <div className="mobile-imgur-img" >
                          <video autoPlay="true" loop width="80%">
                            <source src={currentContentvid} type="video/mp4" />
                          </video>
                          <p> View on <b><a href={this.props.gals[this.props.currentIndex].link}>Imgur</a></b>.         <b
                        </div>
                      </div>
                    </div>
                  </Swipeable>
                </div>
          )} else {
            return (
              <div style={imgurContainerStyle}>
                <div className="mobile-imgur-header">
                    <h2> {galTitle} </h2>
                </div>
                <Swipeable
                  onSwipedLeft={this.swipedLeft}
                  onSwipedRight={this.swipedRight}
                  onSwipingUp={this.swipingUp} >
                  <div className="mobile-imgur-container">
                      <div className="mobile-imgur-img" >
                        <img alt={this.props.gals[this.props.currentIndex].images[0].title}
                        <p> View on <b><a href={this.props.gals[this.props.currentIndex].link}>Imgur</a></b>.         <b
                      </div>
                  </div>
                </Swipeable>
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
  return {gals: state.galleries.gals, currentIndex: state.galleries.currentIndex}
}
const mapDispatchToProps = (dispatch) => {
  return {
    getGals: () => { dispatch(actions.getGals()) },
    updateCurrentIndex: (idx) => { dispatch(actions.updateCurrentIndex(idx))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileImgPane)
