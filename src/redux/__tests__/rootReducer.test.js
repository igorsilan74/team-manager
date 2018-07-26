import {
  ADD_CONTACT,
  SET_CONTACTS,
  REMOVE,
  SET_CONTACT,
  SET_STATE,
  SAVE,
  GET_FILTERED_LIST,
  SET_SEARCH,
  SET_ISLOADING
} from '../actionTypes';
import { initialState } from '../rootReducer';
import { createMockStore } from '../testUtils';

describe('root reducer', () => {
  describe('when store is created', () => {
    const store = createMockStore(initialState);

    it('should create store with initial state', () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe(`when ${ADD_CONTACT} is dispatched`, () => {
    describe('when no contacts are present', () => {
      const store = createMockStore(initialState);
      const contactData = {
        id: 0,
        name: 'Tonya',
        phone: '+380993434234234',
        image: 'some image'
      };

      store.dispatch({
          type: ADD_CONTACT,
          data: contactData
      });

      it('should add first contact', () => {
        expect(store.getState().contacts).toEqual([contactData]);
      });
    });

    describe('when some contacts are present', () => {
      const initialContact = {
        id: 1,
        name: 'Vasya',
        phone: '+380933434234234',
        image: 'some image'
      };
      const store = createMockStore({
        ...initialState,
        contacts: [initialContact]
      });

      const contactData = {
        id: 0,
        name: 'Tonya',
        phone: '+380993434234234',
        image: 'some image'
      };

      store.dispatch({
          type: ADD_CONTACT,
          data: contactData
      });

      it('should add first contact', () => {
        expect(store.getState().contacts)
          .toEqual([initialContact, contactData]);
      });
    });
  });

  describe(`when ${REMOVE} is dispatched`, () => {
    describe('when contact to delete is present', () => {
      const store = createMockStore({
        ...initialState,
        contacts: [{
          id: 0,
          name: 'Tonya',
          phone: '+380993434234234',
          image: 'some image'
        }]
      });

      store.dispatch({
          type: REMOVE,
          id: 0
      });

      it('should delete contact', () => {
        expect(store.getState().contacts).toEqual([]);
      });
    });
  });
});
