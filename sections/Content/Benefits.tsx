import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

interface Benefit {
  label: string;
  /**
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  description: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(props: Props) {
  const {
    title = "Benefits",
    description = "Check out the benefits",
    benefits = [
      {
        icon: "Truck",
        label: "Entrega em todo Brasil",
        description: "Consulte o prazo no fechamento da compra.",
      },
      {
        icon: "Discount",
        label: "15% na primeira compra",
        description: "Aplicado direto na sacola de compras.",
      },
      {
        icon: "ArrowsPointingOut",
        label: "Devolução grátis",
        description: "Veja as condições para devolver seu produto.",
      },
    ],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? "border-b border-[#A352D9]"
            : ""
        } ${showDivider ? "pb-4 lg:border-r lg:border-b-0" : ""} ${
          showDivider && !reverse ? "lg:pb-0" : ""
        } ${
          index === 0
            ? "pr-[100px]"
            : index === benefits.length - 1
            ? "pl-[100px]"
            : "px-[100px]"
        }`}
      >
        <div class="flex-auto flex flex-col justify-center align-center max-w-fit">
          <Icon
            id={benefit.icon}
            class={"text-base-content"}
            width={16}
            height={16}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col justify-center align-center max-w-fit">
          <div class="text-[#A352D9] font-bold text-[14px]">
            {benefit.label}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full flex flex-col gap-8 bg-[#C6FF4D] h-[50px] justify-center">
            <div class="flex justify-center w-[1008px] mx-auto">
              <div class="flex">{listOfBenefits}</div>
            </div>
          </div>
        )
        : (
          ""
        )}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0 bg-[#C6FF4D] h-[50px] justify-center">
          <div class="w-[1008px] flex justify-center mx-auto">
            <div class="flex">{listOfBenefits}</div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0 bg-[#C6FF4D] h-[50px] justify-center">
          <div class="w-[1008px] flex justify-center mx-auto">
            <div class="flex">{listOfBenefits}</div>
          </div>
        </div>
      )}
    </>
  );
}
