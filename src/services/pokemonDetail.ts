import axios from "axios";
import { POKEMON_BASE_URL } from "@/utils/constant";
import { pokemonDetailResponse } from "@/interface/pokmeonDetail";
import { IResponse, handleResponse } from "@/utils/handleResponse";

interface getPokemonDetailResponse extends IResponse {
  data: pokemonDetailResponse;
  status: number;
}

export const pokemonDetailService = {
  getPokemonDetail: async (name: string): Promise<getPokemonDetailResponse> => {
    try {
      const res = await axios.get(`${POKEMON_BASE_URL}/pokemon/${name}`, {});
      return handleResponse.success(res);
    } catch (err: any) {
      return handleResponse.success(err);
    }
  },
};
