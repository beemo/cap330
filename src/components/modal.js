import React from 'react'
import {connect} from 'react-redux'
import store from '../store';
import * as actions from '../actions/index';
// import '../layout.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal = () => {
      if (this.props.modalChoice == 'about') {
        localStorage.setItem('returning', true);
      }
      this.props.showModal(null)
    };

  render() {
    if(!this.props.modalContent) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'absolute',
      maxWidth: '90%',
      minHeight: '20%',
      left: '20%',
      right: '20%',
      backgroundColor: 'lightgrey',
      padding: 40,
      border: 'solid black 1px'
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: '100%',
      minHeight: '20%',
      margin: '0 auto',
      padding: 30,
      border: 'solid black 1px',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 400,
      lineHeight: '20px'
    };

    const buttonStyle = {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        border: 'solid black 1px'
    }


    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <button style={buttonStyle} onClick={() => this.closeModal()}>
            Close
          </button>
          <div dangerouslySetInnerHTML={{__html: this.props.modalContent}}></div>
          <div className="footer">
        </div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {modalContent: state.galleries.modalContent, modalChoice: state.galleries.modalChoice}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (choice) => { dispatch(actions.showModal(choice)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
