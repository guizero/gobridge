import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Container, Header, Divider, Progress, List, Navbar, Content, FlexboxGrid } from 'rsuite';
import { Row, Col } from 'antd';
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
            Status: 'ABERTO'
          },
          {
            DOC_ID: '1234',
            Titulo: 'Carteira de trabalho',
            Imagem: 'imagem',
            Status: 'ABERTO'
          }
        ]
      }
    }
  }

  componentDidMount() {
    const axios = require('axios');
    const { requestId } = this.state

    axios.get('https://gobridge.com.br/backend/gobridge/ws/documentRequest/?HashID=' + requestId)
      .then((response) => {
        this.setState({
          requestDocument: response.data.data.demanda
        })
      })
  }

  render() {
    const { Titulo, documentos, Qtd_requisicao, Qtd_resposta, Usuario_criacao } = this.state.requestDocument
    const { Nome_Razao } = this.state.requestDocument.cliente
    const { Circle } = Progress;

    return (
      <div className="show-fake-browser login-page">
        <Container>
          <Header>
            <Navbar appearance="inverse" style={{backgroundColor: '#7b21ce'}}>
              <FlexboxGrid justify="center">
                <Navbar.Header>
                  <img src='https://gobridge.com.br/wp-content/uploads/2019/10/logogo.resized.png' alt='teste' style={{height: '60px'}}/>
                </Navbar.Header>
              </FlexboxGrid>
            </Navbar>
          </Header>
          <Content>
            <Row>
              <Col xs={24} style={{backgroundColor: '#7b22ce14', textAlign: 'center', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '15px', paddingRight: '15px'}}>
                <h1 style={{ marginBottom: '40px' }}> Olá, {Nome_Razao}</h1>
                <h4><b>{Usuario_criacao}</b>, do <b>{Nome_Razao}</b> está pedindo documentos para:</h4>
                <h4><b>{Titulo}</b></h4>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col xs={24} md={{span: 14, offset: 4}} style={{ textAlign: 'center' }}>
                <h3>Documentos</h3>
                <List>
                  {documentos.map((item, index) =>
                    <DocumentListItem
                      index={index}
                      status={item.Status}
                      title={item.Titulo}
                      envId={item.ENV_ID}
                      explanation='A carteira de identidade é um documento nacional e você consegue pegar a sua cópia em:' // item.TDO_DESCRICAO
                      image='https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2019/02/rg-novo-divulgacao.jpg'
                    />
                  )}
                </List>
              </Col>
              <Col xs={24} md={{span: 3, offset: 1}} style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
                <div style={{ width: '120px', textAlign: 'center', display: 'inline-block' }}>
                  <Circle percent={Math.round((Qtd_resposta/Qtd_requisicao) * 100)} strokeColor="#7b22ce" />
                </div>
                <p>{Qtd_resposta} de {Qtd_requisicao} documentos entregues</p>
              </Col>
            </Row>
          </Content>
        </Container>
      </div>
    );
  }
}

export default DocumentRequest