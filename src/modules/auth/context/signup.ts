import {atom} from 'jotai';
import {RegisterReq} from '../types/services';
import {REGISTER_ROLE} from '../types/enum';

export const signUpAtom = atom<RegisterReq>({
  givenName: '',
  surname: '',
  email: '',
  password: '',
  role: REGISTER_ROLE.ASSESOR,
});
