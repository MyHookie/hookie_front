import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import axios from 'axios';
import * as S from './index.style';

function MyPickModal({ myPickId, handleClose }) {
  const navigate = useNavigate();

  const BASE_URL = `https://mandarin.api.weniv.co.kr`;

  const getMyPickItemDetail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/detail/${myPickId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
            'Content-type': 'application/json',
          },
        }
      );

      setMyPickItemInfo(response.data.product);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getMyPickItemDetail();
  }, []);

  console.log(myPickItemInfo);

  const noPrice = parseInt(123415810423, 10);
  const wonPrice = new Intl.NumberFormat('ko-KR').format(myPickItemInfo.price);

  const handleMyPickEdit = () => {
    console.log('수정합니다');
    navigate('/mypicks/edit', {
      state: {
        myPickId,
      },
    });
  };

  const handleMyPickDelete = () => {
    console.log('삭제합니다');
  };

  return (
    <>
      {createPortal(
        <S.Container>
          <S.ModalBackGround onClick={handleClose} />
          <S.ModalContainer>
            <S.ModalTitle>myPick</S.ModalTitle>
            <S.OptionContainer>
              <S.EditBtn onClick={handleMyPickEdit}>수정</S.EditBtn>
              <S.DeleteBtn onClick={handleMyPickDelete}>삭제</S.DeleteBtn>
              <S.CloseModalBtn onClick={handleClose} />
            </S.OptionContainer>
            <S.ImageContainer>
              <S.MyPickItemImg
                src={myPickItemInfo.itemImage}
                alt="myPick 이미지"
              />
            </S.ImageContainer>
            <S.TextContainer>
              <S.ContentTitle>한줄평</S.ContentTitle>
              <S.Contents>{myPickItemInfo.itemName}</S.Contents>
            </S.TextContainer>
            <S.TextContainer>
              <S.ContentTitle>가격</S.ContentTitle>
              <S.Contents>
                {noPrice === myPickItemInfo.price
                  ? `가격 미정`
                  : `${wonPrice}원`}
              </S.Contents>
            </S.TextContainer>
            <S.TextContainer>
              <S.ContentTitle>링크</S.ContentTitle>
              <S.Contents>{myPickItemInfo.link}</S.Contents>
            </S.TextContainer>
          </S.ModalContainer>
        </S.Container>,

        document.getElementById('mypick-modal')
      )}
    </>
  );
}

export default MyPickModal;