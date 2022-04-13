import {axiosClient}  from '../apiClient';

export const createScholarship = async (scholarship) => {
  return await axiosClient.post('/scholarship', scholarship);

}

export const updateScholarship = async (scholarship) => {
  return await axiosClient.put('/scholarship', scholarship);

}

export const searchSmartSholaship = async (objSearch) => {
  //search job
  console.log('service==========',objSearch)
  return axiosClient.get('/advance-search',{
    params:{
      ...objSearch
    }
  })
};