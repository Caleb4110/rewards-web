export const cafeFilters = [
  {
    id: "birth month",
    title: "BIRTH MONTH",
    shown: false,
    opts: [
      { value: "jan", label: "Jan", checked: false },
      { value: "feb", label: "Feb", checked: false },
      { value: "mar", label: "Mar", checked: false },
      { value: "apr", label: "Apr", checked: false },
      { value: "may", label: "May", checked: false },
      { value: "jun", label: "Jun", checked: false },
      { value: "jul", label: "Jul", checked: false },
      { value: "aug", label: "Aug", checked: false },
      { value: "sep", label: "Sep", checked: false },
      { value: "oct", label: "Oct", checked: false },
      { value: "nov", label: "Nov", checked: false },
      { value: "dec", label: "Dec", checked: false },
    ],
  },
  {
    id: "age",
    title: "AGE",
    shown: false,
    opts: [
      { value: "18-24", label: "18-24", checked: false },
      { value: "25-34", label: "25-34", checked: false },
      { value: "35-44", label: "35-44", checked: false },
      { value: "45-54", label: "45-64", checked: false },
      { value: "55-64", label: "55-64", checked: false },
      { value: "65+", label: "65+", checked: false },
    ],
  },
  {
    id: "visit count",
    title: "VISIT COUNT",
    shown: false,
    opts: [
      { value: "0-9", label: "0-9", checked: false },
      { value: "10-19", label: "10-19", checked: false },
      { value: "20-29", label: "20-29", checked: false },
      { value: "30+", label: "30+", checked: false },
    ],
  },
];

export interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

export interface Filter {
  id: string;
  title: string;
  shown: boolean;
  opts: FilterOption[];
}
