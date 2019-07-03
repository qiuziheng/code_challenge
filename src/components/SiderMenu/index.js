import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from './../../utils/pathTools';

const { Sider } = Layout;

export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path);
  });
};

class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
  }

  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return urlToList(pathname).map(itemPath => getMeunMatcheys(this.flatMenuKeys, itemPath).pop());
  };

  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  render() {
    const { menuData } = this.props;
    let selectedKeys = this.getSelectedMenuKeys();
    return (
      <Sider>
        <div className="logo" />
        <Menu 
          theme="dark" 
          mode="inline"
          selectedKeys={selectedKeys}
        >
          {menuData.map((item) => {
            return(
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SiderMenu);