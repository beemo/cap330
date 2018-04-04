import React from 'react';
import { CircleLoader } from 'react-spinners';

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <CircleLoader
          color={'#36D7B7'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default CircleLoader;
