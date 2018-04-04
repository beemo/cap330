import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import store from '../store';
import * as actions from '../actions/index';

class TitleText extends React.Component {
  constructor(props) {
      super(props);
      this.whackTitleText = this.whackTitleText.bind(this)
      this.state = {returning: false}

  }

  whackTitleText = () => {
    this.state.returning = true
    console.log('whackTitleText', this.state)
    localStorage.setItem('returning', true);
    this.forceUpdate()
  };

  render() {

        let titleTextStyle = {
           margin: '0 auto',
           alignContent: 'center',
           backgroundColor: '#222',
           maxWidth: (window.screen.availWidth),
           color: 'white',
           paddingTop: 1,
           paddingBottom: 5,
           paddingRight: '20%',
           paddingLeft: '20%'
        }

        // //console.log('Loading stats:', this.props.stats, ' to stats component.')
        if (localStorage.returning) {
          return null
        } else if (this.state.returning == true) {
          return null
        } else if (_.has(this.props.gals[this.props.currentIndex], 'title')) {

        return (
          <div>
            <section style={titleTextStyle} onClick={() => this.whackTitleText()}>
              <h2>About</h2><p>This page is a mashup of current Imgur images and related Wikipedia content.</p> <p>Image tags are used to dynamically retreive and display Wikipedia content.</p><p> Touch here to close.</p>
            </section>
          </div>
        )

        } else { return null }
  }
};

const mapStateToProps = (state) => {
  return {gals: state.galleries.gals, currentIndex: state.galleries.currentIndex}
}

export default connect(mapStateToProps)(TitleText)
