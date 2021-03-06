import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import DefaultModal from "../DefaultModal";
import "./Actions.css";

const Actions = ({ cart, course }) => {
  const [show, setShow] = useState(false); // showing alert about successful adding to cart
  const [status, setStatus] = useState("");

  return (
    <Card className="actions footer-on-small-devices">
      <Card.Body>
        <Formik
          initialValues={{ platform: "" }}
          validationSchema={Yup.object().shape({
            platform: Yup.string().required("Please select a platform"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setShow(false);
            setSubmitting(true);
            let courseInCart = cart.getItem(course.id);
            if (courseInCart) {
              setStatus("Already in the cart");
              setShow(true);
              setSubmitting(false);
              return;
            }
            const platform = values.platform;
            let item = {
              id: course.id,
              title: course.title,
              cover: course.cover,
              platforms: course.platforms,
              platform: platform,
              price: course.platforms.find((e) => e.name === platform).price,
              count: 1,
            };
            cart.setItem(course.id, item);
            setStatus("Added to the cart");
            setShow(true);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <>
              <Form onSubmit={handleSubmit} id="select-platform-input">
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="platform"
                    onChange={handleChange}
                    defaultValue="default"
                  >
                    <option disabled value="default" key={-1}>
                      -- select an platform --
                    </option>
                    {course.platforms.map((p, ind) => (
                      <option key={ind}>{p.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <div className="price">
                    {course.platforms.find((e) => e.name === values.platform)
                      ?.price || (
                      <div className="text-secondary font-weight-light">
                        Select to see price
                      </div>
                    )}
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    Add to cart
                  </Button>
                </div>
              </Form>
              <DefaultModal
                show={show}
                handleHide={() => setShow(false)}
                handleAccept={() => setShow(false)}
                bodyText={status}
                acceptButtonText="Ok"
              />
            </>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default Actions;
