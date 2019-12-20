import * as React from "react";
import _ from "lodash"
import {
  Upload, message, Button, Icon,
} from 'antd';
// const socket = io('ws://192.168.50.97:8001/');

export default class Socket extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {}
  }

  onChange = (info) => {
    this.setState({file: info.file})

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.setState({file: info.file})
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      }
    };
    const {file} = this.state
    return (<div style={{overflow: "hidden"}}>
        <Upload {...props} onChange={this.onChange}>
          <Button>
            <Icon type="upload"/> Click to Upload
          </Button>
        </Upload>
        {file ?
          <div>
            完成{Math.round(file.percent).toFixed(2) + '%'}
            <p>大小{`${(file.size * file.percent / 100 / 1024 / 1024).toFixed(2)}MB/${(file.size / 1024 / 1024).toFixed(2)}MB`}</p>
          </div> : null}
      </div>
    )
  }
}
