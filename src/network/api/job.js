import {axiosClient}  from '../apiClient';

export const createJob = async (job) => {
  return await axiosClient.post('/job', job);

}

export const updateJob = async (job) => {
  return await axiosClient.put('/job', job);
}

export const searchSmartJob = async (objSearch) => {
  //search job
  console.log('service==========',objSearch)
  return axiosClient.get('/advance-search',{
    params:{
      ...objSearch
    }
  })
};