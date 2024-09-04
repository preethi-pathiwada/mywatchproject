import styled from 'styled-components'

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  width: 100%;
  height: 30%;
  background-size: cover;
  padding: 15px 10px 15px 10px;
  display: ${props => (props.bannerOpen ? `flex` : `none`)};
  flex-direction: column;

  @media all and (max-width: 767px) {
    height: 32%;
    padding: 0px 0px 0px 20px;
  }
`
