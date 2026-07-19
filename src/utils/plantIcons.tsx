import { Image, ImageSourcePropType } from "react-native";
import { PlantIcon } from "../types/plant";

export const plantIconOptions: { value: PlantIcon }[] = [
  {value: 'aglaonema'},
  {value: 'aloe-vera'},
  {value: 'astrophytum'},
  {value: 'barrel cactus'},
  {value: 'cactus'},//
  {value: 'calathea'},
  {value: 'devils-ivy'},
  {value: 'fern'},//
  {value: 'flower'},//
  {value: 'haworthia'},
  {value: 'herbs'},
  {value: 'lily'},//
  {value: 'monstera'},//
  {value: 'moonglow'},
  {value: 'plant'},
  {value: 'pothos'},//
  {value: 'prickly-pear'},
  {value: 'rose'},
  {value: 'rubber-plant'},
  {value: 'sensoria'},
  {value: 'snake-plant'},//
  {value: 'succulent'},//
  {value: 'zamioculcas'},
];

export const plantImages: Record<PlantIcon, ImageSourcePropType> = {
  monstera: require('../../assets/images/monstera.png'),
  succulent: require('../../assets/images/succulent.png'),
  fern: require('../../assets/images/fern.png'),
  aglaonema: require('../../assets/images/aglaonema.png'),
  'aloe-vera': require('../../assets/images/aloeVera.png'),
  astrophytum: require('../../assets/images/astrophytum.png'),
  'barrel cactus': require('../../assets/images/barrelCactus.png'),
  cactus: require('../../assets/images/cactus2.png'),
  calathea: require('../../assets/images/Calathea.png'),
  'devils-ivy': require("../../assets/images/devilsivy.png"),
  haworthia: require('../../assets/images/Haworthia.png'),
  herbs: require('../../assets/images/Herbs.png'),
  lily: require('../../assets/images/lily_icon.png'),
  moonglow: require('../../assets/images/moonglow.png'),
  plant: require('../../assets/images/plant.png'),
  pothos: require('../../assets/images/pothos.png'),
  'prickly-pear': require('../../assets/images/Prickly Pear.png'),
  rose: require('../../assets/images/rose_icon.png'),
  'rubber-plant': require('../../assets/images/Rubber Plant.png'),
  sensoria: require('../../assets/images/sensoria.png'),
  'snake-plant': require('../../assets/images/snakeplant.png'),
  flower: require('../../assets/images/flower.png'),
  zamioculcas: require('../../assets/images/zamioculcas.png'),
};

export default function PlantIcons({ icon, size = 40 }: { icon: PlantIcon; size?: number }) {
  return (
    <Image source={plantImages[icon]} style={{ width: size, height: size }} />
  );
}