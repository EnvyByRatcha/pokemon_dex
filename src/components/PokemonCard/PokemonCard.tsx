import type { pokemonDetailResponse, Type } from "@/interface/pokmeonDetail";
import { Link } from "react-router";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: Type[];
}

export default function PokemonCard({
  id,
  name,
  image,
  types,
}: PokemonCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-md p-2 bg-[#97999B] transition-all hover:bg-gradient-to-r from-yellow-200 via-blue-300 to-pink-300">
      <div className="flex justify-between items-center px-4 pt-2 bg-[#2A3B47] rounded-t-lg">
        <Link to={`/detail/${name}`}>
          <h5 className="mb-2 text-md md:text-xl font-bold tracking-tight text-white  capitalize">
            {name}
          </h5>
        </Link>
        <h5 className="mb-2 text-md md:text-xl font-bold tracking-tight text-gray-300 ">
          #{id}
        </h5>
      </div>
      <div className="bg-[url('/images/poke-card-bg.png')] max-h-[218px] aspect-square w-full bg-center bg-cover">
        <Link
          to={`/detail/${name}`}
          className="flex justify-center items-center"
        >
          <img
            className="max-h-[218px] p-[40px] transition-all duration-300 hover:scale-150"
            src={image}
            alt="data.name"
          />
        </Link>
      </div>

      <div className="grow p-4 bg-[#2A3B47] rounded-b-lg">
        <div className="flex flex-wrap gap-2">
          {types?.map((item, index) => {
            return (
              <img
                className="max-h-[16px]"
                src={`/images/typePokemon/${item.type.name}.png`}
                key={index}
                alt={item.type.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
