
import { AnyObject } from '../types/AnyObject';
import { PaginationType } from '../types/PaginationType';
import axiosInstance from './AxiosInstance';


export const Get = async (url: string): Promise<PaginationType> => {
  const resp = await axiosInstance.get(url);
  const data = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const GetSingle = async (url: string): Promise<AnyObject> => {
  const resp = await axiosInstance.get(url);
  const data = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(data));
  return responseData;
};

export const Post = async (url: string, data: unknown): Promise<AnyObject> => {
  const resp = await axiosInstance.post(url, data);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const Put = async (
  url: string,
  id: string,
  data: unknown
): Promise<AnyObject> => {
  const jsonObject = data as { [key: string]: unknown };
  jsonObject.id = id;
  const resp = await axiosInstance.put(url + '/' + id, jsonObject);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const Delete = async (url: string, id: string): Promise<AnyObject> => {
  const resp = await axiosInstance.delete(url + '/' + id);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
};

export const ToggleUserActive = async (url: string, id: string): Promise<AnyObject> => {
  const resp = await axiosInstance.put(`${url}/ToggleActive/${id}`);
  const temp = await resp.data;
  const responseData: PaginationType = JSON.parse(JSON.stringify(temp));
  return responseData;
}