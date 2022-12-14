import React from 'react';
import * as S from './index.style';

function MessageItem({ text, time, img }) {
  return (
    <S.MessageItem>
      <S.ProfileImg />
      {img ? (
        <S.UploadedImgContainer>
          <S.UploadedImg src={img} />
          <S.Time>{time}</S.Time>
        </S.UploadedImgContainer>
      ) : (
        <S.DialogBox>
          {text} <S.Time>{time}</S.Time>
        </S.DialogBox>
      )}
    </S.MessageItem>
  );
}

export default MessageItem;
