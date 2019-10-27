import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Container, Header, Divider, Progress, List, Navbar, Content, FlexboxGrid } from 'rsuite';
import DocumentListItem from './DocumentListItem'

class DocumentRequest extends React.Component {
  constructor(props) {
    super(props)

    const { requestId } = props.match.params

    this.state = {
      requestId,
      requestDocument: {
        DEM_ID: '123456',
        HashID: '12345345345',
        Titulo: 'Documentos para Doença Ocupacional',
        cliente: {
          CLI_ID: '1234',
          Nome_Razao: 'Guilherme Araujo'
        },
        escritorio: {
          ESC_ID: '456',
          Nome_Razao: 'Demarest',
          thumbnail: 'https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.demarest.com.br/wp-content/uploads/2019/01/LOGO.png'
        },
        documentos: [
          {
            DOC_ID: '1234',
            Titulo: 'Contrato de Trabalho',
            Imagem: 'imagem',
            Status: 'Aberto'
          },
          {
            DOC_ID: '1234',
            Titulo: 'Carteira de trabalho',
            Imagem: 'imagem',
            Status: 'Aberto'
          }
        ]
      }
    }
  }

  componentDidMount() {
    const axios = require('axios');
    const { requestId } = this.state

    axios.get('http://gobridge.com.br/backend/gobridge/ws/documentRequest/?HashID=' + requestId)
      .then((response) => {
        console.log(response)
        this.setState({
          requestDocument: response.data.data.demanda
        })
      })
  }

  render() {
    const { Titulo, documentos } = this.state.requestDocument
    const { Nome_Razao } = this.state.requestDocument.cliente
    const { Circle } = Progress;
    const styleCenter = {
      display: 'flex',
      alignItems: 'center',
      height: '30px'
    };

    console.log(this.state)

    return (
      <div className="show-fake-browser login-page">
        <Container>
          <Header>
            <Navbar appearance="inverse" style={{backgroundColor: '#7b21ce'}}>
              <FlexboxGrid justify="center">
                <Navbar.Header>
                  <img src='http://gobridge.com.br/wp-content/uploads/2019/10/logogo.resized.png' alt='teste' style={{height: '60px'}}/>
                </Navbar.Header>
              </FlexboxGrid>
            </Navbar>
          </Header>
          <Content>
            <FlexboxGrid justify="center" style={{backgroundColor: '#7b22ce14'}}>
              <FlexboxGrid.Item colspan={12} style={{ textAlign: 'center', padding: '50px' }}>
                <h1 style={{ marginBottom: '40px' }}> Olá, {Nome_Razao}</h1>
                <h4> O escritório Demarest está pedindo documentos para:</h4>
                <h4>{Titulo}</h4>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider></Divider>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={10} style={{ textAlign: 'center' }}>
                <h3>Documentos</h3>
                <List>
                  {documentos.map((item, index) =>
                    <DocumentListItem
                      index={index}
                      status='ok'
                      title={item.Titulo}
                      explanation='A carteira de identidade é um documento nacional e você consegue pegar a sua cópia em:' // item.TDO_DESCRICAO
                      image='https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2019/02/rg-novo-divulgacao.jpg'
                    />
                  )}
                </List>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4} style={{ textAlign: 'center', backgroundColor: '#f5f5f5', marginLeft: '40px', padding: '20px' }}>
                <div style={{ width: '120px', textAlign: 'center', display: 'inline-block' }}>
                  <Circle percent={30} strokeColor="#ffc107" />
                </div>
                <p>3 de 5 documentos entregues</p>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
    );
  }
}

export default DocumentRequest