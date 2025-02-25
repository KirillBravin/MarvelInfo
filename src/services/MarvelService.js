import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError, process, setProcess } =
    useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/"; // "_" is telling to other coders that we shouldn't change this variable :)
  const _apiKey = "apikey=bf37833ffee3e5550d39fa910f710bf2";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    // if no arg is used, defaults to baseOffset
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    // This is an async function as we're waiting for the result from getResource()
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]); //Request only one character
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : "No information about the number of pages",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}`
        : "not available",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      languages: comics.textObjects[0]?.language || "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    clearError,
    process,
    setProcess,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
