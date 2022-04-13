
import React, { useEffect, useState } from 'react'
import {searchSmart} from './api/job';
export default  function NetWorkService() {
  const [keyword, setKeyword] = useState('');
  const [listOfJob, setListOfJob] = useState([]);
  useEffect(()=>{
    searchSmart().then(res =>{
      if(res && res.data && res.data.content){
        setListOfJob(res.data.content)
      }
    })
  },[])
  const onChangeKeywords = (e) =>{
    console.log('===================== Nhan===================', e.target.value)
    setKeyword(e.target.value)
  }
  const onSearchSmartCV = async (e) =>{
    searchSmart({keyword: keyword}).then(res =>{
      if(res && res.data && res.data.content){
        setListOfJob(res.data.content)
      }
      
    });
  }
  return {
    onChangeKeywords,
    onSearchSmartCV,
    listOfJob
  }
}