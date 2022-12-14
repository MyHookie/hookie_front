import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Title from '../../../components/Title';
import FormInput from '../../../components/FormInput';
import Button from '../../../components/common/Button';
import { LARGE_BUTTON } from '../../../constants/buttonStyle';
import { signUpEmail, signUpPassword } from '../../../atoms/auth';

import leftIcon from '../../../assets/icon/icon-arrow-left.png';

const SContainer = styled.div`
  padding: 3.4rem;
  height: 100vh;
`;

const FormContainer = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

//

function SignUp() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/welcome');
  };

  const [signUpEmailValue, setSignUpEmailValue] = useRecoilState(signUpEmail);
  const [signUpPasswordValue, setSignUpPasswordValue] =
    useRecoilState(signUpPassword);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailValue = (e) => {
    setSignUpEmailValue(e.target.value);
  };
  const handlePwValue = (e) => {
    setSignUpPasswordValue(e.target.value);
  };

  const checkIsValid = useCallback(() => {
    const email = signUpEmailValue;
    const password = signUpPasswordValue;
    const EMAIL_REGEX =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const PW_REGEX = /^[a-zA-Z0-9]{6,16}$/;

    if (EMAIL_REGEX.test(email) || !email) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    if (PW_REGEX.test(password) || !password) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    console.log(passwordValid);
  });

  return (
    <SContainer>
      <Title leftIcon={leftIcon} handleButtonClick={handleButtonClick}>
        이메일로 회원가입
      </Title>
      <FormContainer>
        <FormInput
          id="email"
          label="이메일"
          inputProps={{
            type: 'email',
            placeholder: '이메일 주소를 입력해주세요.',
          }}
          warningMsg="* 이미 가입된 이메일 주소입니다."
          handleSignUpState={handleEmailValue}
          onBlur={checkIsValid}
        />
        <FormInput
          id="password"
          label="비밀번호"
          inputProps={{
            type: 'password',
            placeholder: '비밀번호를 입력해주세요.',
            autoComplete: 'off',
          }}
          handleSignUpState={handlePwValue}
          onBlur={checkIsValid}
        />
        <FormInput
          id="confirmPassword"
          label="비밀번호 확인"
          inputProps={{
            type: 'password',
            placeholder: '비밀번호를 한번 더 입력해주세요.',
            autoComplete: 'off',
          }}
        />
        <Button text="회원가입" buttonStyle={LARGE_BUTTON} />
      </FormContainer>
    </SContainer>
  );
}

export default SignUp;
