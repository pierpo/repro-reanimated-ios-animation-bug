import { useState } from "react";
import { Switch } from './Switch';

export const UncontrolledSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <Switch
      accessibilityLabel="switch"
      isChecked={isSwitchOn}
      onPress={() => {
        setIsSwitchOn(!isSwitchOn);
      }}
    />
  );
};

