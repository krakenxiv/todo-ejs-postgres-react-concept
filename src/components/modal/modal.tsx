import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { timestampToDateConvert } from '../../utilities/utilities';
import Todo from '../../models/todo';
import classes from './modal.module.scss';

interface ModalProps {
  actionName: string;
  id: string;
  previousName?: string;
  previousDescription?: string;
  updateModal: Function;
}

const Modal = (props: ModalProps) => {
  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [nameFocus, setNameFocus] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);

  const handleNameChange = (event: any) => {
    setNameValue(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescriptionValue(event.target.value);
  };

  const resetValues = () => {
    setNameValue('');
    setDescriptionValue('');
    setNameFocus(false);
    setDescriptionFocus(false);
  };

  const checkPreviousName = () => {
    if (nameFocus && nameValue === '') {
      return nameValue;
    } else if (props.previousName !== '' && nameValue === '') {
      return props.previousName;
    } else {
      return nameValue;
    }
    return '';
  };

  const checkPreviousDescription = () => {
    if (descriptionFocus && descriptionValue === '') {
      return descriptionValue;
    } else if (props.previousDescription !== '' && descriptionValue === '') {
      return props.previousDescription;
    } else {
      return descriptionValue;
    }
    return '';
  };

  return (
    <div>
      <div
        className="modal fade"
        id={props.id}
        aria-labelledby={props.id + '_label'}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editTodoModalLabel">
                {props.actionName} Todo{' '}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={resetValues}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <label className="input-group-text">
                  {props.actionName} Name
                </label>
                <input
                  className="form-control"
                  id="Name"
                  ref={nameInputRef}
                  onFocus={() => {
                    setNameFocus(true);
                    setDescriptionFocus(false);
                  }}
                  onChange={handleNameChange}
                  value={checkPreviousName()}
                />
              </div>
              <div className={`input-group mb-3`}>
                <label className="input-group-text">
                  {props.actionName} Description
                </label>
                <input
                  className="form-control"
                  id="Description"
                  ref={descriptionInputRef}
                  onFocus={() => {
                    setDescriptionFocus(true);
                    setNameFocus(false);
                  }}
                  onChange={handleDescriptionChange}
                  value={checkPreviousDescription()}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  resetValues();
                  props.updateModal(nameValue, descriptionValue);
                }}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
