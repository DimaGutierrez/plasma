import React from 'react';
import PropTypes from 'prop-types';
import Base from '../Base.jsx';
import style from './style.scss';
import cn from 'classnames';
import _ from 'lodash';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    let selectedIndex = _.findIndex(props.items, 'selected');
    if (selectedIndex === -1) {
      selectedIndex = 0;
    }
    this.state = {
      selectedIndex
    };
  }
  onClick(tab, index) {
    this.setState({
      selectedIndex: index
    })
    if (this.props.onChange) {
      this.props.onChange(tab.label, index);
    }
  }
  onKeyDown(event, tab, index) {
    if (event.keyCode === 13 /* enter */) {
      this.onClick(tab, index);
    }
  }
  render() {
    return (
      <ul className={style.tabs} role="tablist">
        {_.map(this.props.items, (tab, index) => {

          const tabClasses = cn(style.tab, {
            [style.active]: this.state.selectedIndex === index,
            [style.first]: index === 0,
            [style.last]: index === this.props.items.length - 1
          });

          return (
            <li
              role="tab"
              onClick={() => this.onClick(tab, index)}
              onKeyDown={(event) => this.onKeyDown(event, tab, index)}
              className={tabClasses}
              key={index}
              tabIndex="0"
            >
              { tab.title }
            </li>
          );
        })}
      </ul>
    );
  }
}

Tabs.defaultProps = {
  items: [],
  onChange: function() { },
};

Tabs.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

Tabs.displayName = 'Tabs';

export default Base(Tabs);
