import axios from "axios";
import type { User } from "../models/User";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => axios.get<User[]>(API_URL);

export const createUser = (user: User) =>
  axios.post<User>(API_URL, user);

export const updateUser = (id: number, user: User) =>
  axios.put<User>(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
