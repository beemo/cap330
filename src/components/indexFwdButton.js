
  import React from 'react';
  import {connect} from 'react-redux';
  import * as actions from '../actions/index';

  class IndexBackButton extends React.Component {
    constructor(props) {
      super(props)
      this.indexFwd = this.indexFwd.bind(this)
    }

    indexFwd() {
      var newIndex = ((this.props.currentIndex + 8) < this.props.gals.length) ? (this.props.currentIndex + 8) : 1
      this.props.updateCurrentIndex(newIndex)
      this.props.makeLayoutSlice(this.props.gals, newIndex)
      return ('pageFwd called')
    };

      render() {
        let arrowStyle = {
           height: (window.screen.availWidth/18),
           width: (window.screen.availWidth/18),
           display: 'inline-block',
           margin:".5em"
        }

        return (
          <img style={arrowStyle} src={require('../assets/Next_Arrow.svg.png')} alt="Next Arrow Icon" onClick={() => this.indexFwd()}/>
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
