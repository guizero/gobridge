import React from 'react';
import Uppy from '@uppy/core'
import GoogleDrive from '@uppy/google-drive'
import Webcam from '@uppy/webcam'
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
import Portugues from '@uppy/locales/lib/pt_BR'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

class Uploader extends React.Component {
    constructor(props) {
        super(props)
        this.uppy = new Uppy({
            id: 'uppy1', autoProceed: true, debug: true, locale: Portugues, maxWidth: 300,
            maxHeight: 350,
            inline: true,
        })
            .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
            .use(Webcam, {
                onBeforeSnapshot: () => Promise.resolve(),
                id: 'Webcam',
                countdown: false,
                modes: [
                    'video-audio',
                    'video-only',
                    'audio-only',
                    'picture'
                ],
                mirror: true,
                facingMode: 'user',
                locale: {}
            })
            .use(XHRUpload, {
                endpoint: 'https://gobridge.com.br/backend/gobridge/ws/documentUpload/?ENV_ID=' + props.envId,
                formData: true,
                fieldName: 'files[]'
            }) 
            .on('upload-success', (file, response) => {
                props.onSuccess(response)
              })

    }
    componentWillUnmount() {
        this.uppy.close()
    }

    render() {
        return (
            <Dashboard
                uppy={this.uppy}
                plugins={['GoogleDrive', 'Webcam']}
                heigth='150'
                metaFields={[
                    { id: 'name', name: 'Name', placeholder: 'File name' }
                ]}
            />
        );
    }
}

export default Uploader