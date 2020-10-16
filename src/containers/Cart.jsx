import React from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import CourseItem from "../components/CourseItem";
import { FieldArray, Formik } from "formik";

const Cart = ({ cart }) => {
  return (
    <Container className="cart">
      <Formik
        initialValues={{
          courses: Array.from(cart.data(), (v, k) => v[1]).map((value, ind) => {
            return { ...value };
          }),
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray name="courses">
              {({ remove }) => (
                <ListGroup>
                  {Array.from(cart.data(), (v, k) => v[1]).map((value, ind) => {
                    return (
                      <CourseItem
                        index={ind}
                        key={value.id}
                        {...value}
                        deleteItem={() => {
                          if (!cart.removeItem(value.id)) {
                            console.error(
                              "Not found the item in cart to delete"
                            );
                            return;
                          }

                          remove(ind);
                        }}
                        handleChange={handleChange}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    );
                  })}
                  <ListGroup.Item>
                    Total:{" "}
                    {values.courses
                      .reduce(
                        (acc, c) => acc + parseFloat(c.price) * c.count,
                        0
                      )
                      .toFixed(2)}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </FieldArray>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Cart;
