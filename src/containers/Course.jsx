import React, { useState, useEffect } from "react";
import Config from "../config";
import { Jumbotron, Container, Button, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const Course = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    let id = window.location.pathname.split("/");
    id = id[id.length - 1];
    fetch(Config.serverUrl + "/course/" + id)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCourse(json);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="course">
      {!isLoading && (
        <Jumbotron>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <Formik
            initialValues={{ platform: "" }}
            validationSchema={Yup.object().shape({
              platform: Yup.string().required("Please select a platform"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setShow(false);
              setSubmitting(true);
              let platform = values.platform.split(":")[0].trim();
              let item = {
                id: course.id,
                course_name: course.name,
                picture_url: course.picture_url,
                platform: platform,
              };
              props.setCart(props.cart.concat(item));
              setShow(true);
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleSubmit, isSubmitting }) => (
              <>
                <Form onSubmit={handleSubmit} inline>
                  <Form.Group>
                    <Form.Label>Platform: </Form.Label>
                    <Form.Control
                      as="select"
                      name="platform"
                      onChange={handleChange}
                    >
                      {course.platforms.map((p, ind) => (
                        <option key={ind}>{`${p.name}: ${p.price}`}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="mx-2"
                    disabled={isSubmitting}
                  >
                    Add to cart
                  </Button>
                </Form>

                {show && (
                  <Alert
                    variant="success"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    Added to the cart
                  </Alert>
                )}
              </>
            )}
          </Formik>
        </Jumbotron>
      )}
    </Container>
  );
};

export default Course;
