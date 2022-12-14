import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.style';
import emailValidAxios from '../../../api/emailValidAxios';
import Title from '../../../components/Title';
import AuthInputForm from '../../../components/AuthInputForm';
import { LARGE_BUTTON } from '../../../constants/buttonStyle';

import leftIcon from '../../../assets/icon/icon-arrow-left.png';

function SignUp() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const goToWelcomePage = () => {
    navigate('/welcome');
  };

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [checkPwValue, setCheckPwValue] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [checkPwValid, setCheckPwValid] = useState(false);

  const [emailWarningMsg, setEmailWarningMsg] = useState('');
  const [pwWarningMsg, setPwWarningMsg] = useState('');
  const [checkPwWarningMsg, setCheckPwWarningMsg] = useState('');

  const [buttonNotAllow, setButtonNotAllow] = useState(true);

  const handleEmailValue = (e) => {
    setSignUpEmail(e.target.value);
  };
  const handlePwValue = (e) => {
    setSignUpPassword(e.target.value);
  };
  const handleCheckPwValue = (e) => {
    setCheckPwValue(e.target.value);
  };

  useEffect(() => {
    const EMAIL_REGEX =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const PW_REGEX = /^[a-zA-Z0-9]{6,}$/;

    if (EMAIL_REGEX.test(signUpEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      setEmailWarningMsg('* 이메일 형식이 올바르지 않습니다.');
    }

    if (PW_REGEX.test(signUpPassword)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      setPwWarningMsg(
        '* 비밀번호는 영문, 숫자를 포함하여 6자 이상이어야 합니다.'
      );
    }

    if (signUpPassword === checkPwValue) {
      setCheckPwValid(true);
    } else {
      setCheckPwValid(false);
      setCheckPwWarningMsg('* 비밀번호가 일치하지 않습니다.');
    }
  }, [signUpEmail, signUpPassword, checkPwValue]);

  useEffect(() => {
    if (emailValid && passwordValid && checkPwValid) {
      return setButtonNotAllow(false);
    }
    return setButtonNotAllow(true);
  }, [emailValid, passwordValid, checkPwValid]);

  useEffect(() => {
    setSignUpEmail('');
    setSignUpPassword('');
    inputRef.current.focus();
  }, []);

  const handleJoinClick = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const res = await emailValidAxios.post('/emailvalid', {
          user: {
            email: signUpEmail,
          },
        });

        if (res.data.message === '이미 가입된 이메일 주소 입니다.') {
          setEmailValid(false);
          setEmailWarningMsg('* 이미 가입된 이메일입니다.');
          inputRef.current.focus();
        }

        if (res.data.message === '사용 가능한 이메일 입니다.') {
          navigate('/signup/profile', {
            state: {
              email: signUpEmail,
              password: signUpPassword,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [signUpEmail, buttonNotAllow]
  );

  return (
    <S.Container>
      <Title leftIcon={leftIcon} handleButtonClick={goToWelcomePage}>
        이메일로 회원가입
      </Title>
      <S.FormContainer>
        <AuthInputForm
          id="email"
          label="이메일"
          inputRef={inputRef}
          inputProps={{
            type: 'email',
            placeholder: '이메일을 입력해주세요.',
          }}
          handleSignUpState={handleEmailValue}
          signUpValid={emailValid}
          inputValue={signUpEmail}
          warningMsg={emailWarningMsg}
        />
        <AuthInputForm
          id="password"
          label="비밀번호"
          inputProps={{
            type: 'password',
            placeholder: '비밀번호를 입력해주세요.',
            autoComplete: 'off',
          }}
          handleSignUpState={handlePwValue}
          signUpValid={passwordValid}
          inputValue={signUpPassword}
          warningMsg={pwWarningMsg}
        />
        <AuthInputForm
          id="confirmPassword"
          label="비밀번호 확인"
          inputProps={{
            type: 'password',
            placeholder: '확인을 위해 비밀번호를 한번 더 입력해주세요.',
            autoComplete: 'off',
          }}
          handleSignUpState={handleCheckPwValue}
          signUpValid={checkPwValid}
          inputValue={checkPwValue}
          warningMsg={checkPwWarningMsg}
        />
        <S.SignUpButton
          text="회원가입"
          buttonStyle={LARGE_BUTTON}
          disabled={buttonNotAllow}
          onClick={handleJoinClick}
        />
      </S.FormContainer>
    </S.Container>
  );
}

export default SignUp;
