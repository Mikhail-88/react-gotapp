export default class Service {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Error from ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource('/characters?page=5&pageSize=10');

    return res.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);

    return this._transformCharacter(character);
  }

  getAllBooks = async () => {
    const books = await this.getResource(`/books/`);

    return books.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);

    return this._transformBook(book);
  }

  getAllHouses = async () => {
    const houses = await this.getResource(`/houses/`);

    return houses.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}/`);

    return this._transformHouse(house);
  }

  _transformCharacter(character) {
    return {
      name: character.name,
      gender: character.gender,
      born: character.born,
      died: character.died,
      culture: character.culture,
      id: character.url.replace(/\D/g, '')
    }
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      founded: house.founded,
      coatOfArms: house.coatOfArms,
      id: house.url.replace(/\D/g, '')
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
      id: book.url.replace(/\D/g, '')
    }
  }
}