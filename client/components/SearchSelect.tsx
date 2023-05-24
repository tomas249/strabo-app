import Image from 'next/image';
import type {
  ControlRenderBase,
  OptionBase,
  OptionRenderBase,
  SelectProps,
} from '@/components/SelectBase';
import { Select } from '@/components/SelectBase';
import { TickIcon } from '@/components/Icons';

type CurrencyOptions = OptionBase & {
  label: string;
  icon: string;
};

function SearchSelectControlRender({
  optionsById,
  id,
  filterValue,
  onChangeFilterValue,
}: ControlRenderBase<CurrencyOptions>) {
  const option = optionsById[id];

  return (
    <input
      type="text"
      placeholder="Currency"
      value={filterValue}
      onChange={(e) => onChangeFilterValue(e.target.value)}
    />
  );
}

function SearchSelectOptionRender({
  optionsById,
  id,
  isSelected,
}: OptionRenderBase<CurrencyOptions>) {
  const option = optionsById[id];

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-neutral-100">
      <div className="flex items-center space-x-2 pl-1">
        <Image src={option.icon} height="18" width="18" alt="Country" />
        <span className="text-sm font-medium">{option.label}</span>
      </div>
      {isSelected && (
        <div className="text-primary-500">
          <TickIcon />
        </div>
      )}
    </div>
  );
}

type SimpleSelectProps = Omit<
  SelectProps<CurrencyOptions>,
  'filter' | 'ControlRender' | 'OptionRender'
>;

export default function SimpleSelect(props: SimpleSelectProps) {
  return (
    <Select
      ControlRender={SearchSelectControlRender}
      OptionRender={SearchSelectOptionRender}
      filter={filterByLabel}
      {...props}
    />
  );
}

const filterByLabel = (optionsById: Record<string, any>, ids: string[], filterValue: string) => {
  return ids.filter((id) =>
    optionsById[id].label.toLowerCase().includes(filterValue.toLowerCase()),
  );
};
