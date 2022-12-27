import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmHeader from '../../components/common/ConfirmHeader';
import Dialog from '../../components/Modal/Dialog';
import leftIcon from '../../assets/icon/icon-arrow-left.png';

import * as S from './index.style';

function index() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noPriceCheck, setNoPriceCheck] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const [imgFile, setImgFile] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputLink, setInputLink] = useState('');

  const [isError, setIsError] = useState(false);

  const textRef = useRef();
  const imageInput = useRef();

  const navigate = useNavigate();
  const goBackPage = () => {
    navigate(-1);
  };

  const handleResizeHeight = useCallback((e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 2}px`;
  }, []);

  const handleDialogOpen = (e) => {
    e.stopPropagation();
    setIsDialogOpen(!isDialogOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const handleImageAdd = () => {
    imageInput.current.click();
  };

  // 폼 제출 유효성 검사
  const handleSubmit = () => {
    if (readOnly === true) {
      setInputPrice('0');
    }

    if (imgFile && inputValue && inputPrice && inputLink) {
      console.log('myPick 등록');
      setIsError(false);
      // 서버 전송
      // goBackPage();
    } else {
      console.log('필수 입력사항을 입력해주세요.');
      setIsError(true);
      setIsDialogOpen(!isDialogOpen);
    }
  };

  const BASE_URL = `https://mandarin.api.weniv.co.kr`;

  const fetchImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post(
        `${BASE_URL}/image/uploadfile`,
        formData
      );
      return response.data.filename;
    } catch (error) {
      return error;
    }
  };

  const ReplaceNumber = (price) => {
    const onlyNumber = price.replace(/[^0-9]/g, '');
    setInputPrice(onlyNumber);
  };

  useEffect(() => {
    ReplaceNumber(inputPrice);
  }, [inputPrice]);

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
    handleResizeHeight(e);
  };

  const handlePriceChange = (e) => {
    setInputPrice(e.target.value);
  };

  const handleLinkChange = (e) => {
    setInputLink(e.target.value);
  };

  const [placeholderText, setPlaceholderText] =
    useState('숫자만 입력 가능합니다.');

  const handleCheck = (e) => {
    setNoPriceCheck(e.target.checked);
    if (noPriceCheck) {
      setPlaceholderText('숫자만 입력 가능합니다.');
      setReadOnly(false);
    } else {
      setInputPrice('');
      setPlaceholderText('');
      setReadOnly(true);
    }
  };

  return (
    <>
      <ConfirmHeader
        leftIcon={leftIcon}
        leftClick={goBackPage}
        rightClick={handleDialogOpen}
      />
      {isDialogOpen && (
        <Dialog
          handleClose={handleDialogOpen}
          handleSubmit={handleSubmit}
          dialogText="저장하시겠습니까?"
        />
      )}

      <S.Container>
        {isError && (
          <S.WarningMsg>* 필수 입력사항을 입력해주세요.</S.WarningMsg>
        )}
        <S.ImageContainer>
          <S.Imgtxt>myPick 이미지 등록</S.Imgtxt>
          <S.ImageInput onClick={handleImageAdd} />
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/tif, image/heic
            "
            ref={imageInput}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {imgFile && <S.img src={imgFile} alt="mypick 사진" />}
        </S.ImageContainer>
        <S.Label htmlFor="review">한줄평</S.Label>
        <S.Textarea
          onChange={handleValueChange}
          ref={textRef}
          value={inputValue}
          name=""
          id="review"
          cols="30"
          rows="1"
          maxLength="100"
          placeholder="한줄평을 남겨주세요. (100자)"
        />

        <S.Label htmlFor="price">가격</S.Label>
        <S.Textarea
          value={inputPrice}
          onChange={handlePriceChange}
          readOnly={readOnly}
          name=""
          id="price"
          cols="30"
          rows="1"
          placeholder={placeholderText}
        />
        <S.Checkbox
          onClick={handleCheck}
          type="checkbox"
          name=""
          id="read-only"
        />
        <S.LabelCheckBox htmlFor="read-only">
          <S.StyledP>가격 미정</S.StyledP>
        </S.LabelCheckBox>
        <S.Label htmlFor="link">링크</S.Label>
        <S.Textarea
          value={inputLink}
          onChange={handleLinkChange}
          name=""
          id="link"
          cols="30"
          rows="1"
          placeholder="http://naver.com"
        />
      </S.Container>
    </>
  );
}
export default index;
