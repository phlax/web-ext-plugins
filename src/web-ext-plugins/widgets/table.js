
import React from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

import Localizer from 'web-ext-plugins/localized/localizer';


const localizer = new Localizer();


export default class Table extends ReactTable {

    constructor(props) {
        super(props);
        this.state.l10nData = [];
        this.state.l10nColumns = [];
    }

    get columns () {
        const {columns} = this.props;
        return columns || [];
    }

    componentDidMount() {
        const promises = [];
        const headers = {};
        this.columns[0].columns.forEach(column => {
            if (column.localizeHeader !== false) {
                promises.push(localizer.localize(column.Header).then(result => {
                    headers[column.id] = result;
                }));
            }
        });
        return Promise.all(promises).then(() => {
            this.columns[0].columns.map(column => {
                if (Object.keys(headers).indexOf(column.id) !== -1) {
                    column.Header = headers[column.id];
                }
            });
            this.setState({l10nData: this.props.data, l10nColumns: this.columns});
            return super.componentDidMount();
        });
    }

    render () {
        const {l10nData} = this.state;
        return (
            <ReactTable
               columns={this.columns}
               {...this.props}
               data={l10nData}
               />);
    }
}
