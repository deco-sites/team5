import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  /**
   * @format image-uri
   */
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export default function CustomImageCard(props: Props) {
  const { title, imageUrl, buttonText, buttonLink } = props;

  return (
    <div class="flex flex-col items-center w-[1320px] h-[488px] relative mx-auto rounded-[20px]">
      <Image
        src={imageUrl}
        alt={title}
        width={"100%"}
        class="w-[1320px] h-[488px] absolute inset-0 object-cover  rounded-[20px]"
      />
      <div class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-center">
        <h2 class="text-white text-[50px] font-semibold leading-[60px]">
          {title}
        </h2>
        <a
          class="text-white text-[14px] font-bold leading-[21px] px-[62px] py-[9.5px] border border-white rounded-[30px] mt-[40px] inline-block"
          href={buttonLink}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
