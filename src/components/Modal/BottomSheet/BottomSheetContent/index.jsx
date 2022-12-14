import React from 'react';
import styled from 'styled-components';

const SBottomSheetContent = styled.button`
  position: relative;

  width: 100%;
  padding: 1.2rem;
  background-color: inherit;
  color: ${({ theme }) => theme.TEXT};

  border-radius: 1rem;
  border: none;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.SEARCH_INPUT};
  }
`;

function BottomSheetContent({ onClick, text }) {
  return <SBottomSheetContent onClick={onClick}>{text}</SBottomSheetContent>;
}

export default BottomSheetContent;
