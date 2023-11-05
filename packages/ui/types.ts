export interface Page {
  description: string;
  favicon: string;
  title: string;
  url: string;
}

export interface Tab {
  page: Page;
  id: number;
}
