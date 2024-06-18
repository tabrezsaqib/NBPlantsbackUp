import React from "react"
import ReactHtmlParser from "react-html-parser"
import { useDispatch } from "react-redux"
import { triggerToolTip } from "../../redux/actions/getPlantsAction"
import styles from "../../styles/SideNavPopover.module.css"

const SideNavPopover = ({ triggerPopUp, popoverData, popoverStatus }) => {
  const dispatch = useDispatch()
  const cancelToolTip = (status) => {
    dispatch(triggerToolTip(status))
  }
  return (
    <div className="d-flex align-self-center">
      <h6
        data-bs-toggle="modal"
        className={[styles, "tooltipPopUp align-self-center"].join(" ")}
        data-bs-target="#sideNavPopUp"
        onClick={() => triggerPopUp([], false)}>
        <i className="bi bi-info-circle-fill" />
      </h6>

      <div
        className="modal fade"
        id="sideNavPopUp"
        style={{ zIndex: '10600' }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {popoverStatus == true &&
                  popoverData.length > 0 &&
                  popoverData[0].acf.glossary_name}
              </h5>
              <button
                type="button"
                onClick={() => cancelToolTip(false)}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {popoverStatus == true &&
                popoverData.length > 0 &&
                ReactHtmlParser(popoverData[0].acf.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNavPopover