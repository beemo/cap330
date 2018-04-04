import React from 'react'
import {connect} from 'react-redux'
import store from '../store';
import * as actions from '../actions/index';
import {action as toggleMenu} from 'redux-burger-menu';
import _ from 'lodash'
import Menu from './menu';
class BurgerMenu extends React.Component {
  constructor(props) {
      super(props);
      this.toggleStats = this.toggleStats.bind(this)
      this.displayModal = this.displayModal.bind(this)
  }
toggleStats = () => {
  this.props.toggleStats(!this.props.statsBoolean)
  store.dispatch(toggleMenu(false));
};
displayModal = (e, choice) => {
  e.preventDefault()
  this.props.showModal(choice)
  store.dispatch(toggleMenu(false));
};


  render() {

    const menuStyle = {
      cursor: 'pointer'
    }

        return (
          <div style={menuStyle}>
            <Menu right>
              <a id="home" className="menu-item" onClick={(e) => this.displayModal(e, null) }>Home</a>
              <a id="about" className="menu-item" onClick={(e) => this.displayModal(e, 'about') }>About</a>
              <a id="contact" className="menu-item" onClick={(e) => this.displayModal(e, 'contact') }>Contact</a>
              <a id="style" className="menu-item" onClick={(e) => this.displayModal(e, 'style') }>Style</a>
              <a id="style" className="menu-item" onClick={() => this.toggleStats() }> Show Statistics</a>
            </Menu>
          </div>
)}
}
const mapStateToProps = (state) => {
  return {stats: state.galleries.stats, statsBoolean: state.galleries.statsBoolean}
}
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (choice) => { dispatch(actions.showModal(choice)) },
    toggleStats: (b) => { dispatch(actions.toggleStats(b)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu)
