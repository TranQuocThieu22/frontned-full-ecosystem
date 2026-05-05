
export enum EnumJournalType {
    Journal = 1,
    Conference = 2,
    Publisher = 3
  }
  
  export const EnumLabelJournalType: Record<EnumJournalType, string> = {
    [EnumJournalType.Journal]: "Tạp chí",
    [EnumJournalType.Conference]: "Hội thảo",
    [EnumJournalType.Publisher]: "Nhà xuất bản"
  };
  
