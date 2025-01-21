import { Control } from "react-hook-form";
import { ProfileType } from "@/schema/profile.schema";
interface RadioProps {
  name: "gender";
  control: Control<ProfileType>;
}
