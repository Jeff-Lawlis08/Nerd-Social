import Dropzone from 'react-dropzone';
import React from 'react';
import $ from 'jquery';
import config from '../config';
import store from '../store';
import {browserHistory} from 'react-router';

export default React.createClass({
  getInitialState(){
    return {
      files: [],
      user: {}
    }
  },
  componentDidMount(){
    store.user.fetch({url: 'https://api.backendless.com/v1/data/users/'+this.props.params.id});
    store.user.on('update change', this.updateState);
  },
  componentWillUnmount(){
    store.user.off('update change', this.updateState);
  },
  render(){
    return (
      <div className="image-upload-container">
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload. View Preview below.</div>
        </Dropzone>
        <input type="button" onClick={this.onOpenClick} value="Open Dropzone"/>
        <div key={this.state.file}>{this.state.files.map((file, i) => <img key={i} src={file.preview} /> )}</div>
        <input type="button" onClick={this.upload} value="Upload Photo"/>
      </div>
    );
  },
  onDrop(acceptedFiles, rejectedFiles){
    this.setState({files: acceptedFiles});
  },
  onOpenClick(){
    this.dropzone.open();
  },
  updateState(){
    this.setState({user: store.user.toJSON()});
  },
  upload(){
    let fd = new FormData();
    fd.append('upload', this.state.files[0])
    $.ajax({
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      url: 'https://api.backendless.com/v1/files/'+this.state.files[0].name,
      headers: {
        'application-id': config.appId,
        'secret-key': config.secret,
        'application-type': 'REST'
      },
      success: (response)=>{
        response = JSON.parse(response);
        console.log(response.fileURL);
        store.user.addPhoto(response.fileURL);
        browserHistory.push('/user/'+this.props.params.id);
      }
    })
  }
});
