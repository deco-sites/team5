import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
// import Avatar from "../../components/ui/Avatar.tsx";
import {
  default as WishlistButtonVtex,
  default as WishlistButtonWake,
} from "../../islands/WishlistButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { AvailableIcons } from "../../static/adminIcons.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 315;
const HEIGHT = 315;

function ProductCard({
  product,
  preload,
  itemListName,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:p-4"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-col gap-2">
        <figure
          class="relative overflow-hidden"
          style={{ aspectRatio }}
        >
          {/* Wishlist button */}
          <div
            class={clx(
              "absolute top-0 left-0 px-[15px] py-[15px]",
              "z-10 w-full",
              "flex items-center justify-between",
            )}
          >
            {/* Discount % */}
            <div class="text-[12px] leading-[120%] px-3 bg-[#C6FF4D] text-[#A352D9] max-w-[44px] font-bold">
              <span class="font-bold">
                {listPrice && price
                  ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                  : ""}
              </span>
              OFF
            </div>
            <div class="lg:group-hover:block">
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div>
          </div>

          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full bg-[#F1F1F1] rounded-[4px]",
            )}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "rounded-[4px]",
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
                "mix-blend-darken",
                "transform transition duration-500 hover:scale-110",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            {
              /* <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "rounded w-full",
                "col-span-full row-span-full",
                "transition-opacity opacity-0 lg:group-hover:opacity-100",
              )}
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            /> */
            }
          </a>
        </figure>

        {/* SKU Selector */}
        {
          /* <ul class="flex items-center justify-center gap-2">
          {variants
            .map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link}>
                  <Avatar
                    content={value}
                    variant={link === relativeUrl
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </a>
              </li>
            ))}
        </ul> */
        }

        {/* Name/Description */}
        <div class="flex flex-col">
          <Icon id="starsShelf" width={70} height={14} />
          <h2
            class="truncate capitalize font-medium	text-[15px] mt-[10px]"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />

          {
            /* <div
            class="truncate text-xs"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          /> */
          }
        </div>

        {/* container shelf price */}
        <div class="flex items-end gap-[52px]">
          {/* Price from/to */}
          <div class="flex flex-col gap-0 items-start	justify-center font-light">
            <span class="line-through text-[#757575] text-[12px] text-left">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span class="text-[20px] font-bold text-[#A352D9] leading-[150%]">
              {formatPrice(price, offers?.priceCurrency)}
            </span>

            {/* Installments */}
            <span class="justify-start gap-2 font-regular text-[12px] text-[#1D1D1D] truncate">
              ou {installments}
            </span>
          </div>

          {/*Button */}
          <div class="w-full">
            <a
              href={relativeUrl}
              aria-label="view product"
              class="btn btn-block rounded-[100px] bg-[#A352D9] text-[#ffffff] text-[14px] leading-[150%] font-bold max-w-[100%] hover:bg-[#A352D9]"
            >
              Comprar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
