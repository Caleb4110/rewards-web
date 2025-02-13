import Button from "./Button";
import Heading from "./Heading";
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

export default function FilterList({ filters, onChange }: Props) {
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
    <div className="flex w-full h-full flex-col justify-between  text-raisin_black ">
      <div className="flex h-5/6 flex-col space-y-10 overflow-y-auto overflow-x-hidden">
        {filters.map((filter) => (
          <div key={filter.id} className="flex w-full flex-col ">
            <button
              title={filter.title}
              className="flex w-full justify-between"
              onClick={() => handleTitleChange(filter.id)}
            >
              <Heading
                variant="primary"
                position="left"
                title={filter.title}
                className="text-xl"
              />
              {filter.shown ? <ChevronUp /> : <ChevronDown />}
            </button>

            {filter.shown
              ? filter.opts.map((opt) => (
                  <div className="flex flex-col p-2">
                    <label
                      key={opt.value}
                      className="flex items-center space-x-3 text-sm font-medium"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox rounded accent-moss_green-500 size-5"
                        checked={opt.checked}
                        onChange={() =>
                          handleOptionChange(filter.id, opt.value)
                        }
                      />
                      <Heading
                        variant="secondary"
                        position="left"
                        title={opt.label}
                        className="text-lg text-moss_green-400"
                      />
                    </label>
                  </div>
                ))
              : null}
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={handleClear} label="CLEAR" />
    </div>
  );
}
