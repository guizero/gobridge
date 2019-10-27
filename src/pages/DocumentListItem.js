import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import 'antd/dist/antd.css';
import { Button, ButtonToolbar, Drawer, Icon, List, FlexboxGrid } from 'rsuite';
import { Collapse } from 'antd';
import Uploader from './Uploader'

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
    const { index, status, title, explanation, image, envId } = this.props
    const styleCenter = {
      display: 'flex',
      alignItems: 'center',
      height: '30px'
    };
    const statusConfig = {
      RECEBIDO: {
        color: 'green',
        icon: 'check-square'
      },
      ABERTO: {
        color: '#f9c108',
        icon: 'plus-square'
      }
    }

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
                  <Uploader envId={envId}/>
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