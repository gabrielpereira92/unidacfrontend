import React, { useState } from 'react';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const Example = ({ actions = [], item, title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {actions.map((action, index) => (
          <DropdownItem
            onClick={() => action.onClick(item)}
            key={index}
          >
            {action.name}

          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Example;