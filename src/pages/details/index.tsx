import { pokemonDetailService } from "@/services";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { pokemonDetailResponse } from "@/interface/pokmeonDetail";

type pokemonType = {
  data?: pokemonDetailResponse;
  loading: boolean;
  error: null | any;
};

const tab = ["About", "Base Stats", "Evolution", "Move"];

export default function DetailPage() {
  const { name } = useParams();
  const [active, setActive] = useState<number>(0);

  const [pokemon, setPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const pokemonH = pokemon.data?.height;
  const pokemonW = pokemon.data?.weight;

  const fetchData = async (name: string) => {
    const res = await pokemonDetailService.getPokemonDetail(name);

    if (res.status === 200) {
      if (res.data) {
        const maxStat = () => {
          let max = Number.MIN_VALUE;
          for (let i = 0; i < res.data.stats.length; i++) {
            const target = res.data.stats[i].base_stat;
            if (target > max) {
              max = target;
            }
          }

          if (max <= 100) {
            return 100;
          }
          if (max <= 150) {
            return 150;
          }
          if (max <= 200) {
            return 200;
          }
        };

        setPokemon({
          data: {
            ...res.data,
            image: res.data.sprites.other["official-artwork"].front_default,
            maxStats: maxStat(),
          },
          loading: false,
          error: null,
        });
      }
    } else {
      setPokemon({
        data: undefined,
        loading: false,
        error: res.error,
      });
    }
  };

  useEffect(() => {
    if (name) {
      fetchData(name);
    }
  }, [name]);

  return (
    <div className="w-[90%] mx-auto max-w-7xl">
      <div className="flex justify-center">
        <Link to="/">
          <img
            src="/images/logo.webp"
            className="max-h-[120px] my-8 transition-all duration-200 hover:scale-125"
            alt=""
          />
        </Link>
      </div>

      <div className="w-[100%] max-w-xl mx-auto flex">
        <div className="grid grid-rows-1 w-full items-center">
          <div className="">
            <div className="text-white text-center capitalize text-3xl font-bold">
              {pokemon.data?.name}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pokemon.data?.types.map((t) => {
                return (
                  <img
                    src={`/images/typePokemon/${t.type.name}.png`}
                    key={t.type.name}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="relative bg-[url('/images/pokemon_bg.png')] bg-center aspect-square bg-cover">
              <img
                src={pokemon.data?.image}
                alt=""
                className="absolute top-[25%] left-[25%] h-[50%]"
              />
            </div>
          </div>

          <div className="bg-[#0E61A7] bg-opacity-10 rounded-xl h-fit mt-[20px]">
            <ul className="flex justify-around py-2">
              {tab.map((t, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => setActive(index)}
                      className={`${
                        active === index
                          ? "text-white border-white"
                          : "border-gray-700 text-gray-400"
                      } p-2 border-b-2  duration-200 hover:border-white py-2 hover:text-white`}
                    >
                      {t}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className={` mt-2 px-4 sm:px-[40px] pt-4 pb-8 text-white ${
                active === 0 ? "block" : "hidden"
              } `}
            >
              <div className="space-y-4">
                <div className="flex justify-between border-b-2 pb-2 border-gray-700">
                  <div className="text-white">Height</div>
                  <div>{`${
                    pokemonH &&
                    Number(((pokemonH / 10) * 39.3700787).toFixed(1))
                  }" (${pokemonH && pokemonH / 10}m)`}</div>
                </div>

                <div className="flex justify-between border-b-2 pb-2 border-gray-700">
                  <div className="text-white">Wieght</div>
                  <div>{`${
                    pokemonW &&
                    Number(((pokemonW / 10) * 2.20462262).toFixed(1))
                  } lbs  (${pokemonW && pokemonW / 10}) kg`}</div>
                </div>

                <div className="flex justify-between border-b-2 pb-2 border-gray-700">
                  <div className="text-white">Ability</div>
                  <div className="space-y-2">
                    {pokemon.data?.abilities.map((abi) => {
                      return (
                        <div
                          className="capitalize bg-[#0E61A7] bg-opacity-30 p-2 rounded-lg text-center"
                          key={abi.ability.name}
                        >
                          {abi.ability.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={` mt-2 px-4 sm:px-[40px] pt-4 pb-8 text-white ${
                active === 1 ? "block" : "hidden"
              } `}
            >
              <div className="gap-4 space-y-2">
                {pokemon.data?.stats.map((stat) => {
                  return (
                    <div className="flex items-center" key={stat.stat.name}>
                      <div className="min-w-[148px] text-gray-400 capitalize">
                        {stat.stat.name}
                      </div>
                      <div className="w-[80px]">{stat.base_stat}</div>
                      <div className="w-full ml-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-[#70BC8E] h-2.5 rounded-full"
                          style={{
                            width: `${
                              pokemon.data?.maxStats &&
                              (stat.base_stat * 100) / pokemon.data?.maxStats
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-2 px-4 sm:px-[40px] pt-4 pb-8 text-white text-center ${
                active === 2 ? "block" : "hidden"
              } `}
            >
              wait for update
            </div>

            <div
              className={`mt-2 px-8 pt-2 pb-8 text-white ${
                active === 3 ? "block" : "hidden"
              } `}
            >
              <div className="grid grid-cols sm:grid-cols-2 gap-2">
                {pokemon.data?.moves.map((m) => {
                  return (
                    <div
                      key={m.move.name}
                      className="capitalize bg-[#0E61A7] bg-opacity-50 p-2 rounded-lg"
                    >
                      {m.move.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
