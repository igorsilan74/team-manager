import {
  setContacts,
  setIsLoading,
  fetchContacts
} from '../actions';
import {
  SET_CONTACTS,
  SET_ISLOADING,
  GET_FILTERED_LIST
} from '../actionTypes';
import axios from 'axios';
import { spy, stub } from 'sinon';
import { contactsListUrl } from '../urls';

describe('setContacts action creator', () => {
  const contacts = ['some contact'];

  it('creates a proper action object', () => {
    expect(setContacts(contacts)).toEqual({
      type: SET_CONTACTS,
      data: { contacts }
    });
  });
});

describe('setIsLoading action creator', () => {
  const isLoading = false;

  it('creates a proper action object', () => {
    expect(setIsLoading(isLoading)).toEqual({
      type: SET_ISLOADING,
      isLoading
    });
  });
});

describe('fetchContacts action creator', () => {
  const dispatchSpy = spy();
  const responseData = ['contact1', 'contact2'];
  const getStub = stub(axios, 'get')
    .resolves({ data: responseData });

  beforeAll(() =>
    fetchContacts()(dispatchSpy)
  );

  afterAll(() => {
    axios.get.restore();
  });

  it('should dispatch setIsLoading with true', () => {
    expect(dispatchSpy.getCall(0).args[0]).toEqual({
      type: SET_ISLOADING,
      isLoading: true
    });
  });

  it('makes a get request with list url', () => {
    expect(getStub.calledWith(contactsListUrl())).toEqual(true);
  });

  it('should dispatch setIsLoading with false after resolving request', () => {
    expect(dispatchSpy.getCall(1).args[0]).toEqual({
      type: SET_ISLOADING,
      isLoading: false
    });
  });

  it('should dispatch getFilteredContacts after resolving request', () => {
    expect(dispatchSpy.getCall(2).args[0]).toEqual({
      type: SET_CONTACTS,
      data: { contacts: responseData }
    });
  });


  it('should dispatch getFilteredContacts after resolving request', () => {
    expect(dispatchSpy.getCall(3).args[0]).toEqual({
      type: GET_FILTERED_LIST
    });
  });
});
