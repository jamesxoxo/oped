import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding-top: ${props => props.theme.inputPaddingY};
  padding-right: ${props => props.theme.inputPaddingX};
  padding-bottom: ${props => props.theme.inputPaddingY};
  padding-left: ${props => props.theme.inputPaddingX};
  cursor: pointer;
  user-select: none;
  border: 1px solid ${props => props.theme.primary};

  & + & {
    border-left: 0;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default Button;
