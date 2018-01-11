
import React from 'react';


export class Columns extends React.Component {

    render() {
        return (
            <Container columns={this.columns.length} ratios={this.columns.map(([, v]) => v)}>
              {this.columns.map(([column,], key) => {
                  return (
                      <Column key={key}>
                        {column}
                      </Column>);
              })}
            </Container>);
    }
}


export class Container extends React.Component {

    createColumnStyle(width) {
        return {
            float: "left",
            overflow: "hidden",
            padding: ".5em",
            boxSizing: "border-box",
            width: width.toString() + "%"}
    }

    get columnStyles () {
        let {columns, ratios} = this.props;
        let result = []
        ratios = ratios || []
        if (columns) {
            if (ratios.length) {
                const total = ratios.reduce((a, b) => a + b, 0);
                const _ratios = ratios.map(a => ((a / total) * 100))
                _ratios.map(width => {
                    result.push(this.createColumnStyle(width))
                })
            } else {
                result = [...Array(columns).map(() => this.createColumnStyle(100 / ratios.length))];
            }
        }
        return result;
    }

    render () {
        let {children} = this.props;
        children = children || [];
        return (
            <div className="container">
              {React.Children.map(children, (child, key) => {
                  let columnStyle = {}
                  if (this.columnStyles.length >= key) {
                      columnStyle = this.columnStyles[key]
                  }
                  return <div key={key} style={columnStyle}>{child}</div>;
                  })
              }
            </div>);
        }
}


export class Column extends React.Component {

    render () {
        let {className} = this.props;
        className = "column " + className
        return <div className={className}>{this.props.children}</div>
    }
}
