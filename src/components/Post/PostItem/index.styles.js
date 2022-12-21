import styled, { css } from 'styled-components';
import Slider from 'react-slick';

import { multiEllipsis } from '../../../styles/Util';

export const PostItem = styled.li`
  position: relative;
  width: 100%;
  padding: 1.8rem;
  border: 1px solid ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: 1rem;

  ${({ detail }) =>
    detail &&
    css`
      border: none;
    `}
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;
  gap: 1.4rem;
  img {
    width: 5rem;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.MEDIUM};
`;

export const AccountName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.SMALL};
  color: ${({ theme }) => theme.color.GRAY};
  margin-bottom: 0.4rem;
`;

export const Contents = styled.div`
  ${multiEllipsis}
  font-size: ${({ theme }) => theme.fontSize.MEDIUM};

  margin-bottom: 1.4rem;

  ${({ detail }) =>
    detail &&
    css`
      overflow: auto;
      display: block;
    `}
`;

export const TagList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 2rem;

  .slick-dots {
    li {
      margin: -0.2rem;
    }
  }
`;

export const Image = styled.img`
  height: 23rem;
  object-fit: contain;
  border-radius: 1rem;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 0.3rem;
  gap: 0.5rem;
`;

export const IConContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.MEDIUM};
  color: ${({ theme }) => theme.color.GRAY};

  img {
    width: 2.2rem;
    margin-right: 0.7rem;
  }
`;

export const Date = styled.time`
  font-size: ${({ theme }) => theme.fontSize.SMALL};
  color: ${({ theme }) => theme.color.GRAY};
`;

export const VerticalButton = styled.button`
  position: absolute;
  top: 1.4rem;
  right: 1.3rem;

  width: 1.8rem;
`;