import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./SearchBar.css";

const SearchBar = ({ search }) => {
  if (!search) {
    console.error("No search function, don't know what to do");
    return;
  }
  return (
    <Formik
      initialValues={{
        term: new URLSearchParams(window.location.search).get("term"),
      }}
      validationSchema={Yup.object().shape({
        term: Yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        search({ values }).then((res) => {
          setSubmitting(false);
        });
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} inline className="search-bar">
          <div
            className="d-flex search-wrapper"
            style={{
              width: "100%",
              border: "1px solid var(--primary)",
              borderRadius: ".25rem",
            }}
          >
            <Form.Control
              className="p-2"
              id="search-input"
              name="term"
              type="text"
              placeholder="Search for courses"
              onChange={handleChange}
              value={values.term || ""}
              style={{ border: 0, width: "100%" }}
            />
            <Button
              className="p-2"
              variant="outline-primary"
              type="submit"
              disabled={isSubmitting}
              style={{
                borderRadius: "0 .1rem .1rem 0",
                borderWidth: "0 0 0 1px",
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
