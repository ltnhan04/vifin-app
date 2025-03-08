interface RadioPropsBase<T extends FieldValues> {
  name: "gender";
  control: Control<T>;
  type: "signUp" | "profile";
}

type SignUpRadioProps = RadioPropsBase<SignUpType> & { type: "signUp" };
type ProfileRadioProps = RadioPropsBase<ProfileType> & { type: "profile" };

export type RadioProps = SignUpRadioProps | ProfileRadioProps;
