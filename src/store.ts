import create from "zustand";

export type Store = {
  bears: number;
  width: number;
  height: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useStore = create<Store>(
  (set): Store => ({
    bears: 10,
    width: 10,
    height: 10,
    increasePopulation: () =>
      set(state => {
        return { bears: state.bears + 1 };
      }),
    removeAllBears: () => set({ bears: 0 }),
  })
);
