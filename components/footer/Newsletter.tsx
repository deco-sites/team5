import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  buttonArrow: boolean
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        'flex flex-col gap-5 px-7 py-11  bg-[#C394F2]',
        tiled && 'lg:flex-row lg:w-full lg:justify-between',
      )}
    >
      <div class="flex flex-col gap-[10px] text-white">
        {content?.title && (
          <h4 class={tiled ? 'text-2xl lg:text-3xl' : 'text-2xl font-semibold'}>
            {content?.title}
          </h4>
        )}
        {content?.description && (
          <div className="text-sm">{content?.description}</div>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex">
            <input
              name="email"
              class="w-full p-3"
              placeholder={content?.form?.placeholder || 'Digite seu email'}
            />
            {content.form?.buttonArrow ? (
              <button
                type="submit"
                class="btn disabled:loading max-w-10 w-full p-0"
                disabled={loading}
              >
                <Icon
                  id="arrow"
                  width={18}
                  height={18}
                />
              </button>
            ) : (
            <button
              type="submit"
                class="btn disabled:loading p-0"
              disabled={loading}
            >
                {content?.form?.buttonText || 'Inscrever'}
            </button>
            )}
          </div>
        </form>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  )
}

export default Newsletter;
