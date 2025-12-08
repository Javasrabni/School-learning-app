import { Storage } from "@capacitor/storage";

// Simpan token login
export const setToken = async (token: string) => {
  await Storage.set({ key: 'auth_token', value: token });
};

// Ambil token login
export const getToken = async () => {
  const { value } = await Storage.get({ key: 'auth_token' });
  return value;
};

// Hapus token saat logout
export const removeToken = async () => {
  await Storage.remove({ key: 'auth_token' });
};