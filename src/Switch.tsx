import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import React from "react";
import {
  AccessibilityState,
  AccessibilityValue,
  Pressable,
} from "react-native";
import Animated, {
  Layout,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Spacer } from "./Spacer";

const sizes = {
  circle: 28,
  padding: 2,
  width: 70,
};

const CIRCLE_TO_BORDER_SPACING = 2;

export type SwitchState = "on" | "off";

const createSwitchStyle = () =>
  ({
    off: {
      background: {
        color: "grey",
      },
      foreground: {
        color: "white",
      },
    },
    on: {
      background: {
        color: "green",
      },
      foreground: {
        color: "white",
      },
    },
    loaderColor: "white",
    disabledOpacity: 0.5,
  }) as const;

interface Props {
  color?: "primary" | "negative";
  isDisabled?: boolean;
  isChecked: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityValueText?: string;
  accessibilityLabelledBy?: string;
}

const ANIMATION_DURATION = 300;

const ToggleComponent = ({
  color = "primary",
  isDisabled = false,
  isChecked,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityValueText,
  accessibilityLabelledBy,
}: Props) => {
  const switchStyle = createSwitchStyle();

  const onBackgroundColor = switchStyle.on.background.color;
  const offBackgroundColor = switchStyle.off.background.color;
  const onForegroundColor = switchStyle.off.foreground.color;
  const offForegroundColor = switchStyle.on.foreground.color;

  const transitionProgress = useDerivedValue(() => {
    return withTiming(isChecked ? 0 : 1, { duration: ANIMATION_DURATION });
  }, [isChecked]);

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [onBackgroundColor, offBackgroundColor],
    );
    return { backgroundColor };
  });

  const circleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [offForegroundColor, onForegroundColor],
    );
    return { backgroundColor };
  });

  return (
    <Pressable disabled={isDisabled} onPress={onPress}>
      <Background
        style={backgroundStyle}
        accessible
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityLabelledBy={accessibilityLabelledBy}
        accessibilityValue={getAccessibilityValue({
          accessibilityValueText,
          isChecked,
        })}
        accessibilityState={getAccessibilityState({ isChecked })}
      >
        <AnimatedContentContainer
          // If the style is not inline, the layout animation does not work
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { flexDirection: isChecked ? "row" : "row-reverse" },
            isDisabled ? { opacity: switchStyle.disabledOpacity } : undefined,
          ]}
        >
          <Spacer flex={1} />
          <IconCircle
            layout={Layout.duration(ANIMATION_DURATION)}
            style={circleStyle}
          />
          <Spacer direction="horizontal" gap={CIRCLE_TO_BORDER_SPACING} />
        </AnimatedContentContainer>
      </Background>
    </Pressable>
  );
};

export const Switch = React.memo(ToggleComponent);

type GetAccessibilityValueParams = {
  accessibilityValueText: Props["accessibilityValueText"];
  isChecked: Props["isChecked"];
};

const getAccessibilityValue = ({
  accessibilityValueText,
}: GetAccessibilityValueParams): AccessibilityValue | undefined => {
  if (accessibilityValueText) {
    return { text: accessibilityValueText };
  }

  return undefined;
};

type GetAccessibilityStateParams = Pick<Props, "isChecked">;

const getAccessibilityState = ({
  isChecked,
}: GetAccessibilityStateParams): AccessibilityState => {
  return { checked: isChecked };
};

const Background = styled(Animated.View)(({ theme }) => ({
  width: sizes.width, // Fixed size because the texts for the 2 positions are not the same size
  height: sizes.circle + CIRCLE_TO_BORDER_SPACING * 2,
  borderRadius: (sizes.circle + CIRCLE_TO_BORDER_SPACING * 2) / 2,
  justifyContent: "center",
}));

const AnimatedContentContainer = styled(Animated.View)({
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

const IconCircle = styled(Animated.View)(({ theme }) => ({
  width: sizes.circle,
  height: sizes.circle,
  borderRadius: sizes.circle / 2,
  alignItems: "center",
  justifyContent: "center",
}));
