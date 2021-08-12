
import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from "axios";

import{
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
} from '../type';

const ContactState = props => {

    const initialState = {
        contacts : [],
        current: null,
        filtered: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    
    // Get Contacts
    
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Add contact
    
     const addContact = async contact => {
         const config = {
             headers: {
                 'Content-Type': 'application/json'
             }
         };

         try {
             const res = await axios.post('/api/contacts', contact, config);

             dispatch({
                 type: ADD_CONTACT,
                 payload: res.data
             });
         } catch (err) {
             dispatch({ 
                 type: CONTACT_ERROR,
                 payload: err.response.msg
            });
             
         }
        
     };

    // Delete contact
    
    const deleteContact = async id => {
        try {
            await axios.delete(`api/contacts/${id}`);
            dispatch({ 
                 type: DELETE_CONTACT,
                 payload: id
                });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
        }
        
    };

    // Set current contact
    
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update contact
    
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

       try {

        const updateField = await axios.put(`api/contacts/${contact._id}`, contact, config);
        dispatch({ type: UPDATE_CONTACT, payload: contact});

       } catch (err) {
           dispatch({
                type: CONTACT_ERROR,
                payload: err.response
            })
       }
        
    }

    // Filter contacts

    const filterContacts = text => {

        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    // Clear filter

    const clearFilter = () => {

        dispatch({ type: CLEAR_FILTER});
    }

    return(
        <ContactContext.Provider
        value = {{
            Contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
        >

            { props.children }

        </ContactContext.Provider>
    );
};

export default ContactState;