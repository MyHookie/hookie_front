/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import leftIcon from '../../../assets/icon/icon-arrow-left.png';

import * as S from './index.style';
import ConfirmHeader from '../../../components/common/ConfirmHeader';
import Dialog from '../../../components/Modal/Dialog';

function MyPicksUpload() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [imgFile, setImgFile] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputLink, setInputLink] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(null);

  const [noPriceCheck, setNoPriceCheck] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [placeholderText, setPlaceholderText] =
    useState('숫자만 입력 가능합니다.');

  const [isError, setIsError] = useState(false);

  const [itemImage, setItemImage] = useState('');

  const [warningMsg, setWarningMsg] =
    useState('* 필수 입력사항을 입력해주세요.');

  const textRef = useRef();
  const imageInput = useRef();

  const BASE_URL = `https://mandarin.api.weniv.co.kr`;
  const NoPrice = '123415810423';

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

  const handleImgPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        setImgFile(reader.result);
        resolve();
      };
    });
  };
  const handleImageAdd = () => {
    imageInput.current.click();
  };

  const ReplaceNumber = (price) => {
    const onlyNumber = price.replace(/[^0-9]/g, '');
    setInputPrice(onlyNumber);
  };

  useEffect(() => {
    ReplaceNumber(inputPrice);
  }, [inputPrice]);

  const checkValidUrl = () => {
    const regex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regex.test(inputLink)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  };

  useEffect(() => {
    if (isValidUrl === false) {
      setIsError(true);
      setWarningMsg('* 유효하지 않은 링크입니다.');
    } else {
      setWarningMsg('');
    }
  }, [inputLink]);

  const handleValueChange = (e) => {
    setInputValue(e.target.value);
    handleResizeHeight(e);
  };

  const handlePriceChange = (e) => {
    setInputPrice(e.target.value);
  };

  const handleLinkChange = (e) => {
    setInputLink(e.target.value);
    handleResizeHeight(e);
    checkValidUrl();
  };

  const handleCheckBox = (e) => {
    setNoPriceCheck(!noPriceCheck);
    if (noPriceCheck) {
      setInputPrice('');
      setPlaceholderText('숫자만 입력 가능합니다.');
      setReadOnly(false);
    } else {
      setInputPrice(NoPrice);
      setPlaceholderText('');
      setReadOnly(true);
    }
  };

  const fetchImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post(
        `${BASE_URL}/image/uploadfile`,
        formData
      );
      setItemImage(`${BASE_URL}/${response.data.filename}`);
      setImgFile(itemImage);
      handleImgPreview(e.target.files[0]);
      return itemImage;
    } catch (error) {
      return error;
    }
  };

  const myPickData = {
    product: {
      itemName: inputValue,
      price: parseInt(inputPrice, 10),
      link: inputLink,
      itemImage,
    },
  };

  const uploadMyPick = async () => {
    const url = `${BASE_URL}/product`;
    try {
      const res = await axios(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          'Content-type': 'application/json',
        },
        data: myPickData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (imgFile && inputValue && inputPrice && isValidUrl) {
      uploadMyPick();
      setIsError(false);
      goBackPage();
    } else if (imgFile && inputValue && inputPrice && !isValidUrl) {
      setIsError(true);
      setWarningMsg('* 유효하지 않은 링크입니다.');
    } else {
      setIsError(true);
      setWarningMsg('* 필수 입력사항을 입력해주세요.');
    }
    setIsDialogOpen(!isDialogOpen);
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
        {isError && <S.WarningMsg>{warningMsg}</S.WarningMsg>}
        <S.ImageContainer>
          <S.Imgtxt>myPick 이미지 등록</S.Imgtxt>
          <S.ImageInput onClick={handleImageAdd} />
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, image/tif, image/heic
            "
            ref={imageInput}
            onChange={fetchImage}
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
          maxLength="13"
          placeholder={placeholderText}
        />
        <S.Checkbox
          onChange={handleCheckBox}
          checked={noPriceCheck}
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
          placeholder="https://hookie.netlify.app/"
        />
      </S.Container>
    </>
  );
}
export default MyPicksUpload;
