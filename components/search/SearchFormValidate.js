import Router from "next/router"
import * as yup from "yup"
import { Formik } from "formik"
import "bootstrap-icons/font/bootstrap-icons.css"

const SearchFormValidate = ({ submitSearchQuery, search_bar }) => {
  return (
    <>
      <Formik
        initialValues={{ search: "" }}z
        onSubmit={(values, { setSubmitting }) => {
          submitSearchQuery(values["search"])

          Router.push({
            pathname: "/search",
            query: { keyword: values["search"] },
          })
        }}
        validationSchema={yup.object().shape({
          search: yup.string().required("Required"),
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
              <div className={search_bar == true ? "search-fluid" : "search"}>
                {/* {error ? <span className="input-feedback">{error}</span> : ""} */}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <i className="bi bi-search"></i>
                    <input
                      name="search"
                      type="text"
                      className={
                        errors.search && touched.search
                          ? "error"
                          : "form-control mb-3"
                      }
                      aria-describedby="search"
                      placeholder="Search Plants..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["search"]}
                    />
                    {errors.search && touched.search && (
                      <div className="input-feedback">{errors.search}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </Formik>
      <style jsx>{`
        .search {
          position: relative;
          height: 45px;
          width: 280px;
          box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
        }

        .search input {
          width: 280px;
          height: 45px;
          text-indent: 25px;
          border: 1px solid #d6d4d4;
        }
        .search .error {
          width: 280px;
          height: 45px;
          text-indent: 31px;
        }
        .input-feedback {
          color: #c56708;
          font-size: 14px;
          margin-top: -4px;
        }
        .search input:focus {
          box-shadow: none;
          border: 1px solid #43bccd !important;
        }

        .search .bi-search {
          position: absolute;
          top: 13px;
          left: 16px;
        }

        .search button {
          position: absolute;
          top: 5px;
          right: 5px;
          height: 35px;
          width: 80px;
          background: #0e9d47;
          border: 1px solid #0e9d47 !important;
        }

        .search-fluid {
          position: relative;
          height: 45px;
          width: 600px;
          box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
        }

        .search-fluid input:focus {
          box-shadow: none;
          border: 1px solid #43bccd !important;
        }

        .search-fluid button {
          position: absolute;
          top: 5px;
          right: 5px;
          height: 35px;
          width: 80px;
          background: #0e9d47;
          border: 1px solid #0e9d47 !important;
        }
        .search-fluid .bi-search {
          position: absolute;
          top: 13px;
          left: 16px;
          margin-right: 5px;
        }

        .search-fluid input {
          width: 600px;
          height: 45px;
          text-indent: 30px;
          font-size: 15px;
          border: 1px solid #d6d4d4;
        }
      `}</style>
    </>
  )
}

export default SearchFormValidate