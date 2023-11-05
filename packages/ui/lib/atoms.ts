import { atom } from "jotai";

export const atoms = {
  activeTab: atom(0),
  tabs: atom([
    {
      id: 0,
      page: {
        description: "",
        favicon: "",
        title: "",
        url: "",
      },
    },
  ]),
};
