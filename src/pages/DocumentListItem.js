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

  onSuccessUpload = () => {
    this.props.onSuccess()
    this.close()
  }

  render() {
    console.log(this.props)
    const { index, status, title, explanation, image, envId, link } = this.props
    const styleCenter = {
      display: 'flex',
      alignItems: 'center',
      height: '30px'
    };
    const statusConfig = {
      APROVADO: {
        color: 'green',
        icon: 'check-square'
      },
      ABERTO: {
        color: '#f9c108',
        icon: 'plus-square'
      },
      RECEBIDO: {
        color: 'orange',
        icon: 'check-square'
      },
      REPROVADO: {
        color: 'red',
        icon: 'warning'
      }
    }

    console.log(statusConfig[status])

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
          <FlexboxGrid.Item colspan={17} style={styleCenter}>
            <span>{title}</span>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={5} style={{
            ...styleCenter,
            justifyContent: 'flex-end'
          }}>
            <ButtonToolbar>
              {link && <><a href={link} target='_blank' rel='noopener noreferrer'>Ver  </a></>}
              <Button onClick={this.toggleDrawer} style={{color: '#ffffff', background: '#7b22ce'}}>{link ? 'Reenviar' : 'Enviar'}</Button>
            </ButtonToolbar>
            <Drawer
              show={this.state.show}
              onHide={this.close}
              size='sm'
            >
              <Drawer.Header>
                <Drawer.Title><h3>{title}</h3></Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <div>
                <Collapse bordered={false} defaultActiveKey={['1']} style={{width: '100%'}}>
                  <Panel header="O que é e onde consigo este documento?" key="1">
                    {explanation}
                  </Panel>
                  <Panel header="Veja um exemplo" key="2">
                    <img src={image} alt='Documento exemplo' style={{width: '100%'}} />
                  </Panel>
                </Collapse>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <Uploader envId={envId} onSuccess={this.onSuccessUpload}/>
                </div>
              </Drawer.Body>
            </Drawer>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </List.Item>
    );
  }
}

export default DocumentListItem