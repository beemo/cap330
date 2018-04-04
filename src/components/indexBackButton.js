import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

class IndexBackButton extends React.Component {
  constructor(props) {
    super(props)
    this.indexBack = this.indexBack.bind(this)
  }

  indexBack() {
    var newIndex = (this.props.currentIndex >= 8) ? (this.props.currentIndex - 8) : (this.props.gals.length - 8)
    this.props.updateCurrentIndex(newIndex)
    this.props.makeLayoutSlice(this.props.gals, newIndex)
    return ('pageBack called')
  };

  render() {
    let arrowStyle = {
       height: (window.screen.availWidth/18),
       width: (window.screen.availWidth/18),
       display: 'inline-block',
       margin:".5em"
    }

    return (
      <img style={arrowStyle} src={require('../assets/Back_Arrow.svg.png')} onClick={() => this.indexBack()}/>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentIndex: (newIndex) => { dispatch(actions.updateCurrentIndex(newIndex)) },
    makeLayoutSlice: (gals, newIndex) => { dispatch(actions.makeLayoutSlice(gals, newIndex)) }
  }
}

const mapStateToProps = (state) => {
  return {gals:state.galleries.gals, layoutSlice:state.galleries.layoutSlice, currentIndex: state.galleries.currentIndex, thumbIndex: state.galleries.thumbIndex}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexBackButton)
