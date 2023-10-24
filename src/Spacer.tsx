import styled from "@emotion/native";
import { Theme } from "@emotion/react";
import React from "react";
import { View } from "react-native";

type GridSpacerDirection = "vertical" | "horizontal";

type FlexSpacerProps = {
  direction?: never;
  gap?: never;
  flex: number;
};

type GridSpacerProps = {
  direction?: GridSpacerDirection;
  gap: number;
  flex?: never;
};

type Props = FlexSpacerProps | GridSpacerProps;

const SpacerToMemoize = ({ direction = "vertical", gap, flex }: Props) => {
  if (typeof flex === "number") {
    return <FlexSpacer flex={flex} />;
  }

  return <GridSpacer direction={direction} gap={gap} />;
};

const FlexSpacer = styled.View<{ flex: number }>(({ flex }) => ({
  flex,
}));

const GridSpacer = styled(View, {
  // flex and direction props are reserved props in React Native and should therefore not be forwarded !
  shouldForwardProp: (propName) =>
    propName !== "direction" && propName !== "gap",
})<{
  direction: GridSpacerDirection;
  gap: number;
}>(({ direction, gap, theme }) => ({
  ...(direction === "vertical"
    ? { height: gap }
    : { width: gap }),
}));

export const Spacer = React.memo(SpacerToMemoize);

