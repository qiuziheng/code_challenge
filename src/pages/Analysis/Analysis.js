import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { initListData } from './../../store/actionCreators';

const { Header, Content } = Layout;

class Analysis extends Component {

  componentDidMount() {
    this.props.getListData();
  }

  getOption = () => {
    return {
      title : {
        text: '医生男女比例图',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['男','女']
      },
      series : [
        {
          name: '医生数量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: this.getPieData(),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  getPieData = () => {
    const { listData } = this.props;
    let male = 0;
    let female = 0;
    listData.forEach((item) => {
      if(item.gender === "male"){
        male++
      }
      if(item.gender === "female"){
        female++
      }
    })
    return [ 
      {value:male, name:'男'},
      {value:female, name:'女'},
    ]
  }

  render() {
    return (
      <Fragment>
        <Header className='list-header'>
          分析
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div style={{ height: '500px',backgroundColor: "#fff" }}>
            <ReactEcharts
              option={this.getOption()}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);