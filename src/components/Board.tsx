import styled from 'styled-components';

export default styled.div`
  width: 80vh;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (orientation: portrait) {
    width: 80vw;
    height: 80vw;
  }
`;
