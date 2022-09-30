import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import Price from "~/components/Price";
import type { RouteProduct } from "~/utils/types";

export const ConfigurationOption = ({
  product,
  configuration,
}: {
  product: RouteProduct;
  configuration: NonNullable<
    NonNullable<RouteProduct["configurations"]>[number]
  >;
}) => {
  if (!configuration?.name) return null;

  const defaultValue = configuration.options[0]?.id;

  const getOptionFromId = (id: string) => {
    return configuration.options.find((option) => option?.id === id);
  };

  return (
    <div className="w-72">
      <Listbox name={configuration.name} defaultValue={defaultValue}>
        <Listbox.Label>{configuration.name}</Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm">
            {({ value }) => {
              const selectedOption = getOptionFromId(value);
              console.log("selectedOption", selectedOption);
              return (
                <>
                  <div className="flex justify-between">
                    <span className="block truncate">
                      {selectedOption?.name}
                    </span>
                    <span className="block text-gray-400">
                      <Price price={selectedOption?.price} />
                    </span>
                  </div>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </>
              );
            }}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg focus:outline-none max-h-60 ring-1 ring-black ring-opacity-5 sm:text-sm">
              {configuration.options.map((option) => {
                if (!option) return null;

                return (
                  <Listbox.Option
                    key={option.id}
                    value={option.id}
                    className={({ active }) =>
                      `block relative text-gray-900 cursor-default select-none hover:text-blue-500 hover-bg-blue-50 py-2 pl-3 pr-4 ${
                        active ? "bg-blue-50 text-blue-500" : ""
                      }`
                    }
                  >
                    <div className="flex justify-between">
                      <span className="block truncate">{option?.name}</span>
                      <span className="block text-gray-400">
                        <Price price={option?.price} />
                      </span>
                    </div>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
