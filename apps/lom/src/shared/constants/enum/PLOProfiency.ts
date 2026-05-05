import {IconBook, IconBulb, IconUserCog, TablerIcon} from "@tabler/icons-react";

export enum PLOProfiencyEnum {
  knowledge = 1,
  skill = 2,
  selfBehaviorAndResponsibility = 3,
}

export const PLOProfiencyEnumLabel: Record<PLOProfiencyEnum, string> = {
  [PLOProfiencyEnum.knowledge]: "Kiến thức",
  [PLOProfiencyEnum.skill]: "Kỹ năng",
  [PLOProfiencyEnum.selfBehaviorAndResponsibility]: "Mức độ tự chủ và trách nhiệm",
};

export const PLOProfiencyEnumColor: Record<PLOProfiencyEnum, string> = {
  [PLOProfiencyEnum.knowledge]: "red",
  [PLOProfiencyEnum.skill]: "green",
  [PLOProfiencyEnum.selfBehaviorAndResponsibility]: "orange",
};

export const PLOProfiencyEnumIcon: Record<PLOProfiencyEnum, TablerIcon> = {
  [PLOProfiencyEnum.knowledge]: IconBook,
  [PLOProfiencyEnum.skill]: IconBulb,
  [PLOProfiencyEnum.selfBehaviorAndResponsibility]: IconUserCog,
};
