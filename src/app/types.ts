export type QueryItem = {
  // itemId: number;
  name: string;
  category: string;
  active: boolean;
  notes: string;
};

export type Query = {
  items: QueryItem[];
};
