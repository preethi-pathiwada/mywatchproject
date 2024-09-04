import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => (props.isDark ? `#181818` : `#f9f9f9`)};
  height: 100vh;
`
