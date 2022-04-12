import {axiosClient}  from '../apiClient';

export const createScholarship = async (scholarship) => {
  return await axiosClient.post('/scholarship', scholarship);

}

export const updateScholarship = async (scholarship) => {
  return await axiosClient.put('/scholarship', scholarship);

}