import React from "react";

export type QuickLinksValue = {
  links?: { label: string; href: string }[];
};

export const QuickLinksContext = React.createContext<QuickLinksValue>({});

export const QuickLinksProvider = QuickLinksContext.Provider;
