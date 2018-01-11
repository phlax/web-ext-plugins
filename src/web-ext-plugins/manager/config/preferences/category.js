
import React from 'react';

import Subheading from 'web-ext-plugins/widgets/sub-heading';
import Table from 'web-ext-plugins/widgets/table';


export default class PreferenceCategory extends React.Component {


    constructor(props) {
        super(props);
        this.state = {data: Object.entries(this.props.preferences)};
        this.renderValue = this.renderValue.bind(this)
    }

    renderEditable(cellInfo) {
        const dangerouslySetInnerHTML = {
            __html: this.state.data[cellInfo.index][1][cellInfo.column.id]
        };

        return (
            <div
               style={{backgroundColor: "#fafafa"}}
               contentEditable
               suppressContentEditableWarning
               placeholder='unset'
               onBlur={
                   e => {
                       const data = [...this.state.data];
                       data[cellInfo.index][cellInfo.column.id][1] = e.target.innerHTML;
                       this.setState({data});
                   }
              }
              dangerouslySetInnerHTML={dangerouslySetInnerHTML}
              />
        );

    }

    renderValue(cellInfo) {
        if (this.state.data[cellInfo.index][1]['type'] === 'string') {
            return this.renderEditable(cellInfo)
        }
        if (this.state.data[cellInfo.index][1]['type'] === 'boolean') {
            return <input type='checkbox' />
        }

    }

    render() {
        const columns = [
            {columns: [
                {Header: "tableHeaderName",
                 id: "name",
                 accessor: ([name, ]) => name
                },
                {
                    Header: "tableHeaderType",
                    id: "type",
                    accessor: ([, data]) => data.type
                },
                {
                    Header: "tableHeaderValue",
                    id: "value",
                    accessor: ([, data]) => data.value,
                    Cell: this.renderValue
                },
                {
                    Header: "tableHeaderPlugin",
                    id: "plugin",
                    accessor: ([, data]) => data.plugin
                }]}];
        const {data} = this.state;
        return (
            <div>
              <Subheading text={this.props.category} l10n={this.props.plugin} />
              <Table
                 defaultPageSize={5}
                 className="-striped -highlight"
                 columns={columns}
                 data={data} />
            </div>);
    }
}
