import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import "./charForm.scss";

const CharForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("This field is required"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}>
      <Form className="char__form-position form">
        <h4 className="form__title">Or find a character by name:</h4>
        <input className="form__input" placeholder="Enter name"></input>
        <button className="button button__main">find</button>
        <button className="button button__main">to page</button>
      </Form>
    </Formik>
  );
};

export default CharForm;
