import { Props as CustomImageCardProps } from "../../components/cards/CustomImageCard.tsx";
import CustomImageCard from "../../components/cards/CustomImageCard.tsx";

export type Props = CustomImageCardProps;

export default function Section(props: Props) {
  return <CustomImageCard {...props} />;
}
