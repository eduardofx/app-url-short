import { UserLoginRequestDto } from './../src/users/dto/user-login-request.dto';
import { UpdateUserDto } from './../src/users/dto/update-user.dto';
import { UserLoginResponseDto } from './../src/users/dto/user-login-response.dto';
import { UserDto } from './../src/users/dto/user.dto';
import { Gender } from './../src/shared/enum/gender';
import { CreateUserDto } from './../src/users/dto/create-user.dto';

import { UpdateUrlDto } from './../src/url/dto/update-url.dto';
import { UrlDto } from './../src/url/dto/url.dto';
import { CreateUrlDto } from './../src/url/dto/create-url.dto';

export const createUrlDto: CreateUrlDto = {
    url: "http://google.com.br"
};

 
export const urlResponseDto1 = {
    ...UrlDto,
    newurl: 'http://localhost:3000/teste',
};

export const createUserDto1: CreateUserDto = {
    email: "eduardok.fx@gmail.com",
    password: '123456',
    firstName: 'Eduardo',
    lastName: 'Kawassaki',
    gender: Gender.male,
    birthday: '1989-06-30',
};

export const createUserDto2 = {
    email: "eduardok.fx2@gmail.com",
    password: '123456',
    lastName: 'Kawassaki',
    gender: Gender.male,
    birthday: '1989-06-30',
};

export const createUserDto3 = {
    ...createUserDto1,
    email: 'not-email',
};

export const createUserDto4 = {
    ...createUserDto1,
    birthday: 'not-valid-date',
};

export const createUserDto5 = {
    ...createUserDto1,
    gender: 'not-valid-gender',
};

export const userLoginRequestDto1: UserLoginRequestDto = {
    email: createUserDto1.email,
    password: createUserDto1.password,
};

export const userLoginRequestDto2: UserLoginRequestDto = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userLoginRequestDto3: UserLoginRequestDto = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userDto1: UserDto = {
    id: 'uuid/v4',
    email: "eduardok.fx@gmail.com",
    firstName: 'Eduardo',
    lastName: 'Kawassaki',
    gender: Gender.male,
    birthday: '1989-06-30',
};

export const userLoginResponseDto1: UserLoginResponseDto = {
    ...userDto1,
    token: 'token',
};

export const updateUserDto1: UpdateUserDto = {
    gender: Gender.female,
    birthday: '1996-07-17',
};

export const userDto2: UserDto = {
    ...userDto1,
    gender: Gender.female,
    birthday: '1996-07-17',
};
