import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  font-size: 13px;
  color: ${props => (props.like ? `#2563eb` : `#64748b`)};
  display: flex;
  align-items: center;
  margin-right: 13px;
  font-weight: 500;
`
