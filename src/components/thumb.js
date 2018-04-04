import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import * as actions from '../actions/index'
import _ from 'lodash'
import IndexBackButton from './indexBackButton'
import IndexFwdButton from './indexFwdButton'
class ThumbPane extends React.Component {
  constructor(props) {
      super(props)
      this.getCurrentThumbIndexFromGaliD = this.getCurrentThumbIndexFromGaliD.bind(this)
  }
  componentDidMount() {
      this.props.getGals()
      // //console.log('getGals called from thumb.js')
  };

  getCurrentThumbIndexFromGaliD(id) {
    this.props.getCurrentThumbIndexFromGaliD(id, this.props.layoutSlice)
    return
  }
  render() {
      let thumbCode = this.props.layoutSlice.map((gal, i) => {
        let imgUrl = ('url(' + `https://i.imgur.com/${gal.cover}.jpg` + ')')
        let divStyle = {
           backgroundImage: imgUrl,
           height: (window.screen.availWidth/14),
           width: (window.screen.availWidth/14),
           backgroundPosition: 'center center',
           backgroundRepeat: 'no-repeat',
           display: 'inline-block',
           margin: '.5em',
           border: 'solid 3px white',
           outline: 'solid 2px lightgrey'
        }
        return (
        <div
             style={divStyle} onClick={() => {this.getCurrentThumbIndexFromGaliD(gal.id)}} key={i}>
        </div>
        )
      }, this);
    if (!this.props.layoutSlice[0]) {return null}
    return (
      <span className="thumb-container" height={window.screen.availHeight / 6}>
      <center>
        <IndexBackButton />
        {thumbCode}
        <IndexFwdButton />
      </center>
      </span>
    )
  }
};
const mapStateToProps = (state) => {
  return {gals: state.galleries.gals, layoutSlice: state.galleries.layoutSlice, stats: state.galleries.stats}
}
const mapDispatchToProps = (dispatch) => {
  return {
    getGals: () => { dispatch(actions.getGals()) },
    getCurrentThumbIndexFromGaliD: (id, gals, layoutSlice) => { dispatch(actions.getCurrentThumbIndexFromGaliD(id, gals, layoutSlice)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThumbPane)
