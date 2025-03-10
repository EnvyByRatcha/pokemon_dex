import { pokemonListService, pokemonDetailService } from "@/services";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { pokemonListStore } from "@/store/pokemon";
import { generationList } from "@/utils/optionList";
import { pokemonDetailResponse } from "@/interface/pokmeonDetail";

const useSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setPokemonList, setfetchPokemonList, fetchPokemon } =
    pokemonListStore();

  const keyword = watch("keyword");
  const type = watch("type");
  const generation = watch("generation");
  const sortBy = watch("sortBy");

  const fetchData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    const res = await pokemonListService.getPokemonList(
      filter.offset,
      filter.limit
    );
    if (res.status === 200) {
      const responseResults = res.data.results || [];
      const pokeList = [];
      setfetchPokemonList({
        data: [],
        loading: true,
        error: null,
      });

      for (const pokemon of responseResults) {
        const response = await pokemonDetailService.getPokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        pokeList.push({
          ...pokeData,
          image: pokeData.sprites.other["official-artwork"].front_default,
        });
      }

      setfetchPokemonList({
        data: pokeList,
        loading: false,
        error: null,
      });
      

      const filterData = filterPokemon(pokeList, keyword, type, sortBy);

      setPokemonList({
        data: filterData,
        loading: false,
        error: null,
      });
    } else {
      setfetchPokemonList({
        data: [],
        loading: false,
        error: res.error,
      });
    }
  };

  const filterPokemon = (
    pokeList: pokemonDetailResponse[],
    keyword: string,
    type: string,
    sortBy: `id` | `name`
  ) => {
    const keywordFilter = pokeList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(keyword?.toLowerCase())
    );

    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((pokemon) =>
            pokemon.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : keywordFilter;

    return sortData(typeFilter, sortBy);
  };

  const sortData = (data: pokemonDetailResponse[], type: `id` | `name`) => {
    switch (type) {
      case `id`:
        return data.sort((a, b) => a.id - b.id);
      case `name`:
        return data.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      fetchData(generationList[generation]);
    }
    
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sortBy);
    // console.log(data);

    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword, type, sortBy]);

  return {
    fieldKeyword: register("keyword"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSortBy: register("sortBy"),
  };
};

export { useSearchForm };
