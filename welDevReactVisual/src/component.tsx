import * as React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  position: relative;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 30%;
  min-width: 100px;
  min-height: 100px;
  background: palevioletred;
  transition: fill 0.5s;
  &:hover {
    background: #FFDBE9;
  }
`;

const StyledLabel = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #FFFAFA;
  position: relative;
  top: -30px;
  margin: 50% 0 0 0;
  transition: fill 0.5s;
  ${StyledCard}:hover & {
    background: #FFDBE9;
    color: black;
  }
`;

export interface State {
  textLabel: string;
  measureValue: string;
  size: number;
}

export const initialState: State = {
  textLabel: "",
  measureValue: "",
  size: 200
};

export class ReactCard extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  private static updateCallback: (data: object) => void = null;

  public static update(newState: State) {
    if (typeof ReactCard.updateCallback === "function") {
      ReactCard.updateCallback(newState);
    }
  }

  public state: State = initialState;

  public componentDidMount() {
    ReactCard.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    ReactCard.updateCallback = null;
  }

  render() {
    const { textLabel, measureValue, size } = this.state;
    const style: React.CSSProperties = { width: size, height: size };

    return (
      <StyledCard style={style}>
        <StyledLabel>
          {textLabel}
          <br />
          {measureValue}
        </StyledLabel>
      </StyledCard>
    );
  }
}

export default ReactCard;
