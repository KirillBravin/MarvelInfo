import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComic.scss";

const SingleComic = (props) => {
  const [comics, setComics] = useState([]);

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [props.comicsId]);

  const updateComics = () => {
    const { comicsId } = props;
    if (!comicsId) {
      return;
    }

    clearError();
    getComics(comicsId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comics) ? (
    <View comics={comics} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comics }) => {
  const { title, thumbnail, description, pageCount, language, price } = comics;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">{language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <a href="#" className="single-comic__back">
        Back to all
      </a>
    </div>
  );
};

export default SingleComic;
