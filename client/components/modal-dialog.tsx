import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function ModalDialog({ isShow, onClose, data, title }: any) {
  console.log(isShow);

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isShow ? (
    <div className={`modal fade ${isShow ? "show d-block" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-dark">{data.message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onClose(true)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as any
    );
  } else {
    return null;
  }
}
