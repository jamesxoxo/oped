import styled from 'styled-components';

const FormControl = styled.input`
  display: block;
  width: 100%;
  padding-top: ${props => props.theme.inputPaddingY};
  padding-right: ${props => props.theme.inputPaddingX};
  padding-bottom: ${props => props.theme.inputPaddingY};
  padding-left: ${props => props.theme.inputPaddingX};
  border: 1px solid ${props => props.theme.grey};
`;

export default FormControl;
