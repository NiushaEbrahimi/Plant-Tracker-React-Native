import { Image, ImageSourcePropType } from "react-native";
import { PlantIcon } from "../types/plant";

export const plantIconOptions: { value: PlantIcon }[] = [
  { value: 'monstera'},
  { value: 'succulent'},
  { value: 'flower'},
  { value: 'fern'},
  { value: 'cactus' },
  { value: 'pothos' },
  { value: 'lily'},
  { value: 'snake-plant'},
];

export const plantImages: Record<PlantIcon, ImageSourcePropType> = {
  monstera: require('../../assets/images/monstera.png'),
  succulent: require('../../assets/images/succulent.png'),
  fern: require('../../assets/images/fern.png'),
  cactus: require('../../assets/images/cactus2.png'),
  pothos: require('../../assets/images/pothos.png'),
  'snake-plant': require('../../assets/images/snakeplant.png'),
  flower: require('../../assets/images/flower.png'),
  lily: require('../../assets/images/lily.jpeg'),
};

export default function PlantIcons({ icon }: { icon: PlantIcon }) {
  return (
    <Image source={plantImages[icon]} style={{ width: 40, height: 40 }}/>
  );
}