import { Formik } from "formik"
import * as yup from "yup"
import React from "react"

const ContactForm = ({ login, error }) => {
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        onSubmit={(values, { setSubmitting }) => {
          login(values)
        }}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .matches(/^[A-Za-z ]*$/, "Please enter valid name")
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: yup.string().email().required("Required"),
          message: yup
            .string()
            .max(150, "Should be 150 characters or less")
            .required("Required"),
        })}>
        {(props) => {
          const {
            values,
            handleChange,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleSubmit,
          } = props
          return (
            <div>
              <div className="form-section form-section-on-mobile">
                {error ? <span className="input-feedback">{error}</span> : ""}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="bi bi-person-fill" />
                    </label>
                    <input
                      name="name"
                      type="text"
                      className={
                        errors.name && touched.name
                          ? "error"
                          : "form-control mb-3"
                      }
                      aria-describedby="name"
                      placeholder="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["name"]}
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="bi bi-envelope-fill" />
                    </label>
                    <input
                      name="email"
                      type="text"
                      className={
                        errors.email && touched.email
                          ? "error"
                          : "form-control mb-3"
                      }
                      aria-describedby="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["email"]}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">
                      <i className="bi bi-chat-square-dots-fill" />
                    </label>
                    <textarea
                      name="message"
                      type="text"
                      className={
                        errors.message && touched.message
                          ? "error"
                          : "form-control mb-3"
                      }
                      aria-describedby="message"
                      placeholder="Message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="5"
                      value={values["message"]}
                    />
                    {errors.message && touched.message && (
                      <div className="input-feedback">{errors.message}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </Formik>
      <style jsx>{`
        .btn-primary {
          background: #0e9d47;
          border: 1px solid #0e9d47 !important;
        }
        .form-control {
          padding-left: 40px;
        }
        textarea.form-control {
          padding-left: 40px;
          padding-top: 10px;
        }
        input.form-control {
          height: 50px;
        }
        .form-group {
          position: relative;
          label {
            position: absolute;
            left: 16px;
            top: 15px;
          }
        }
        textarea.error {
          border: 1px solid #ff6b6b;
          border-radius: 0.25rem;
          width: 100%;
          padding-left: 45px;
        }
        input.error {
          border: 1px solid #ff6b6b;
          height: 50px;
          border-radius: 0.25rem;
          width: 100%;
          padding-left: 45px;
        }
        .input-feedback {
          color: #ff6b6b;
          font-size: 14px;
          padding: 5px;
        }
      `}</style>
    </>
  )
}

export default ContactForm