import { generationList, typesList, sortList } from "@/utils/optionList";
import { useSearchForm } from "@/components/SearchForm";

function SearchForm() {
  const { fieldKeyword, fieldGeneration, fieldType, fieldSortBy } =
    useSearchForm();
  return (
    <form className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label
          htmlFor="generation"
          className="block mb-2 text-md font-medium text-white"
        >
          Generation
        </label>
        <select
          {...fieldGeneration}
          id="generation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {generationList.map((gen, index) => {
            return (
              <option
                className="capitalize"
                key={`Generation_${index}`}
                value={index}
              >
                {gen.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-md font-medium text-white"
        >
          Type
        </label>
        <select
          {...fieldType}
          id="type"
          className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {typesList.map((type, index) => {
            return (
              <option
                className="capitalize"
                key={`TypeList_${index}`}
                value={type}
              >
                {type}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label
          htmlFor="sortBy"
          className="block mb-2 text-md font-medium text-white"
        >
          Sort By
        </label>
        <select
          {...fieldSortBy}
          id="sortBy"
          className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {sortList.map((sort, index) => {
            return (
              <option
                className="capitalize"
                key={`SortList${index}`}
                value={sort}
              >
                {sort}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label
          htmlFor="keyword"
          className="block mb-2 text-md font-medium text-white"
        >
          Search
        </label>
        <input
          {...fieldKeyword}
          type="text"
          id="keyword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
      </div>
    </form>
  );
}

export default SearchForm;
