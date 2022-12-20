import styled from 'styled-components';
import uploadFileIcon from '../../assets/upload-file_grey.png';

export const ChattingBar = styled.form`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 6rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color.WHITE};
  padding: 0 2rem;
  border-top: 1px solid #dddddd;
`;

export const UploadFileIcon = styled.img.attrs({
  src: `${uploadFileIcon}`,
})`
  width: 3.6rem;
  height: 3.6rem;
`;

export const MessageInput = styled.input`
  display: block;
  width: 80%;
  margin-left: 1.8rem;
  padding: 1.2rem 0;
  border-style: none;
  font-size: ${({ theme }) => theme.fontSize.MEDIUM};
  color: ${({ theme }) => theme.color.DARK_GRAY};

  &::placeholder {
    color: ${({ theme }) => theme.color.LIGHT_GRAY};
  }
`;

export const MessageSend = styled.button`
  width: 15%;
  margin-left: 1rem;
  padding: 1.2rem 0;

  color: ${({ inputText, theme }) =>
    inputText ? theme.color.ACTIVE_BLUE : theme.color.LIGHT_GRAY};

  &:active {
    color: ${({ theme }) => theme.color.ACTIVE_BLUE};
  }
`;
