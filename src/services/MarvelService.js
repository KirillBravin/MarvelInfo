

class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"; // "_" is telling to other coders that we shouldn't change this variable :)
    _apiKey = "apikey=bf37833ffee3e5550d39fa910f710bf2";

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) { // ok method tests if a given expression is true or not. If the expression evaluates to 0, or false, an assertion failure is being caused, and the program is terminated
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=300&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    }
}

export default MarvelService;