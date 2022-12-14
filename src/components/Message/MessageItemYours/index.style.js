import styled from 'styled-components';

export const MessageItemYours = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-left: auto;
`;

export const DialogBox = styled.div`
  position: relative;
  max-width: 24rem;
  padding: 1rem 1.2rem;
  background-color: #5095fa;
  border: 1px solid transparent;
  border-radius: 1rem;
  border-top-right-radius: 0;
  color: #fff;
`;

export const Time = styled.time`
  position: absolute;
  left: -3rem;
  bottom: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.SUB_TEXT};
`;

export const UploadedImgContainer = styled.div`
  position: relative;
  margin-right: auto;
  width: 24rem;
  height: 24rem;
  overflow: hidden;
`;

export const UploadedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;
