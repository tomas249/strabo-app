import { useMemo, useRef, useState } from 'react';
import { useOutside } from '@/hooks/useOutside';
import { toByField } from '@/utils/common';

export type OptionRenderBase<T> = {
  optionsById: Record<string, T>;
  id: string;
  isSelected: boolean;
};

export type ControlRenderBase<T> = {
  optionsById: Record<string, T>;
  id: string;
  filterValue: string;
  onChangeFilterValue: (value: string) => void;
};

export type OptionBase = { value: string };

export type SelectProps<T extends OptionBase> = {
  options: T[];
  defaultValue: string;
  onSelect: (option: T) => void;
  filter?: (optionsById: Record<string, T>, ids: string[], filterValue: string) => string[];
  ControlRender: React.FC<ControlRenderBase<T>>;
  OptionRender: React.FC<OptionRenderBase<T>>;
};

export function Select<T extends OptionBase>({
  options,
  defaultValue,
  onSelect,
  filter,
  ControlRender,
  OptionRender,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(defaultValue);
  const [filterValue, setFilterValue] = useState('');

  const optionsById = useMemo(() => toByField(options, 'value'), [options]);
  const optionIds = useMemo(() => options.map((v) => v.value), [options]);
  const filteredIds = useMemo(
    () => filter?.(optionsById, optionIds, filterValue) || optionIds,
    [optionsById, optionIds, filter, filterValue],
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutside(wrapperRef, () => setIsOpen(false));

  function selectOption(selectedId: string) {
    setFilterValue('');
    if (selectedId !== id) {
      setId(selectedId);
      onSelect(optionsById[selectedId]);
    }
  }

  function isOptionSelected(optionId: string) {
    return optionId === id;
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <ControlRender
          optionsById={optionsById}
          id={id}
          filterValue={filterValue}
          onChangeFilterValue={setFilterValue}
        />
      </div>
      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className="absolute right-0 top-[calc(100%+4px)] z-10 w-36 overflow-y-auto rounded-lg bg-white p-1.5 shadow-md"
      >
        {filteredIds.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-neutral-400">
            No results found
          </div>
        ) : (
          filteredIds.map((optionId) => (
            <div
              key={optionId}
              onClick={(event) => {
                event.stopPropagation();
                selectOption(optionId);
                setIsOpen(false);
              }}
            >
              <OptionRender
                optionsById={optionsById}
                id={optionId}
                isSelected={isOptionSelected(optionId)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
