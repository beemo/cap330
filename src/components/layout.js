import React from 'react'
import {connect} from 'react-redux'
import ThumbPane from './thumb'
import ImgPane from './img'
import WikiPane from './wiki'

import MobileImgPane from './mobileImg'
import MobileWikiPane from './mobilewiki'
import Stats from './stats'
import TitleText from './TitleText'

import Modal from './modal'
import Burger from './burger'

import * as actions from '../actions/index'
import * as modalText from '../modalText'
import SplitterLayout from 'react-splitter-layout';
import _ from 'lodash'

import '../layout.css';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;


    if (isMobile) {

        return (

          <div className="App">
          <div className="App-header">
            <h1 className="App-title" >Wikimgur</h1>
          </div>
          <TitleText />
          <SplitterLayout percentage={true} primaryIndex={1} secondaryInitialSize={40} vertical={true}>
            <div><MobileWikiPane /></div>
            <div><MobileImgPane /></div>
          </SplitterLayout>
          </div>

        )
    } else {
        return (

            <div className="App">
            <Burger width={ '18%' } />
                <div className="App-header">
                  <h1 className="App-title" >Wikimgur</h1>
                </div>
                <Stats />
                <SplitterLayout vertical={true} primaryMinSize={79} percentage={true}>
                    <div className="Main-content-container">
                      <SplitterLayout secondaryMinSize={50}>
                        <div className="Main-pane"><ImgPane /></div>
                        <div className="Main-pane"><WikiPane /></div>
                      </SplitterLayout>
                    </div>
                    <div>
                      <ThumbPane />
                    </div>
                </SplitterLayout>
                <Modal show={_.has(localStorage, 'returning') ? this.props.modalContent : this.props.showModal('about')} />
              </div>
        )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (choice) => { dispatch(actions.showModal(choice)) },
    toggleStats: (status) => { dispatch(actions.toggleStats(status)) }
  }
}

const mapStateToProps = (state) => {
  return {modalContent: state.galleries.modalContent, stats: state.galleries.stats}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
