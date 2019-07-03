import axios from 'axios';
import * as constants from './actionTypes';


export const initListData = () => {
    return (dispatch)=>{
        axios.get('https://api.betterdoctor.com/2016-03-01/practices/1c966a62ce8e18707cf239389dc8e378/doctors/?limit=20&user_key=2d90accf45edb19e93e1b50a009d5a62')
        .then((res)=>{
            if(res.status === 200){
                const { data } = res;
                const listData = [];
                data.data.forEach((item,i)=> {
                    listData.push({
                        ...item.profile,
                        key: i,
                    })
                });
                dispatch({
                    type: constants.INIT_LIST_DATA,
                    listData,
                })
            }
        }).catch(()=>{
            console.log('数据请求失败！')
        })
    }
};

export const serchListData = (name) => {
    return (dispatch)=>{
        axios.get('https://api.betterdoctor.com/2016-03-01/practices/1c966a62ce8e18707cf239389dc8e378/doctors/?limit=20&user_key=2d90accf45edb19e93e1b50a009d5a62')
        .then((res)=>{
            if(res.status === 200){
                const { data } = res;
                const listData = [];
                data.data.forEach((item,i)=> {
                    if(item.profile.first_name.indexOf(name) !== -1){
                        listData.push({
                            ...item.profile,
                            key: i,
                        })
                    }
                });
                dispatch({
                    type: constants.INIT_LIST_DATA,
                    listData,
                })
            }
        }).catch(()=>{
            console.log('数据请求失败！')
        })
    }
};
