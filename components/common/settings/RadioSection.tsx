import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import type { RadioProps } from "@/types/radio";

const RadioSection: React.FC<RadioProps> = ({ name, control }) => {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Male",
        value: "male",
      },
      {
        id: "2",
        label: "Female",
        value: "female",
      },
    ],
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          labelStyle={{ color: "#fff", fontSize: 14, fontWeight: 700 }}
          layout="row"
          radioButtons={radioButtons}
          onPress={(selectedId) => {
            const selectedBtn = radioButtons.find(
              (btn) => btn.id === selectedId
            );
            onChange(selectedBtn?.value);
          }}
          selectedId={radioButtons.find((button) => button.value === value)?.id}
        />
      )}
    />
  );
};

export default RadioSection;
