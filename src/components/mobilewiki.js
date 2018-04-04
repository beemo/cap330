import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
// import '../wiki.css';
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
       margin: '2%',
       padding: '2%',
       alignContent: 'center'

    }

    let spinnerStyle = {
       height: (window.innerHeight/5),
       width: (window.innerWidth/5),
       margin:".5em"
    }

    if (_.isInteger(this.props.currentIndex) && _.has(this.props.gals[this.props.currentIndex], 'wikiContent', 'topTag')) {

      //console.log('in MobileWikiPane component render', this.props.currentIndex)

      let currentContentWikiTextWithRedirects = _.replace(this.props.gals[this.props.currentIndex].wikiContent, new RegExp('href=\"/wiki/','g'), 'href=\"https://en.wikipedia.org/wiki/')

      let currentContentWikiTextWithwRedirects = _.replace(currentContentWikiTextWithRedirects, new RegExp('/w/','g'), 'https://en.wikipedia.org/w/')


      return (

        <div style={mobileStyle}>
        <h2>{this.props.gals[this.props.currentIndex].topTag}</h2>
            <div dangerouslySetInnerHTML={{__html: currentContentWikiTextWithwRedirects}}></div>
        </div>

    )} else { return (
                  <div style={mobileStyle}><h4> Loading Wikipedia Content...</h4>
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

export default connect(mapStateToProps)(WikiPane)
