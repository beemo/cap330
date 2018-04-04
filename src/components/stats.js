import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import store from '../store';
import * as actions from '../actions/index';

class Stats extends React.Component {
  constructor(props) {
      super(props);
      this.toggleStats = this.toggleStats.bind(this)
  }

  shouldComponentUpdate(nextProps) {
      return _.isMatch(this.props.stats, nextProps.stats)
  }

  toggleStats = () => {
    this.props.toggleStats(!this.props.statsBoolean)
  };

  render() {


        let statsStyle = {
           margin: '0 auto',
           alignContent: 'center',
           backgroundColor: '#222',
           maxWidth: (window.screen.availWidth),
           color: 'white',
           paddingTop: 1,
           paddingBottom: 5,
           paddingRight: '25%',
           paddingLeft: '15%'
        }

        // //console.log('Loading stats:', this.props.stats, ' to stats component.')
        if (this.props.statsBoolean) {

        return (
          <div>
            <section style={statsStyle} onClick={() => this.toggleStats()}>
                <h1>Stats</h1>


                <ul>
                    <li>Total number of images currently available (images older than 8 hours are automatically purged): <b> {this.props.gals.length}</b></li>
                    <li>Last update: <b>{this.props.stats.batchTime} PST</b></li>
                    <li>Number of images added from last update: <b>{this.props.stats.approved}</b></li>
                    <li>Current page:<b> {Math.floor(this.props.currentIndex/11) +1} out of {Math.floor(this.props.gals.length/11)} total pages</b></li>

                    <h4>Filtered images</h4>
                    <li>Number of images containing multiple images in the gallery: <b>{this.props.stats.multipics}</b> ({(Math.floor(this.props.stats.multipics/500 * 100))}% filtered)</li>
                    <li>Number of untagged images: <b>{this.props.stats.tagless}</b> ({(Math.floor(this.props.stats.tagless/500 * 100))}% filtered)</li>
                    <li>Number of tagged images without valid Wikipedia pages:<b>{this.props.stats.wikiless}</b> ({(Math.floor(this.props.stats.wikiless/500 * 100))}% filtered)</li>
              </ul>
                <h2>Close</h2>
              </section>
          </div>
        )} else { return null }
  }
};

const mapStateToProps = (state) => {
  return {stats: state.galleries.stats, statsBoolean: state.galleries.statsBoolean, gals: state.galleries.gals, currentIndex: state.galleries.currentIndex}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleStats: (b) => { dispatch(actions.toggleStats(b)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
