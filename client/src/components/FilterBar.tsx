import ChevronDown from "./svg/ChevronDown";
import ChevronUp from "./svg/ChevronUp";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface Filter {
  id: string;
  title: string;
  shown: boolean;
  opts: FilterOption[];
}

interface Props {
  filters: Filter[];
  onChange: (updatedFilters: Filter[]) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  // Handle changes in each filter's options
  const handleOptionChange = (filterId: string, optionValue: string) => {
    const updatedFilters = filters.map((filter: Filter) => {
      if (filter.id === filterId) {
        const updatedOptions = filter.opts.map((opt) => ({
          ...opt,
          checked: opt.value === optionValue ? !opt.checked : opt.checked,
        }));
        return { ...filter, opts: updatedOptions };
      }
      return filter;
    });
    onChange(updatedFilters);
  };

  const handleTitleChange = (filterId: string) => {
    const updatedFilters = filters.map((filter: Filter) => {
      if (filter.id === filterId) {
        const updatedShown = !filter.shown;
        return { ...filter, shown: updatedShown };
      }
      return filter;
    });
    onChange(updatedFilters);
  };

  const handleClear = () => {
    const updatedFilters = filters.map((filter: Filter) => {
      const updatedOptions = filter.opts.map((opt) => ({
        ...opt,
        checked: false,
      }));
      return { ...filter, opts: updatedOptions };
    });
    onChange(updatedFilters);
  };

  return (
    <div className="flex w-fit flex-col space-y-4 rounded-md border border-moss_green-400 bg-moss_green-400 p-4 text-snow shadow-sm shadow-moss_green-500/80">
      <div className="flex max-h-96 flex-col space-y-4 overflow-y-auto overflow-x-hidden">
        {filters.map((filter) => (
          <div key={filter.id} className="flex w-36 flex-col">
            <button
              title={filter.title}
              className="flex w-full justify-between"
              onClick={() => handleTitleChange(filter.id)}
            >
              <h3 className="text-lg font-semibold">{filter.title}</h3>
              {filter.shown ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div className="flex flex-col gap-2">
              {filter.shown
                ? filter.opts.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center space-x-2 text-sm font-medium"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox rounded text-blue-500"
                        checked={opt.checked}
                        onChange={() =>
                          handleOptionChange(filter.id, opt.value)
                        }
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))
                : null}
            </div>
          </div>
        ))}
      </div>

      <button
        className="rounded-md bg-moss_green-300 text-lg font-medium"
        onClick={handleClear}
      >
        CLEAR
      </button>
    </div>
  );
}
