import { useState } from "react"
import { connect, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { FileUploader } from "react-drag-drop-files"
import { postFileData } from "../../redux/actions/postFileDataAction"

const DataUploader = ({}) => {
  const dispatch = useDispatch()
  const fileTypes = ["JSON"]
  const [file, setFile] = useState(null)
  const handleChange = (file) => {
    // console.log(file)
    setFile(file)
    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = () => {
      const posts = JSON.parse(fileReader.result)
      for (let post of posts) {
        dispatch(postFileData(post))
      }
    }
    toast.success("Data uploaded successfully")
  }

  return (
    <>
      <div className="d-flex dropzone flex-column mb-4">
        <>
          <FileUploader
            handleChange={handleChange}
            classes="d-flex align-self-center"
            name="file"
            multiple={false}
            types={fileTypes}
          />
          <p className="text-center mt-3">
            {file ? `File name: ${file.name}` : "No files uploaded yet"}
          </p>
        </>
      </div>
      <style jsx>{`
        .dropzone {
          margin: 20px auto;
          width: 800px;
          height: 500px;
          background-color: #f8f9fa;
          border: 1px solid #e0e1e3;
          p {
            font-weight: 600;
          }
        }
        :global(.hyiOnG) {
          width: 100% !important;
          margin-top: 20px !important;
          max-width: 700px !important;
        }
      `}</style>
    </>
  )
}
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(DataUploader)