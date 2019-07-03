import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Form, Input, Button, Radio, Card, Table } from 'antd';
import { initListData, serchListData } from './../../store/actionCreators';

const { Header, Content } = Layout;
const FormItem = Form.Item;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTable: true,
    };
    this.columns = [
      {
        title: 'first_name',
        dataIndex: 'first_name',
      },
      {
        title: 'middle_name',
        dataIndex: 'middle_name',
      },
      {
        title: 'last_name',
        dataIndex: 'last_name',
      },
      {
        title: 'gender',
        dataIndex: 'gender',
      }
    ]
  }
  componentDidMount() {
    this.props.getListData();
  }

  handleChange = (e) => {  
    this.setState({
      isTable: e.target.value === 'table'?true:false
    })  
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { form, searchData } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        searchData(values.name)
      }
    });
  }

  handleFormReset = () => {
    const { form, getListData } = this.props;
    form.resetFields();
    getListData();
  }

  render() {
    const { isTable } = this.state;
    const { form: { getFieldDecorator }, listData } = this.props;
    return (
      <Fragment>
        <Header className='list-header'>
          医生名单  
          <Radio.Group onChange={this.handleChange} defaultValue="table" style={{marginLeft: "20px"}}>
            <Radio.Button value="table"><Icon type="table" /></Radio.Button>
            <Radio.Button value="profile"><Icon type="profile" /></Radio.Button>
          </Radio.Group>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className='tableListForm'>
            <Form onSubmit={this.handleSearch} layout="inline">
              <FormItem label="姓名">
                {getFieldDecorator('name')(<Input placeholder="请输入医生姓名" />)}
              </FormItem>
              <div style={{ overflow: 'hidden',display: 'inline-block' }}>
                <div>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    重置
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          {isTable ?
          <Card bordered={false} className={'tableList'}>
            <Table
              bordered
              loading={!listData.length}
              columns={this.columns}
              dataSource={listData}
              onChange={this.handleTableChange}
              pagination={{
                pageSize: 10,
                total: listData.length,
                showTotal: total => `共 ${total} 条`,
              }}
            />
          </Card> :
          <div>
            {
              listData.map((item, index) => {
                return(
                  <Card 
                    title={item.first_name}
                    bordered={false} 
                    style={{ width: 260, display:"inline-block",marginRight: "20px", marginBottom: "20px" }}
                    key={index}
                  >
                    <div className='imgBox'>
                      <img alt="example" src={item.image_url} />
                    </div>               
                    <p>{`middle_name: ${item.middle_name}`}</p>
                    <p>{`last_name: ${item.last_name}`}</p>
                    <p>{`gender: ${item.gender}`}</p>
                  </Card>
                )
              })
            }
          </div>}
        </Content>
      </Fragment>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    listData: state.listData
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    getListData(){
      const action = initListData();
      dispatch(action)
    },
    searchData(name){
      const action = serchListData(name);
      dispatch(action)
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(List));