import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @format image-uri
   */
  imageUrl: string;
  buttonLink: string;
  title: string;
}

export default function FullImageBanner(props: Props) {
  const { imageUrl, buttonLink, title } = props;

  return (
    <a href={buttonLink} class="block w-full">
      <Image src={imageUrl} alt={title} width={"100%"} class="w-full block" />
    </a>
  );
}
