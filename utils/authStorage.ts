import { Preferences } from "@capacitor/preferences";

const TOKEN_KEY = "user_token";

// Simpan token
export async function setToken(token: string): Promise<void> {
  await Preferences.set({
    key: TOKEN_KEY,
    value: token,
  });
}

// Ambil token
export async function getToken(): Promise<string | null> {
  const result = await Preferences.get({ key: TOKEN_KEY });
  return result.value ?? null;
}

// Hapus token
export async function removeToken(): Promise<void> {
  await Preferences.remove({ key: TOKEN_KEY });
}
