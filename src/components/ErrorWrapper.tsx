import styled from 'styled-components';

export default styled.div`
  background: #f00;
  width: 75%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .error-body {
    color: #fff;
    font-size: 25px;
    text-align: center;
    margin-bottom: 24px;
  }
  .btn{
    box-shadow: none;
    font-size: 18px;
    font-weight: 500;
    border-radius: 7px;
    padding: 10px 20px;
    cursor: pointer;
  }
`;
