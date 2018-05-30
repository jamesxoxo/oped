import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: ${props => props.theme.inputPaddingY}
    ${props => props.theme.inputPaddingX};
  cursor: pointer;
  user-select: none;
  border: 1px solid ${props => props.theme.primary};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default Button;
