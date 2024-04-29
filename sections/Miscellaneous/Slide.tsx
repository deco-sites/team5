import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface SlideProps {
  label?: string;
  repeat?: number;
  icon?: AvailableIcons;
}

export interface Props {
  content?: SlideProps[];
}

export default function Slide({
  content = [
    {
      repeat: 30,
    },
  ],
}: Props) {
  const slideContent = content?.map(({ repeat = 1 }) => {
    return (
      <div class="flex items-center gap-x-10 mx-4">
        {Array(repeat).fill(0).map(() => (
          <>
            <span class="whitespace-nowrap flex gap-[33px] items-center">
              <span class="text-[26px] font-medium text-[#A352D9]">
                Beleza
              </span>
              <Icon
                class="inline-block"
                id="IconDynamicSlide"
                width={24}
                height={24}
              />
              <span class="text-[26px] font-medium text-[#C394F2]">
                Hair
              </span>
              <Icon
                class="inline-block"
                id="IconDynamicSlide"
                width={24}
                height={24}
              />
              <span class="text-[26px] font-medium text-[#A352D9]">
                Skincare
              </span>
              <Icon
                class="inline-block"
                id="IconDynamicSlide"
                width={24}
                height={24}
              />
              <span class="text-[26px] font-medium text-[#C394F2]">
                Hidratação
              </span>
              <Icon
                class="inline-block"
                id="IconDynamicSlide"
                width={24}
                height={24}
              />
              <span class="text-[26px] font-medium text-[#A352D9]">
                Make
              </span>
              <Icon
                class="inline-block"
                id="IconDynamicSlide"
                width={24}
                height={24}
              />
            </span>
          </>
        ))}
      </div>
    );
  });
  return (
    <div class="bg-secondary relative w-full overflow-hidden h-11">
      <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-11">
        {slideContent}
      </div>
    </div>
  );
}
