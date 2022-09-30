import { RadioGroup } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import { useAllowedOptionValues } from "~/lib/utils/product";
import { useTransitionalParams } from "~/lib/utils/useTransitionalParams";
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

  const defaultValue = configuration.options[0]?.name;

  return (
    <RadioGroup
      key={configuration.name}
      defaultValue={defaultValue!}
      name={configuration.name}
      onChange={(value: any) => {
        console.log(value);
      }}
      className="mb-2"
    >
      <RadioGroup.Label className="mb-2">{configuration.name}</RadioGroup.Label>
      <div className="flex gap-2">
        {configuration.options.map((option) => {
          if (!option) return null;

          return (
            <RadioGroup.Option
              // disabled={!allowedValues.includes(value)}
              key={option.id}
              value={option.name}
              className={({ active, checked }) =>
                `${active ? "ring-2 ring-blue-200 " : ""}
                ${checked ? "bg-blue-400 text-blue-50" : "bg-white"}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none aria-disabled:bg-gray-100/80 aria-disabled:cursor-not-allowed`
              }
            >
              {option.name}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
};
