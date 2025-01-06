import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(260);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let end = false;
    if (newCharList.length < 9) {
      end = true;
    }
    let charArr = [...charList, ...newCharList];
    setCharList((charList) => charArr);
    setNewItemLoading(false);
    setOffset(offset + 9);
    setCharEnded(end);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition key={item.id} timeout={500} classNames="my-char">
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el)}
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }}>
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
