
import React from 'react';


export default class PreferenceString extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: this.value};
        this.onBlur = this.onBlur.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    get value () {
        const {value} = this.props.preference;
        return value || this.defaultValue;
    }

    get defaultValue () {
        return this.props.preference['default']
    }

    onBlur (evt) {
        return this.props.onBlur(evt);
    }

    onMouseLeave (evt) {
        return this.props.onStringEdit(evt);
    }

    componentDidMount () {
        this.setState({value: this.value});
    }

    render () {
        let {value} = this.state;
        const dangerouslySetInnerHTML = {
            __html: value
        };
        return (
            <div
               style={{backgroundColor: "#fafafa"}}
               contentEditable
               suppressContentEditableWarning
               placeholder='unset'
               onMouseLeave={this.onMouseLeave}
               onBlur={this.onBlur}
               dangerouslySetInnerHTML={dangerouslySetInnerHTML}
              />
        );

    }

}
