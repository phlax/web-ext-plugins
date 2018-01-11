import React from 'react';

import PluginSelect from './plugin-select';

import Fieldset from 'web-ext-plugins/widgets/fieldset';
import TextInput from 'web-ext-plugins/widgets/text-input';
import Button from 'web-ext-plugins/widgets/button';


export default class AddAppForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
  }

  handleSubmit(evt) {
      if (this.state.type && this.state.name && this.state.url) {
          this.props.manager.apps.addApp(this.state.type, this.state.name, this.state.url);
      } else {
          alert('missing stuff!')
      }
      evt.preventDefault();
  }

  handleNameChange(evt) {
      this.setState({name: evt.target.value});
  }

  handleTypeChange(type) {
      this.setState({type: type});
  }

  handleURLChange(evt) {
      this.setState({url: evt.target.value});
  }

  render() {
      return (
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <Fieldset legend="appsAddWebAppLegend">
              <TextInput
                 value={this.state.name}
                 placeholder="appsAddName"
                 onChange={this.handleNameChange.bind(this)} />
              <TextInput
                 value={this.state.url}
                 placeholder="appsAddURL"
                 onChange={this.handleURLChange.bind(this)} />
              <PluginSelect
                 manager={this.props.manager}
                 form={this} />
              <Button text="appsAddAppButton"/>
            </Fieldset>
          </form>);
  }
}
