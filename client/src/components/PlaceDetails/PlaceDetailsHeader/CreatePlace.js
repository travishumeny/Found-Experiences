import React from 'react';
import {connect} from 'react-redux'
import heartbookmark from '../../../assets/images/heart-bookmark.png'

const handleFormSubmit = (nameInput, addressInput, tipsInput, onCreate) => {
    const name = nameInput.value;
    const address = addressInput.value;
    const tipsarray = tipsInput.value;

    onCreate({ name, address, tipsarray });
};

const CreatePlace = ({
  id = 0,
  name = 'Name of Cafe',
  address = '123 Smith St.',
  phone = '(713) 777 7777',
  tipCount = '123',
  price = 3,
  rating = '8.8',
  tips = null,
  tipsarray = null,
  img = null,
  onCreate
}) => {
    let nameInput;
    let addressInput;
    let tipsInput;
    return (
        <form className="create-todo">
            <input
                type="hidden"
                value={name}
                ref={r => {
                    nameInput = r;
                }} />
              <input
                  type="hidden"
                  value={address}
                  ref={r => {
                      addressInput = r;
                  }} />
              <input
                  type="hidden"
                  value={JSON.stringify(tipsarray)}
                  ref={r => {
                      tipsInput = r;
                  }} />
            <button class="bookmark" onClick={(e) => {
                e.preventDefault();
                handleFormSubmit(nameInput, addressInput, tipsInput, onCreate);
            }}>
                <img src={heartbookmark}
                  alt="Bookmark"
                classname="heartbookmark"
                /></button>
        </form>
    );
};

const mapStateToProps = ({placeDetails}) => ({...placeDetails})

export default connect(mapStateToProps)(CreatePlace);
