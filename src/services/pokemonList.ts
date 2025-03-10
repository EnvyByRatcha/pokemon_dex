import axios from "axios";
import { POKEMON_BASE_URL } from "@/utils/constant";
import { pokemonResponse } from "@/interface/pokemonList";
import { handleResponse, IResponse } from "@/utils/handleResponse";

interface getPokemonListResponse extends IResponse {
  data: pokemonResponse;
  status: number;
}

export const pokemonListService = {
  getPokemonList: async (
    offset?: number,
    limit?: number
  ): Promise<getPokemonListResponse> => {
    try {
      const res = await axios.get(`${POKEMON_BASE_URL}/pokemon`, {
        params: {
          offset: offset || 0,
          limit: limit || 151,
        },
      });

      return handleResponse.success(res);
    } catch (err: any) {
      return handleResponse.success(err);
    }
  },
};
