import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import store from './store';
import routes from './routes';
import SiderMenu from './components/SiderMenu';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout style={{ minHeight: '100vh' }}>
            <SiderMenu 
              menuData={routes}
            />
            <Layout>
              <Switch>
                {routes.map((item) => {
                  return(
                    <Route exact path={item.path} component={item.component} key={item.path}></Route>
                  )
                })}
              </Switch>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
