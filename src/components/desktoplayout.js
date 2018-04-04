import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import ThumbPane from './thumb'
import ImgPane from './img'
import WikiPane from './wiki'
import Stats from './stats'
import Modal from './modal'
import Burger from './burger'

import * as actions from '../actions/index'
import SplitterLayout from 'react-splitter-layout';
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

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = (width <= 425 && width >= 300);
    // the rest is the same...

    let mobileStyle = {
       margin: '0 auto',
       margin: '5%',
       padding: '20%',
       alignContent: 'center'

    }

    let arrowStyle = {
       height: (window.screen.availWidth/3),
       width: (window.screen.availWidth/3),
       margin:".5em"
    }

    // if (isMobile) {
    //
    //   return (
    //
    //     <div className="App">
    //       <div className="App-header">
    //         <h1 className="App-title" >Wikimgur</h1>
    //       </div>
    //       <div style={mobileStyle}>
    //         <h2>This site is best viewed in landscape mode</h2>
    //         <img style={arrowStyle} src={require('../assets/turn-arrow-icon.jpg')} alt="Turn Arrow Icon" />
    //
    //       </div>
    //     </div>
    //
    //     )
    // } else {
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
    // }
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
