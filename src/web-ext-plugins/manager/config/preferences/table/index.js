
import React from 'react';

import Subheading from 'web-ext-plugins/widgets/sub-heading';
import Table from 'web-ext-plugins/widgets/table';

import StringPreference from './primitives/string';
import BooleanPreference from './primitives/boolean';
import IntegerPreference from './primitives/integer';


export default class PreferenceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: Object.entries(this.props.preferences)};
        this.renderValue = this.renderValue.bind(this);
        this.onStringBlur = this.onStringBlur.bind(this);
        this.onPreferenceChange = this.onPreferenceChange.bind(this);
    }

    get columns () {
        return [
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
    }

    get data () {
        const {data} = this.state;
        return data;
    }

    onStringBlur (evt, info) {
        const data = [...this.data];
        data[info.index][1][info.column.id] = evt.target.innerHTML;
        this.setState({data})
    }

    onPreferenceChange (info, value) {
        const data = [...this.data];
        return this.props.manager.preferences.update(
            info.original[0],
            info.original[1].plugin,
            info.original[1].category,
            value).then(() => {
                data[info.index][1][info.column.id] = value;
                this.setState({data});
            });
    }

    getCellType (cell) {
        return this.data[cell.index][1]['type'];
    }

    renderValue(cell) {
        switch (this.getCellType(cell)) {
        case "string":
            return (
                <StringPreference
                   preference={cell.original[1]}
                   onStringEdit={evt => this.onPreferenceChange(cell, evt.target.innerHTML)}
                   onBlur={this.onStringBlur}
                   />);
        case "boolean":
            return (
                <BooleanPreference
                   preference={cell.original[1]}
                   onChange={evt => this.onPreferenceChange(cell, Boolean(evt.target.checked))}
                  />);
        case "integer":
            return (
                <IntegerPreference
                   preference={cell.original[1]}
                   onChange={evt => this.onPreferenceChange(cell, evt)}
                  />);
        }
    }

    render() {
        return (
            <div>
              <Subheading text={this.props.category} l10n={this.props.plugin} />
              <Table
                 defaultPageSize={5}
                 className="-striped -highlight"
                 columns={this.columns}
                 data={this.data} />
            </div>);
    }
}
