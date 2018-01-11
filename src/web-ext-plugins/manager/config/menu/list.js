
import React from 'react';

import MenuItem from './item';


export default class MenuList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hidden: false, items: []}
    }

    componentDidMount() {
        this.setState({items: this.props.manager.configMenuItems})
    }

    render() {
        const $this = this;
        let {items} = this.state;
        return (
            <ul>
              {items.map((item, key) => {
                  if (this.props.active.has(item.slug)) {
                      return (
                              <MenuItem
                          key={key}
                          item={item}
                          onClick={(evt) => $this.props.handleClick(evt, item.slug)} />);
                  }
              })}
            </ul>);
    }

}
