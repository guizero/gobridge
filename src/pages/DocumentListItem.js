import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import 'antd/dist/antd.css';
import { Button, ButtonToolbar, Drawer, Icon, List, FlexboxGrid } from 'rsuite';
import { Upload, Icon as Icon2, message, Collapse } from 'antd';

class DocumentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  close() {
    this.setState({
      show: false
    });
  }
  toggleDrawer() {
    this.setState({ show: true });
  }

  render() {
    const { index, status, title, explanation, image } = this.props
    const styleCenter = {
      display: 'flex',
      alignItems: 'center',
      height: '30px'
    };
    const statusConfig = {
      ok: {
        color: 'green',
        icon: 'check-square'
      },
      ABERTO: {
        color: 'yellow',
        icon: 'square'
      }
    }
    const { Dragger } = Upload;
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };

    const { Panel } = Collapse;


    return (
      <List.Item key={index} index={index}>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={2} style={styleCenter}>
            <Icon icon={statusConfig[status].icon} style={{
              color: statusConfig[status].color,
              fontSize: '1.5em'
            }} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={18} style={styleCenter}>
            <span>{title}</span>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{
            ...styleCenter
          }}>
            <ButtonToolbar>
              <Button onClick={this.toggleDrawer}>Enviar</Button>
            </ButtonToolbar>
            <Drawer
              show={this.state.show}
              onHide={this.close}
              size='md'
            >
              <Drawer.Header>
                <Drawer.Title><h3>{title}</h3></Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <div style={{ width: '100%', heigth: '200px', marginBottom: '40px' }}>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon2 type="inbox" />
                    </p>
                    <p className="ant-upload-text">Clique ou arraste os arquivos nesta área para enviar</p>
                    <p className="ant-upload-hint">
                      Tenha certeza que o documento está em boa qualidade e legível.
                    </p>
                  </Dragger>
                </div>
                <div>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                  <Panel header="O que é e onde consigo este documento?" key="1">
                    {explanation}
                  </Panel>
                  <Panel header="Veja um exemplo" key="2">
                    <img src={image} alt='Documento exemplo' />
                  </Panel>
                </Collapse>
                </div>
              </Drawer.Body>
              <Drawer.Footer>
                <Button onClick={this.close} appearance="primary">Confirm</Button>
                <Button onClick={this.close} appearance="subtle">Cancel</Button>
              </Drawer.Footer>
            </Drawer>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    );
  }
}

export default DocumentListItem