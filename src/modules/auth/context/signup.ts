import { atom } from 'jotai';
import { RegisterReq } from '../types/services';
import { REGISTER_ROLE } from '../types/enum';
import { ClientInfoRes } from '@/modules/dashboard/types';

export const signUpAtom = atom<RegisterReq>({
    givenName: '',
    surname: '',
    email: '',
    password: '',
    role: REGISTER_ROLE.ASSESOR,
});

