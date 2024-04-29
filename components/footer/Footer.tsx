import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {

function Footer() {
  const lists = [
    [
      'Categoria',
      'Produtos para pele',
      'Produtos para cabelo',
      'Unhas',
      'Make',
      'OFF',
    ],
    ['Institucional', 'Sobre nós', 'Politicas', 'Blog', 'Trabalhe conosco'],
    [
      'Ajuda',
      'Minha conta',
      'Meus pedidos',
      'Fale conosco',
      'Dúvidas frequentes',
    ],
  ]

  return (
    <div className="flex">
      <div className="w-[64.80%] bg-[#A352D9] px-[60px] py-7 flex flex-col justify-between">
        <div className="flex gap-x-16">
          <div className="max-w-[200px]">
            <div>
              <Icon
                id="logo"
                className="w-full h-16 mb-8"
              />

              <Icon
                id="social"
                className="w-full h-5"
              />
            </div>

            <Icon
              id="paymentMethods"
              className="w-full h-11 mt-[77px]"
            />
          </div>

          <div className="flex gap-x-16">
            <ul className="flex flex-col gap-y-2.5">
              {lists[0].map((item) => (
                <li
                  key={item}
                  className="text-white first:text-[#C6FF4D]"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-y-2.5">
              {lists[1].map((item) => (
                <li
                  key={item}
                  className="text-white first:text-[#C6FF4D]"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-y-2.5">
              {lists[2].map((item) => (
                <li
                  key={item}
                  className="text-white first:text-[#C6FF4D]"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between item-center">
          <p className="text-white">
            © 2023, Beauty Divine - Theme . Powered by{' '}
            <a
              href="/"
              className="underline"
            >
              Fast IO
            </a>
          </p>

          <Icon
            id="econverseVtex"
            className="max-w-28 max-h-4"
          />
        </div>
      </div>

      <div className="w-[35.20%]">
        <Newsletter
          content={{
            title: 'Newsletter',
            description:
              'Inscreva-se na nossa newsletter e fique por dentro de tudo!',
            form: {
              placeholder: 'E-mail',
              buttonArrow: true,
            },
          }}
        />

        <img
          src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/8317/43eaa486-6184-4a76-b209-26c340b9bd8f"
          className="w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Footer
