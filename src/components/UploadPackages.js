'use strict';

import React from 'react';
import {server} from '../utils/platform';
import Dropzone from 'react-dropzone';

export default class UploadPackages extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop = files => {
    this.props.uploadFile(server() + '/api/upload?token=' + localStorage.getItem('token'), files[0]);
  }

  render() {
    return <div className="row">
      <div className="col-xs-12 col-lg-6 offset-lg-3">
        {!this.props.loading.get('upload') && <Dropzone 
          onDrop={this.onDrop} 
          accept="application/json"
          disablePreview={true}
          multiple={false}
          style={{ padding: '80px', textAlign: 'center', border: '2px dashed black' }}>
          Drag a package.json here, or click to browse your filesystem.
        </Dropzone>}
        {this.props.loading.get('upload') && <div style={{ textAlign: 'center', padding: '40px 0 40px 0' }}>
          <h1><i className="fa fa-spin fa-circle-o-notch"></i></h1>
          <h3>Uploading...</h3>
        </div>}
      </div>
    </div>;
  }
}

UploadPackages.propTypes = {
  uploadFile: React.PropTypes.func,
  loading: React.PropTypes.object
};
