
import React from 'react';

import Fieldset from 'web-ext-plugins/widgets/fieldset';

import {NotImplementedError} from 'web-ext-plugins/errors';


export class ParsedUploadForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = {data: []};
        this.uploadFile = this.uploadFile.bind(this);
    }

    get parser () {
        return new this.parserClass()
    }

    get parserClass () {
        throw new NotImplementedError()
    }

    uploadFile (evt) {
        const curFiles = evt.target.files;
        if (curFiles.length > 0) {
            this.parser.parseFile(curFiles[0], entries => {
                this.setState({data: entries});
            });
        }
    }

    renderDataTable () {
        const {data} = this.state;
        if (data.length > 0) {
            const Table = this.tableComponent;
            return <Table data={data} />;
        }
        return <div />;
    }

    render() {
        return (
            <form>
              <Fieldset legend="">
                <input type="file" onChange={this.uploadFile} />
              </Fieldset>
              {this.renderDataTable()}
            </form>);
    }
}
