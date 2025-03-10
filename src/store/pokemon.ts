import { create } from "zustand";
import type { pokemonDetailResponse } from "@/interface/pokmeonDetail";

const initStore = {
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  fetchPokemon: {
    data: [],
    loading: false,
    error: null,
  },
};

type pokemonType = {
  data: pokemonDetailResponse[];
  loading: boolean;
  error: null | any;
};

type pokemonListStoreType = {
  pokemon: pokemonType;
  fetchPokemon: pokemonType;
  setPokemonList: (value: pokemonType) => void;
  setfetchPokemonList: (value: pokemonType) => void;
  clearPokemonList: () => void;
};

export const pokemonListStore = create<pokemonListStoreType>((set) => ({
  ...initStore,
  setPokemonList: (value: pokemonType) => set({ pokemon: value }),
  setfetchPokemonList: (value: pokemonType) => set({ fetchPokemon: value }),
  clearPokemonList: () => set({ ...initStore }),
}));
