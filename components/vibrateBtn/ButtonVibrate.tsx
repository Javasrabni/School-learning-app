"use client"
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const vibrateBtn = async () => {
  await Haptics.impact({
    style: ImpactStyle.Heavy,
  });
};

export default function ButtonVibrate() {
  return (
    <button onClick={vibrateBtn}>
      Vibrate
    </button>
  );
}