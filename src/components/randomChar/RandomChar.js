import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
    /*     const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId);
    }; */
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    onCharLoading();
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  };

  const onTryClick = () => {
    updateChar();
    if (error) {
      setError(false);
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={onTryClick}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki } = char;

  const imgError_1 =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  const imgError_2 =
    "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";
  const imgCover = { height: "180px", width: "180px", objectFit: "cover" };
  const imgContain = { height: "180px", width: "180px", objectFit: "contain" };
  const checkStyle =
    thumbnail !== imgError_1 && thumbnail !== imgError_2
      ? imgCover
      : imgContain;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={checkStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
