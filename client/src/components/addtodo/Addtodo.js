import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
export default class Addtodo extends Component {
  render() {
    return (
      <Formik
        initialValues={{  
          title: "",
          date: "",
          check:false,
        }}
        onSubmit={async (values) => {
          values.date = new Date();
          let result = await axios.post("https://mern-todolist-server.herokuapp.com/", values);
          let todo = result.data;
          this.props.appendList(todo);
          values.title = "";
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="title">Task description</label>
            <Field name="title" placeholder="To breath..." />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      
    );
  }
}
