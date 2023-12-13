'use client';

/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000';

export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.set('file', image);

  const res = await axios.post<{ id: string }>(`${BASE_URL}/files`, formData);
  return res.data;
}
