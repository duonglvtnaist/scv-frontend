import { axiosClient } from '../apiClient';

export const createJob = async (job) => {
  return await axiosClient.post('/job', job);

}

export const updateJob = async (job) => {
  return await axiosClient.put('/job', job);

}