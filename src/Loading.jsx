import React from "react";
import styled from "styled-components";

export default function Loading({ message = "Loading" }) {
  return (
    <Container>
      <SpinnerHolder>
        <p>{message}</p>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </SpinnerHolder>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  z-index: 9999;
  width: 95%;
  position: absolute;
`;

const SpinnerHolder = styled.div`
  text-align: center;
  background: #010101;
  color: #ffe;
  padding: 15px 20px;
  border-radius: 10px;
`;
