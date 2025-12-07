"use client"
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const vibrateBtn = async () => {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(100); // langsung Vibrator Android
    }
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch (err) {
    console.error("Vibrate error:", err);
  }
};